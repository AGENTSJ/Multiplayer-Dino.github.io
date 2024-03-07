class Connections{

    constructor(){
        this.session = false;
        this.rtc = new WebRTC();
    }
    hostSession(){
        this.session = true;
        this.rtc.HostWebRTC();
    }
    networkListner(){

    }
    remoteConnection(){
        let textar = document.getElementById("sdp");
        let offerObj = JSON.parse(textar.value);
        textar.value = "";
        console.log(offerObj);
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
    }
    sendObstacleSpawn(idx){
        // console.log("spawn",idx);
    }
    sendGameState(){
        // console.log("game over");
    }
}
export default Connections;


class WebRTC{
    constructor(){
        this.peerConnection;
        this.dataChannel;
        this.configuration = {
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' }
            ]
        };
        this.handleICECandidateEvent = this.handleICECandidateEvent.bind(this);

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
            // console.log('ICE candidate:\n', txtar.value);
            // console.log(this.peerConnection);
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
    handleDataChannelOpen() {
        console.log('Data channel open');
    }
    handleDataChannelMessage(event) {
        const message = JSON.parse(event.data);
        console.log(message);
    } 
    sendMessage() {
   
        this.dataChannel.send(JSON.stringify({"hello":"world"}));
    }
    logError(error) {
        console.error(error);
    }
    handleDataChannelEvent(event) {
        this.dataChannel = event.channel;
        this.dataChannel.onopen = this.handleDataChannelOpen;
        this.dataChannel.onmessage = this.handleDataChannelMessage;
    }


}









