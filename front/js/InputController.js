class InputController{

    constructor(gameInstance){

        this.gameInstance = gameInstance;

        document.addEventListener("keydown",(event)=>{
            if(event.code ==="Space" && this.gameInstance.dino.ground){
                this.gameInstance.dino.state = true;//makes statefn to run in addobstacletoscene fn in sceneFunction
                this.gameInstance.dino.stateFn = this.jumpfn;
                if(this.gameInstance.mode===1){
                    this.gameInstance.connection.sendJump();
                }
            }
        })

        this.gameInstance.gameFunctions.canvas.addEventListener('click', (event) => {
            this.gameInstance.gameFunctions.state = true;
            this.gameInstance.gameFunctions.reset(this.gameInstance.obstacleArr);
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
    
    constructor(){
        
    }
    spawnObstacle(gameInstance,idx){

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
    gameOver(gameInstance){
        gameInstance.gameFunctions.state = false;
    }
    makeJump(gameInstance){
        gameInstance.dino.state = true;
        gameInstance.dino.stateFn = this.jumpfn
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

let controllers = {
    InputController:InputController,
    NetworkController:NetworkController
}
export default controllers;