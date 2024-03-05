import SceneFunction from "./sceneFunction.js";

class GameFunctions{
    constructor(canvas,context){
        this.canvas = canvas;
        this.sceneFunction = new SceneFunction()
        this.context = context
    }

    createGameObject(img,width,height,y,x,ground,collision,gravity){
        return(
            {
                img:img,
                width:width,
                height:height,
                y:y,
                x: x,
                ground:ground,
                collision:collision,
                gravity:gravity
            }
        )
    }

    moveLeft(obj){
        if(obj!==undefined){
            obj.x-=2;
        }
    }

    spawnObstacles(obsArr,obstacleImgs){
        
        setInterval(()=>{
    
            if(obstacleImgs!==undefined){
                let obstacleImg = obstacleImgs[0]

                let obst = this.createGameObject(obstacleImg,30,50,this.canvas.height-50,1000,true,true,true);
                obsArr.push(
                    obst
                )
                if(obsArr[0].x<0){
                    obsArr.shift();
                }
            }
            // console.log(obsArr.length);
        },500)
        
    }

    addAllObstacles(obsArr){
        for(let i =0;i<obsArr.length;i++){
            
            this.sceneFunction.addObject_toScene(obsArr[i],this.context,this.canvas);
            this.moveLeft(obsArr[i]);
        }
    }

}


export default GameFunctions;