import GameInstance from "./js/GameInstance.js";


let game;
let game2;

window.handleHost = handleHost;
window.handleJoin = handleJoin;
window.setremote = setremote;
window.sendTest = sendTest;

game = new GameInstance(0);

function handleHost(){
    game.connection.hostSession();
    // game.mode=1;
}
function handleJoin(){
    game2 = new GameInstance(1);
    game2.connection.joinSession();
    game.connection.rtc = game2.connection.rtc;
    
}
function setremote(){
    game.connection.remoteConnection();
    game2 = new GameInstance(1)
    game2.connection.rtc = game.connection.rtc;
    // game.mode=1;
    
}
function sendTest(){
    game.connection.rtc.sendMessage({"hello":"world"})
}