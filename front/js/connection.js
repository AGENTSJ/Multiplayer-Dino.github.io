class Connections{

    constructor(){
        this.session = false;
    }
    hostSession(){
        this.session = true;
        HostWebRTC();
    }
    networkListner(){

    }
    remoteConnection(){
        let textar = document.getElementById("sdp")
        let offerObj = JSON.parse(textar.value);
        textar.value = "";
        
        

    }
    joinSession(){
        this.session = true;
        let textar = document.getElementById("sdp")
        let offerObj = JSON.parse(textar.value);
        textar.value = "";
        let offer = new RTCSessionDescription({type:"offer", sdp:offerObj.sdp});
        // console.log(new );
        joinWebRTC(offer);
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

// class WebRTC{
//     constructor(){
//         this.peerConnection =null;
//     }
//     HostWebRTC() {
//         peerConnection = new RTCPeerConnection(configuration);
//         dataChannel = peerConnection.createDataChannel('jsonChannel');
    
//         dataChannel.onopen = handleDataChannelOpen;
//         dataChannel.onmessage = handleDataChannelMessage;
    
//         peerConnection.onicecandidate = handleICECandidateEvent;
//         peerConnection.createOffer()
//             .then(offer => peerConnection.setLocalDescription(offer))
//             .catch(logError);
//     }
//     joinWebRTC(offer) {
//         peerConnection = new RTCPeerConnection(configuration);
    
//         peerConnection.ondatachannel = handleDataChannelEvent;
//         peerConnection.onicecandidate = handleICECandidateEvent;
    
//         peerConnection.setRemoteDescription(offer)
//             .then(() => peerConnection.createAnswer())
//             .then(answer => peerConnection.setLocalDescription(answer))
//             .catch(logError);
//     }
//     handleDataChannelOpen() {
//         console.log('Data channel open');
//     }
//     handleDataChannelMessage(event) {
//         const message = JSON.parse(event.data);
//         console.log(message);
//     }
// }

const configuration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
    ]
};

let peerConnection;
let dataChannel;

function HostWebRTC() {
    peerConnection = new RTCPeerConnection(configuration);
    dataChannel = peerConnection.createDataChannel('jsonChannel');

    dataChannel.onopen = handleDataChannelOpen;
    dataChannel.onmessage = handleDataChannelMessage;

    peerConnection.onicecandidate = handleICECandidateEvent;
    peerConnection.createOffer()
        .then(offer => peerConnection.setLocalDescription(offer))
        .catch(logError);
}

function joinWebRTC(offer) {
    peerConnection = new RTCPeerConnection(configuration);

    peerConnection.ondatachannel = handleDataChannelEvent;
    peerConnection.onicecandidate = handleICECandidateEvent;

    peerConnection.setRemoteDescription(offer)
        .then(() => peerConnection.createAnswer())
        .then(answer => peerConnection.setLocalDescription(answer))
        .catch(logError);
}

function handleDataChannelOpen() {
    console.log('Data channel open');
}

function handleDataChannelMessage(event) {
    const message = JSON.parse(event.data);
    console.log(message);
}

function handleICECandidateEvent(event) {
    if (event.candidate) {
        let txtar = document.getElementById("sdp");
        txtar.value = JSON.stringify(peerConnection.localDescription)
        console.log('ICE candidate:\n', txtar.value);
    }
}

function sendMessage() {
   
    dataChannel.send(JSON.stringify({"hello":"world"}));
}

function logError(error) {
    console.error(error);
}
function handleDataChannelEvent(event) {
    dataChannel = event.channel;
    dataChannel.onopen = handleDataChannelOpen;
    dataChannel.onmessage = handleDataChannelMessage;
}









