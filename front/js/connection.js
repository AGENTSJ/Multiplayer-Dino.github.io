import controllers from "./InputController.js";
const {InputController,NetworkController} = controllers;
const NetController = new NetworkController();

class WebRTC{

    constructor(RemoteInstances){
        this.RemoteInstances = RemoteInstances;
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

        let gameInstance = this.RemoteInstances[0]
        
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
            case "ready":
                gameInstance.gameFunctions.state = true;
                let remReadyevt = new Event("remReady");
                window.dispatchEvent(remReadyevt);
                
                break;
        }
        
    } 


}

class Connections{

    constructor(RemoteInstances){
        this.RemoteInstances = RemoteInstances;
        this.rtc = new WebRTC(this.RemoteInstances);
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
        let textar = document.getElementById("sdp");
        let offerObj = JSON.parse(textar.value);
        textar.value = "";
        let offer = new RTCSessionDescription({type:"offer", sdp:offerObj.sdp});
        this.rtc.joinWebRTC(offer);
    }
    sendJump(){
        this.rtc.sendMessage({"event":"jump"});
    }
    sendObstacleSpawn(idx){
        this.rtc.sendMessage({"event":"obstSpawn","data":idx});
    }
    sendGameState(){
        this.rtc.sendMessage({"event":"gameOver"});
    }
    sendReady(){
        this.rtc.sendMessage({"event":"ready"});
    }
}
export default Connections;











