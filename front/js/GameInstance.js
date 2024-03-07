import controllers from "./InputController.js";
import GameFunctions from "./gamefunctions.js";
import SceneFunction from "./sceneFunction.js";
import assets from "./assets.js";
import Connections from "./connection.js";
let {InputController,NetworkController} = controllers;

class GameInstance{
    //0 offline 
    //1 online
    constructor(mode){

        this.connection = new Connections();
        this.mode = mode;
        this.inputController;
        this.sceneFunction = new SceneFunction();
        this.gameScene = this.sceneFunction.createScene(1080,200);
        this.gameFunctions = new GameFunctions(this.gameScene.canvas,this.gameScene.context,4,this);
        this.obstacleArr = [];
        this.dino;
        this.obstacleAssetArr=[];
        this.GameLoop = this.GameLoop.bind(this)
        
        this.sceneFunction.loadImages(assets.obstImagePaths).then((resolved)=>{this.obstacleAssetArr.push(...resolved)});
        this.gameFunctions.spawnObstacles(this.obstacleArr,this.obstacleAssetArr);

        this.sceneFunction.loadImages(assets.playerPath).then(
            (resolved)=>{
                let dinoObj = resolved[0];
                this.dino = this.gameFunctions.createGameObject(dinoObj.img,dinoObj.width,dinoObj.height,this.gameScene.canvas.height-dinoObj.height, 10,true,true,true,false,undefined);
                if(this.mode===0){//offline

                    this.inputController = new InputController(this.dino,this.gameFunctions,this.obstacleArr);
                }else{//remote player
                    this.inputController = new NetworkController(this.dino,this.gameFunctions,this.obstacleArr)
                }
                this.gameFunctions.player = this.dino;
                requestAnimationFrame(this.GameLoop)
            }
        )

        
    } 
    GameLoop(){

        if(this.gameFunctions.state){

            this.gameScene.context.clearRect(0,0,this.gameScene.canvas.width,this.gameScene.canvas.height);
        
            this.sceneFunction.addObject_toScene(this.dino,this.gameScene.context,this.gameScene.canvas);
        
            this.gameFunctions.addAllObstacles(this.obstacleArr);
            
        }
        requestAnimationFrame(this.GameLoop);
    }
}
export default GameInstance;