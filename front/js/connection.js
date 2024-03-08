import controllers from "./InputController.js";
const {InputController,NetworkController} = controllers;
const NetController = new NetworkController();

class WebRTC{

    constructor(RemIns){
        this.RemIns = RemIns;
        this.peerConnection;
        this.dataChannel;
        this.configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }
            ]
        };
        this.handleICECandidateEvent = this.handleICECandidateEvent.bind(this);
        this.reciveDataChannel = this.reciveDataChannel.bind(this);
        this.handleDataChannelMessage = this.handleDataChannelMessage.bind(this);
    }

    HostWebRTC() {
        this.peerConnection = new RTCPeerConnection(this.configuration);
        this.dataChannel = this.peerConnection.createDataChannel('jsonChannel');
        this.dataChannel.onopen = this.handleDataChannelOpen;
        this.dataChannel.onmessage = this.handleDataChannelMessage;
    
        this.peerConnection.onicecandidate = this.handleICECandidateEvent;
        this.peerConnection.createOffer()
            .then(offer => this.peerConnection.setLocalDescription(offer))
            .catch(this.logError);
    }

    handleICECandidateEvent(event) {
        if (event.candidate) {
            let txtar = document.getElementById("sdp");
            txtar.value = JSON.stringify(this.peerConnection.localDescription)

        }
    }

    joinWebRTC(offer) {
        this.peerConnection = new RTCPeerConnection(this.configuration);
    
        this.peerConnection.ondatachannel = this.reciveDataChannel;
        this.peerConnection.onicecandidate = this.handleICECandidateEvent;
    
        this.peerConnection.setRemoteDescription(offer)
            .then(() => this.peerConnection.createAnswer())
            .then(answer => this.peerConnection.setLocalDescription(answer))
            .catch(this.logError);
    }
    sendMessage(data) {
        // console.log(this.dataChannel);
        this.dataChannel.send(JSON.stringify(data));

    }
    logError(error) {
        console.error(error);
    }
    reciveDataChannel(event) {
        this.dataChannel = event.channel;
        this.dataChannel.onopen = this.handleDataChannelOpen;
        this.dataChannel.onmessage = this.handleDataChannelMessage;
    }
    handleDataChannelOpen() {
        console.log('Data channel open');
    }
    handleDataChannelMessage(event) {
        let message = JSON.parse(event.data);
        let gameInstance = this.RemIns[0]
        // console.log(gameInstance);
        switch(message.event){
            case "obstSpawn":
                NetController.spawnObstacle(gameInstance,message.data);
                break;
            case "gameOver":
                NetController.gameOver(gameInstance);
                break;
            case "jump":
                NetController.makeJump(gameInstance);
                break;
        }
        // console.log(message);
    } 


}

class Connections{

    constructor(RemIns){
        this.RemIns = RemIns;
        this.rtc = new WebRTC(this.RemIns);
    }
    hostSession(){
        this.rtc.HostWebRTC();
    }
    remoteConnection(){
        let textar = document.getElementById("sdp");
        let offerObj = JSON.parse(textar.value);
        textar.value = "";
        this.rtc.peerConnection.setRemoteDescription(offerObj);
    }
    joinSession(){
        let textar = document.getElementById("sdp")
        let offerObj = JSON.parse(textar.value);
        textar.value = "";
        let offer = new RTCSessionDescription({type:"offer", sdp:offerObj.sdp});
        this.rtc.joinWebRTC(offer);
    }
    sendJump(){
        this.rtc.sendMessage({"event":"jump"})
    }
    sendObstacleSpawn(idx){
        // console.log(idx);
        this.rtc.sendMessage({"event":"obstSpawn","data":idx})
    }
    sendGameState(){
        this.rtc.sendMessage({"event":"gameOver"})
    }
}
export default Connections;











