import GameInstance from "./js/GameInstance.js";
import controllers from "./js/InputController.js";
// let{InputController,NetworkController} = controllers;

let game;
let game2;

window.handleHost = handleHost;
window.handleJoin = handleJoin;
window.setremote = setremote;
window.copyToClipboard = copyToClipboard;

window.addEventListener("obstSpawn",(e)=>{

    let idx = e.detail.idx;
    let obstacleImgObj = game2.obstacleAssetArr[idx];
    let obstacleImg = obstacleImgObj.img;
    let obst = game2.gameFunctions.createGameObject(obstacleImg,obstacleImgObj.width,obstacleImgObj.height,game2.gameFunctions.canvas.height-obstacleImgObj.height,1000,true,true,false,true,undefined);
    obst.stateFn = ()=>{
        game2.gameFunctions.moveLeft(obst);
        game2.gameFunctions.collisionWithPlayer(obst)
    }
    game2.obstacleArr.push(obst);
    if(game2.obstacleArr[0].x<0){
        game2.obstacleArr.shift();
    }

})
window.addEventListener("jump",(e)=>{
    game2.dino.state = true;
    game2.dino.stateFn = jumpfn
})

function jumpfn(obj){
    if(obj.state!==undefined && obj.state===true){
            
        if(obj.y<=0){
            obj.state=false;
        }else{
            obj.ground = false;
            obj.y-=15;
        }
    }
    
}
game = new GameInstance(0);




function handleHost(){
    game.connection.hostSession();
    game.mode=1;
}
function handleJoin(){
    game2 = new GameInstance(1);
    game2.connection.joinSession();
    game2.gameFunctions.state = true;
    game.connection.rtc = game2.connection.rtc
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