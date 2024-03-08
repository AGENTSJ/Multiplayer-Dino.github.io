class InputController{

    constructor(gameInstance){

        this.gameInstance = gameInstance;

        document.addEventListener("keydown",(event)=>{
            if(event.code ==="Space" && this.gameInstance.dino.ground){
                this.gameInstance.connection.sendPlayerState();//multiplayer
                this.gameInstance.dino.state = true;//makes statefn to run in addobstacletoscene fn in sceneFunction
                this.gameInstance.dino.stateFn = this.jumpfn;

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
    
    constructor(gameInstance){
        this.gameInstance = gameInstance;
    }
    spawnObstacle(idx){

        let obstacleImgObj = this.gameInstance.obstacleAssetArr[idx];

        let obstacleImg = obstacleImgObj.img;

        let obst = this.gameInstance.gameFunctions.createGameObject(obstacleImg,obstacleImgObj.width,obstacleImgObj.height,this.gameInstance.gameFunctions.canvas.height-obstacleImgObj.height,1000,true,true,false,true,undefined);
        obst.stateFn = ()=>{
            this.gameInstance.gameFunctions.moveLeft(obst);
            this.gameInstance.gameFunctions.collisionWithPlayer(obst)
        }

        this.gameInstance.obstacleArr.push(obst);
        if(this.gameInstance.obstacleArr[0].x<0){
            this.gameInstance.obstacleArr.shift();
        }
    }
    makeJump(gameInstance){
        this.gameInstance.dino.state = true;
        this.gameInstance.dino.stateFn = this.jumpfn
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