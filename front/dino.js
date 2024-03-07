import GameInstances from "./js/GameInstance.js";
let {SinglePlayer,MultiPlayer} = GameInstances;
let game;
let game2;
window.handleHost = handleHost;
window.handleJoin = handleJoin;
window.setremote = setremote;
function handleHost(){

    game = new SinglePlayer();

}
function handleJoin(){
    game2 = new MultiPlayer();
}

// function setremote(){
//     game2.
// }
