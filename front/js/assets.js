function scaleWidth(width){
    let canvasWidth = window.innerWidth;
    let ratiofactor = 1080/width;
    let newWidth = canvasWidth/ratiofactor
    return newWidth;
}
function scaleHeight(oldwidth,oldheight,scaledWidth){
    
    let ratiofactor = oldheight/oldwidth;
    let newHeight = ratiofactor*scaledWidth;
    return newHeight;
}

let obstImagePaths = [
    
    {
        path:"./assets/obstacles/cactus1.png",
        width:scaleWidth(15),
        height:scaleHeight(10,25,scaleWidth(15)),
    },
    {
        path:"./assets/obstacles/cactus2.png",
        width:scaleWidth(20),
        height:scaleHeight(20,25,scaleWidth(20)),
    },
    {
        path:"./assets/obstacles/cactus3.png",
        width:scaleWidth(30),
        height:scaleHeight(30,25,scaleWidth(30)),
    },
    {
        path:"./assets/obstacles/big-cactus1.png",
        width:scaleWidth(20),
        height:scaleHeight(20,40,scaleWidth(20)),
    },
    {
        path:"./assets/obstacles/big-cactus2.png",
        width:scaleWidth(40),
        height:scaleHeight(40,40,scaleWidth(40)),
    },
    {
        path:"./assets/obstacles/big-cactus3.png",
        width:scaleWidth(60),
        height:scaleHeight(60,40,scaleWidth(60)),
    }
]

let playerPath = [
    {
        path:"./assets/player/dino.png",
        width:scaleWidth(40),
        height:scaleHeight(40,40,scaleWidth(40))
    }
]
let decorationPath = [
    {
        path:"./assets/game-over.png",
        width:scaleWidth(400),
        height:scaleHeight(400,100,scaleWidth(400))
    }
]
let assets = {
    obstImagePaths:obstImagePaths,
    playerPath:playerPath,
    decorationPath:decorationPath

}
    export default assets;

