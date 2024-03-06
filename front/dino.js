import InputController from "./js/InputController.js";
import GameFunctions from "./js/gamefunctions.js";
import SceneFunction from "./js/sceneFunction.js";
import assets from "./js/assets.js";

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
        inputController = new InputController(dino);
        gameFunctions.player = dino;
        requestAnimationFrame(GameLoop)
    }
)



function GameLoop(){
    if(gameFunctions.state){

        gameScene.context.clearRect(0,0,gameScene.canvas.width,gameScene.canvas.height);
    
        sceneFunction.addObject_toScene(dino,gameScene.context,gameScene.canvas);
    
        gameFunctions.addAllObstacles(obstacleArr);
    
        requestAnimationFrame(GameLoop);
    }
}


