// import controllers from "./InputController.js";
// const {InputController,NetworkController} = controllers;

class WebRTC{

    constructor(gameInstance){
        this.peerConnection;
        this.dataChannel;
        this.configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }
            ]
        };
        this.gameInstance = gameInstance;
        // this.NetworkController = new NetworkController(this.gameInstance)
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
                let obstevent = new CustomEvent('obstSpawn', {detail:{ idx: message.data }});
                window.dispatchEvent(obstevent);

                break;
            case "jump":
                // this.NetworkController.makeJump(this.gameInstance)
                let jumpevnt = new CustomEvent('jump');
                window.dispatchEvent(jumpevnt);
        }
    } 


}

class Connections{

    constructor(gameInstance){

        this.gameInstance = gameInstance;
        this.rtc = new WebRTC(this.gameInstance);
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
    sendPlayerState(){

        if(this.gameInstance.mode===1){

            this.rtc.sendMessage({event:"jump"})
        }
    }
    sendObstacleSpawn(idx){
        
        if(this.gameInstance.mode===1){

            this.rtc.sendMessage({event:"obstSpawn",data:idx})
        }

    }
    sendGameState(){
        if(this.gameInstance.mode===1){
            console.log("game over send");
            this.rtc.sendMessage({event:"gameOver"})
        }
    }
}
export default Connections;











