import SceneFunction from "./sceneFunction.js";
import Connections from "./connection.js";

let connection = new Connections();

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class GameFunctions{
    constructor(canvas,context,obstacleSpeed){
        this.canvas = canvas;
        this.sceneFunction = new SceneFunction();
        this.context = context;
        this.obstacleSpeed=obstacleSpeed;
        this.spawnRate = 1000;//spawn 1 obst per 1 second
        this.player = undefined;
        this.state = false;

    }
    createGameObject(img,width,height,y,x,ground,collision,gravity,state,stateFn){
        return(
            {
                img:img,
                width:width,
                height:height,
                y:y,
                x: x,
                ground:ground,
                collision:collision,
                gravity:gravity,
                state:state,
                stateFn:stateFn
            }
        )
    }
    moveLeft(obj){
        if(obj!==undefined){
            obj.x-=this.obstacleSpeed;
        }
    }
    collisionWithPlayer(obj){
        // verbose fn 
        let slack = 20;
        let xp1 =this.player.x+slack;
        let xp2 = this.player.x+this.player.width-slack;
        let xobs1 = obj.x;
        let xobs2 = obj.x+obj.width;
        
        let yp1 = this.player.y+slack;
        let yp2 = this.player.y+this.player.height-slack;
        let yobs1 = obj.y;
        let yobs2 = obj.y+obj.height;

        if(xp2>xobs1 && xp1<xobs2 && yp1<yobs2 && yp2>yobs1){
            this.state = false;//game state
            connection.sendGameState(this.state); //con
        }

    }
    spawnObstacles(obsArr,obstacle_Asset_Arr){
        
        setInterval(()=>{
    
            if(obstacle_Asset_Arr!==undefined && this.state){
                let randomIdx  = getRandomValue(0,obstacle_Asset_Arr.length-1);
                let obstacleImgObj = obstacle_Asset_Arr[randomIdx];

                let obstacleImg = obstacleImgObj.img;

                let obst = this.createGameObject(obstacleImg,obstacleImgObj.width,obstacleImgObj.height,this.canvas.height-obstacleImgObj.height,1000,true,true,false,true,undefined);
                obst.stateFn = ()=>{
                    this.moveLeft(obst);
                    this.collisionWithPlayer(obst)
                }
                connection.sendObstacleSpawn(randomIdx);//con
                obsArr.push(
                    obst
                );
                if(obsArr[0].x<0){
                    obsArr.shift();
                }
            }
 
        },this.spawnRate)
        
    }
    addAllObstacles(obsArr){
        for(let i =0;i<obsArr.length;i++){
            
            this.sceneFunction.addObject_toScene(obsArr[i],this.context,this.canvas);
            // this.moveLeft(obsArr[i]);
        }
    }
    reset(obsArr){
        obsArr.length=0;
    }

}


export default GameFunctions;