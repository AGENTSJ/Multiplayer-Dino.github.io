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
window.replay = clientReplay;
setUp();

window.addEventListener("remReady",()=>{
    if(readyFlag){
        game.gameFunctions.state = true;
    }
})
window.addEventListener("replay",()=>{
    replay();
})

const connection = new Connections(remoteInstances);

game = new GameInstance(0,"offline");

scoreMaintainer();

function handleHost(){
  connection.hostSession();
  GuideHost();
}

function handleJoin(){
    connection.joinSession();
    game.mode = 1;
    game.connection = connection;
    game2 = new GameInstance(2,"online");
    game2.connection = connection;
    remoteInstances.push(game2);
    GuideJoin(1);


}
function setremote(){
    connection.remoteConnection();
    game.mode = 1;
    game.connection = connection;
    game2 = new GameInstance(2,"online");
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
function clientReplay(){
    connection.sendReplay();
    replay();

}
function replay(){

    game.gameFunctions.gameOver = false;
    game2.gameFunctions.gameOver = false;
    game.gameFunctions.reset();
    game2.gameFunctions.reset();
    game.gameFunctions.state = true;
    game2.gameFunctions.state = true;
}
function scoreMaintainer(){
    let score = 0
    let scoreDiv = document.getElementById("scrdiv");
    setInterval(
       ()=>{
        if(game.gameFunctions.state){
            score++;
            // console.log(score);
            scoreDiv.innerText = `${score}`
        }else{
            score=0;
            // scoreDiv.innerText
        }
            
       },500
    )

}