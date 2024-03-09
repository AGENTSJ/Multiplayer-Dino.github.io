function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


class GameFunctions{

    constructor(canvas,context,obstacleSpeed,gameInstance){
        
        this.gameInstance = gameInstance
        this.canvas = canvas;
        this.sceneFunction = this.gameInstance.sceneFunction;
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
        let slack = window.innerWidth*0.001;
        // let slack = 0;
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
            if(this.gameInstance.mode===1){
                this.gameInstance.connection.sendGameState()
            }
        }

    }

    spawnObstacles(obsArr,obstacle_Asset_Arr){
        
        setInterval(()=>{
    
            if(obstacle_Asset_Arr!==undefined && this.state){
                let randomIdx  = getRandomValue(0,obstacle_Asset_Arr.length-1);
                
                if(this.gameInstance.mode===1){
                    this.gameInstance.connection.sendObstacleSpawn(randomIdx);
                }
                let obstacleImgObj = obstacle_Asset_Arr[randomIdx];

                let obstacleImg = obstacleImgObj.img;

                let obst = this.createGameObject(obstacleImg,obstacleImgObj.width,obstacleImgObj.height,this.canvas.height-obstacleImgObj.height,window.innerWidth,true,true,false,true,undefined);
                obst.stateFn = ()=>{
                    this.moveLeft(obst);
                    this.collisionWithPlayer(obst)
                }
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
        
        for(let i =0;i<this.gameInstance.obstacleArr.length;i++){
            
            this.sceneFunction.addObject_toScene(this.gameInstance.obstacleArr[i],this.context,this.canvas);

        }
    }
    reset(obsArr){
        this.gameInstance.obstacleArr.length=0;
    }

}


export default GameFunctions;