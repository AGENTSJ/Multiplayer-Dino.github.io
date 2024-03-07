import GameInstances from "./js/GameInstance.js";
let {SinglePlayer,MultiPlayer} = GameInstances;
let game;
let game2;
window.handleHost = handleHost;
window.handleJoin = handleJoin;
window.setremote = setremote;
// window.sendTest = sendTest;
function handleHost(){

    game = new SinglePlayer();

}
function handleJoin(){
    // game = new SinglePlayer();
    game2 = new MultiPlayer();
    
}
function setremote(){
    game.connection.remoteConnection();
    
}
// function sendTest(){
//     game.connection.rtc.sendMessage({"hello":"world"})
// }