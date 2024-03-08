import controllers from "./InputController.js";
const {InputController,NetworkController} = controllers;

class WebRTC{
    constructor(gameInstance){
        this.peerConnection;
        this.dataChannel;
        this.configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }
            ]
        };
        this.NetworkController = new NetworkController()
        this.gameInstance = gameInstance;
        this.handleICECandidateEvent = this.handleICECandidateEvent.bind(this);
        this.handleDataChannelEvent = this.handleDataChannelEvent.bind(this);
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
    
        this.peerConnection.ondatachannel = this.handleDataChannelEvent;
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
    handleDataChannelEvent(event) {
        this.dataChannel = event.channel;
        this.dataChannel.onopen = this.handleDataChannelOpen;
        this.dataChannel.onmessage = this.handleDataChannelMessage;
    }
    handleDataChannelOpen() {
        console.log('Data channel open');
    }
    handleDataChannelMessage(event) {
        let message = JSON.parse(event.data);

        switch(message.event){
            case "gameOver":
                console.log("gameover from connection");
                this.gameInstance.gameFunctions.state = false;
                break;
            case "obstSpawn":
                // console.log(message.data);
                this.NetworkController.spawnObstacles(this.gameInstance,message.data)
                break;
            case "jump":
                console.log("jump inside rtc");
                this.NetworkController.makeJump(this.gameInstance)
        }
    } 


}

class Connections{

    constructor(gameInstance){
        this.session = false;
        this.rtc = new WebRTC(gameInstance);
    }
    hostSession(){
        this.session = true;
        this.rtc.HostWebRTC();
    }
    remoteConnection(){
        let textar = document.getElementById("sdp");
        let offerObj = JSON.parse(textar.value);
        textar.value = "";
        this.rtc.peerConnection.setRemoteDescription(offerObj);
    }
    joinSession(){
        this.session = true;
        let textar = document.getElementById("sdp")
        let offerObj = JSON.parse(textar.value);
        textar.value = "";
        let offer = new RTCSessionDescription({type:"offer", sdp:offerObj.sdp});
        this.rtc.joinWebRTC(offer);
    }
    sendPlayerState(){
        // console.log("jumped");
        this.rtc.sendMessage({event:"jump"})
    }
    sendObstacleSpawn(idx){
        // console.log("spawn",idx);
        this.rtc.sendMessage({event:"obstSpawn",data:idx})
    }
    sendGameState(){
        this.rtc.sendMessage({event:"gameOver"})
    }
}
export default Connections;











