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
        this.sceneFunction = new SceneFunction();
        this.gameScene = this.sceneFunction.createScene(1080,200);
        this.gameFunctions = new GameFunctions(this.gameScene.canvas,this.gameScene.context,4,this);
        this.obstacleArr = [];
        this.dino;
        this.obstacleAssetArr=[];
        this.GameLoop = this.GameLoop.bind(this)

        if(mode===0){//main player(offline)

            this.sceneFunction.loadImages(assets.obstImagePaths).then((resolved)=>{this.obstacleAssetArr.push(...resolved)});
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
            this.gameFunctions.state = true;
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
        // console.log(this.obstacleArr.length);
        if(this.gameFunctions.state){

            this.gameScene.context.clearRect(0,0,this.gameScene.canvas.width,this.gameScene.canvas.height);
        
            this.sceneFunction.addObject_toScene(this.dino,this.gameScene.context,this.gameScene.canvas);
            
            this.gameFunctions.addAllObstacles(this.obstacleArr);
            
        }
        requestAnimationFrame(this.GameLoop);
    }
}
export default GameInstance;