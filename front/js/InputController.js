

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

    spawnObstacles(gameInstance,idx){
        console.log(idx);
        let obstacleImgObj = gameInstance.obstacleAssetArr[idx];

        let obstacleImg = obstacleImgObj.img;

        let obst = gameInstance.gameFunctions.createGameObject(obstacleImg,obstacleImgObj.width,obstacleImgObj.height,gameInstance.gameFunctions.canvas.height-obstacleImgObj.height,1000,true,true,false,true,undefined);
        
        obst.stateFn = ()=>{
            gameInstance.gameFunctions.moveLeft(obst);
            gameInstance.gameFunctions.collisionWithPlayer(obst)
        }
        gameInstance.obstacleArr.push(obst);
        if(gameInstance.obstacleArr[0].x<0){
            gameInstance.obstacleArr.shift();
        }
    }
    
}
let controllers = {
    InputController:InputController,
    NetworkController:NetworkController
}
export default controllers;