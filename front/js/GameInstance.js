import InputController from "./InputController.js";
import GameFunctions from "./gamefunctions.js";
import SceneFunction from "./sceneFunction.js";
import assets from "./assets.js";
import Connections from "./connection.js";

class SinglePlayer{

    constructor(){

        this.connection = new Connections();
        this.connection.hostSession()
        let inputController;
        let sceneFunction = new SceneFunction();
        let gameScene = sceneFunction.createScene(1080,200);

        let gameFunctions = new GameFunctions(gameScene.canvas,gameScene.context,4);
        let obstacleArr = [];

        // pre declaring gameObjects
        let dino;
        let obstacleAssetArr=[];
        
        sceneFunction.loadImages(assets.obstImagePaths).then((resolved)=>{obstacleAssetArr.push(...resolved)});
        gameFunctions.spawnObstacles(obstacleArr,obstacleAssetArr);

        sceneFunction.loadImages(assets.playerPath).then(
            (resolved)=>{
                let dinoObj = resolved[0];
                dino = gameFunctions.createGameObject(dinoObj.img,dinoObj.width,dinoObj.height,gameScene.canvas.height-dinoObj.height, 10,true,true,true,false,undefined);
                inputController = new InputController(dino,gameFunctions,obstacleArr);
                gameFunctions.player = dino;
                requestAnimationFrame(GameLoop)
            }
        )



        function GameLoop(){
            // console.log(gameFunctions.state);
            if(gameFunctions.state){

                gameScene.context.clearRect(0,0,gameScene.canvas.width,gameScene.canvas.height);
            
                sceneFunction.addObject_toScene(dino,gameScene.context,gameScene.canvas);
            
                gameFunctions.addAllObstacles(obstacleArr);
            
                
            }
            requestAnimationFrame(GameLoop);
        }
    } 
}
class MultiPlayer{
    constructor(){

        this.connection = new Connections();
        let inputController;
        let sceneFunction = new SceneFunction();
        let gameScene = sceneFunction.createScene(1080,200);
       
        let gameFunctions = new GameFunctions(gameScene.canvas,gameScene.context,4);
        let obstacleArr = [];

        // pre declaring gameObjects
        let dino;
        let obstacleAssetArr=[];
        
        this.connection.joinSession();



        sceneFunction.loadImages(assets.obstImagePaths).then((resolved)=>{obstacleAssetArr.push(...resolved)});
        gameFunctions.spawnObstacles(obstacleArr,obstacleAssetArr);

        sceneFunction.loadImages(assets.playerPath).then(
            (resolved)=>{
                let dinoObj = resolved[0];
                dino = gameFunctions.createGameObject(dinoObj.img,dinoObj.width,dinoObj.height,gameScene.canvas.height-dinoObj.height, 10,true,true,true,false,undefined);
                // inputController = new InputController(dino,gameFunctions,obstacleArr)
                gameFunctions.player = dino;
                requestAnimationFrame(GameLoop)
            }
        )



        function GameLoop(){
            if(gameFunctions.state){

                gameScene.context.clearRect(0,0,gameScene.canvas.width,gameScene.canvas.height);
            
                sceneFunction.addObject_toScene(dino,gameScene.context,gameScene.canvas);
            
                gameFunctions.addAllObstacles(obstacleArr);
            
            }
            requestAnimationFrame(GameLoop);
        }
    } 
}
let GameInstances = {
    SinglePlayer:SinglePlayer,
    MultiPlayer:MultiPlayer
}
export default GameInstances;