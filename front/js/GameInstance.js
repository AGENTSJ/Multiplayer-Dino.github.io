import controllers from "./InputController.js";
import GameFunctions from "./gamefunctions.js";
import SceneFunction from "./sceneFunction.js";
import assets from "./assets.js";


let {InputController,NetworkController} = controllers;

class GameInstance{
    //0 offline 
    //1 online
    constructor(mode,name){

        this.name = name;
        this.mode = mode;
        this.inputController;
        this.connection;
        this.sceneFunction = new SceneFunction(this.mode);
        this.gameScene = this.sceneFunction.createScene(window.innerWidth,window.innerWidth*0.185);
        this.gameFunctions = new GameFunctions(this.gameScene.canvas,this.gameScene.context,this.speedController(),this);
        this.obstacleArr = [];
        this.dino;
        this.obstacleAssetArr=[];
        this.decorationAssetArr = [];
        this.decorationGameObjects=[];
        this.GameLoop = this.GameLoop.bind(this)

        if(mode===0){//main player(offline)

            // loading obstacles
            this.sceneFunction.loadImages(assets.obstImagePaths).then((resolved)=>{this.obstacleAssetArr.push(...resolved)});
            
            this.sceneFunction.loadDecorations(assets.decorationPath,this.decorationAssetArr,this.decorationGameObjects,this.gameFunctions)

            this.gameFunctions.spawnObstacles(this.obstacleArr,this.obstacleAssetArr);
    
            this.sceneFunction.loadImages(assets.playerPath).then(
                (resolved)=>{
                    let dinoObj = resolved[0];
                    this.dino = this.gameFunctions.createGameObject(dinoObj.img,dinoObj.width,dinoObj.height,this.gameScene.canvas.height-dinoObj.height, 10,true,true,true,false,undefined);
                    this.inputController = new InputController(this);
                    this.gameFunctions.player = this.dino;
                    requestAnimationFrame(this.GameLoop)
                }
            )
        }else{//remote player (online)
            
            this.sceneFunction.loadImages(assets.obstImagePaths).then((resolved)=>{this.obstacleAssetArr.push(...resolved)});
            this.sceneFunction.loadImages(assets.playerPath).then(
                (resolved)=>{
                    let dinoObj = resolved[0];
                    this.dino = this.gameFunctions.createGameObject(dinoObj.img,dinoObj.width,dinoObj.height,this.gameScene.canvas.height-dinoObj.height, 10,true,true,true,false,undefined);               
                    this.gameFunctions.player = this.dino;
                    requestAnimationFrame(this.GameLoop)
                }
            )
            
        }

        
    } 
    GameLoop(){
        if(this.gameFunctions.state){
            // if(this.mode ===2){
            //     console.log("running tho");
            // }

            this.gameScene.context.clearRect(0,0,this.gameScene.canvas.width,this.gameScene.canvas.height);
        
            this.sceneFunction.addObject_toScene(this.dino,this.gameScene.context,this.gameScene.canvas);
            
            this.gameFunctions.addAllObstacles(this.obstacleArr);
            
        }
        if(this.gameFunctions.gameOver){
            this.sceneFunction.addObject_toScene(this.decorationGameObjects[0],this.gameFunctions.context,this.gameFunctions.canvas)
        }
        
        requestAnimationFrame(this.GameLoop);
    }
    speedController(){      
        return window.innerWidth*0.003703;
    }
}
export default GameInstance;