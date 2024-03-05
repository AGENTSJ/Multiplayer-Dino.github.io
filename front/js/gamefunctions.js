import SceneFunction from "./sceneFunction.js";

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
class GameFunctions{
    constructor(canvas,context,obstacleSpeed){
        this.canvas = canvas;
        this.sceneFunction = new SceneFunction();
        this.context = context;
        this.obstacleSpeed=obstacleSpeed;
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

    spawnObstacles(obsArr,obstacle_Asset_Arr){
        
        setInterval(()=>{
    
            if(obstacle_Asset_Arr!==undefined){
                let randomIdx  = getRandomValue(0,obstacle_Asset_Arr.length-1);
                let obstacleImgObj = obstacle_Asset_Arr[randomIdx];

                let obstacleImg = obstacleImgObj.img;

                let obst = this.createGameObject(obstacleImg,obstacleImgObj.width,obstacleImgObj.height,this.canvas.height-obstacleImgObj.height,1000,true,true,false,true,undefined);
                obst.stateFn = ()=>{this.moveLeft(obst)}
                obsArr.push(
                    obst
                );
                if(obsArr[0].x<0){
                    obsArr.shift();
                }
            }
 
        },1000)
        
    }

    addAllObstacles(obsArr){
        for(let i =0;i<obsArr.length;i++){
            
            this.sceneFunction.addObject_toScene(obsArr[i],this.context,this.canvas);
            // this.moveLeft(obsArr[i]);
        }
    }

}


export default GameFunctions;