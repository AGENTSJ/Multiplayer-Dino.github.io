// import Connections from "./connection.js";

// let connection = new Connections();

class InputController{
    constructor(playerDino,gameFunctions,obstacleArr){

        document.addEventListener("keydown",(event)=>{
            if(event.code ==="Space" && playerDino.ground){
                playerDino.state = true;//makes statefn to run in addobstacletoscene fn in sceneFunction
                playerDino.stateFn = this.jumpfn;
                // connection.sendPlayerState();//con
            }
        })
        gameFunctions.canvas.addEventListener('click', (event) => {
            // console.log("clicked",gameFunctions.state);
            gameFunctions.state = true;
            gameFunctions.reset(obstacleArr);
        });
    }
    jumpfn(obj){
        if(obj.state!==undefined && obj.state===true){
                
            if(obj.y<=0){
                obj.state=false;
            }else{
                obj.ground = false;
                obj.y-=15;
            }
        }
        
    }
}
class NetworkController{

    constructor(playerDino,gameFunctions,obstacleArr){

        gameFunctions.canvas.addEventListener('click', (event) => {
            console.log("clicked",gameFunctions.state);
            gameFunctions.state = true;
            gameFunctions.reset(obstacleArr);
        });
    }
    
}
let controllers = {
    InputController:InputController,
    NetworkController:NetworkController
}
export default controllers;