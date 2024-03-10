import GameInstance from "./js/GameInstance.js";
import Connections from "./js/connection.js";
import setUpFunctions from "./js/Uifunction.js";

const {setUp,GuideJoin,GuideAcceptee,GuideHost} = setUpFunctions;

let game;
let readyFlag = false;

let game2;
let remoteInstances = [];

window.handleHost = handleHost;
window.handleJoin = handleJoin;
window.setremote = setremote;
window.copyToClipboard = copyToClipboard;
window.reset = reset;
window.readyEvent = readyEvent;

setUp();

window.addEventListener("remReady",()=>{
    if(readyFlag){
        game.gameFunctions.state = true;
    }
})


const connection = new Connections(remoteInstances);

game = new GameInstance(0,"offline");


function handleHost(){
  connection.hostSession();
  GuideHost();
}

function handleJoin(){
    connection.joinSession();
    game.mode = 1;
    game.connection = connection;
    game2 = new GameInstance(1,"online");
    game2.connection = connection;
    remoteInstances.push(game2);
    GuideJoin(1);


}
function setremote(){
    connection.remoteConnection();
    game.mode = 1;
    game.connection = connection;
    game2 = new GameInstance(1,"online");
    game2.connection = connection;
    remoteInstances.push(game2);
    GuideAcceptee();
}

function copyToClipboard() {
    var copyText = document.getElementById("sdp");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    copyText.value = "";
}
function reset(event){
    if(game.mode===0){
        game.gameFunctions.state = true;
    }
    game.gameFunctions.reset(game.obstacleArr);
}

function readyEvent(){
    connection.sendReady();
    readyFlag= true;
    if(game2.gameFunctions.state ===true){
        game.gameFunctions.state = true;
    }

}