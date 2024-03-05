import InputController from "./js/InputController.js";
import GameFunctions from "./js/gamefunctions.js";
import SceneFunction from "./js/sceneFunction.js";

let inputController;
let sceneFunction = new SceneFunction();
let gameScene = sceneFunction.createScene(1080,200);

let gameFunctions = new GameFunctions(gameScene.canvas,gameScene.context);
let obstacleArr = [];

// pre declaring gameObjects
let dino;
let cactusImgs=[];


//loading dino asset and running animation loop
sceneFunction.loadImages(["../assets/dino.png"]).then(
    
    (resolved)=>{
        let dinoImg = resolved[0]
        dino = gameFunctions.createGameObject(dinoImg,50,50,gameScene.canvas.height-50, 10,true,true,true)
        inputController= new InputController(dino);
        requestAnimationFrame(GameLoop)
    }
    
)
sceneFunction.loadImages(["../assets/cactus.png"]).then((resolved)=>{cactusImgs=cactusImgs.push(...resolved)});
gameFunctions.spawnObstacles(obstacleArr,cactusImgs);

function GameLoop(){

    gameScene.context.clearRect(0,0,gameScene.canvas.width,gameScene.canvas.height);
    sceneFunction.addObject_toScene(dino,gameScene.context,gameScene.canvas);
    gameFunctions.addAllObstacles(obstacleArr);
    requestAnimationFrame(GameLoop);
}


