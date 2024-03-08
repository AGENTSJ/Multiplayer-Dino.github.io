import GameInstance from "./js/GameInstance.js";


let game;
let game2;

window.handleHost = handleHost;
window.handleJoin = handleJoin;
window.setremote = setremote;
window.copyToClipboard = copyToClipboard;

game = new GameInstance(0);




function handleHost(){
    game.connection.hostSession();
    game.mode=1;
}
function handleJoin(){
    game2 = new GameInstance(1);
    game2.connection.joinSession();
    game2.gameFunctions.state = true;
    game.mode=1;

}
function setremote(){
    game.connection.remoteConnection();
    game2 = new GameInstance(1)
    game2.connection.rtc.dataChannel = game.connection.rtc.dataChannel;
    game.mode=1;
    
}
function copyToClipboard() {
    var copyText = document.getElementById("sdp");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}