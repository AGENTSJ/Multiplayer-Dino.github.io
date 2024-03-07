
let obstImagePaths = [
    
    {
        path:"../assets/obstacles/cactus1.png",
        height:35,
        width:25
    },
    {
        path:"../assets/obstacles/cactus2.png",
        height:35,
        width:30
    },
    {
        path:"../assets/obstacles/cactus3.png",
        height:35,
        width:45
    },
    {
        path:"../assets/obstacles/big-cactus1.png",
        height:50,
        width:30
    },
    {
        path:"../assets/obstacles/big-cactus2.png",
        height:50,
        width:60
    },
    {
        path:"../assets/obstacles/big-cactus3.png",
        height:50,
        width:90
    }
]

let playerPath = [
    {
        path:"../assets/player/dino.png",
        height:50,
        width:50
    }
]


let obstMap = new Map()
obstImagePaths.forEach((e,idx)=>{
    obstMap.set(idx,e)
})

let assets = {
    obstImagePaths:obstImagePaths,
    playerPath:playerPath,
    map:obstMap
}
    export default assets;

