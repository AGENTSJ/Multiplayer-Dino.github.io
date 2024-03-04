
let scene = document.getElementById("gameScene");
scene.width = 1080;
scene.height = 200;
const context = scene.getContext("2d");


let dinoImg = new Image();
let cactusImg = new Image();

dinoImg.src = "../assets/dino.png";
cactusImg.src = "../assets/cactus.png";

let dino;
let cactus;

let obstacleArr = [];

function jumpfn(obj){

    if(obj.ground){
        obj.y -=cactus.height+100;
        obj.ground = false
    }
    
}
function moveLeft(obj){
    if(obj!==undefined){
        obj.x-=2;
    }
}
function spawnObstacles(obsArr){

    setInterval(()=>{

        if(cactusImg!==undefined){

            obst = createGameObject(img=cactusImg,width=30,height=50,y=scene.height-this.height,x=1000,ground=true,collision=true,gravity=true);
            obsArr.push(
                obst
            )
            if(obsArr[0].x<0){
                obsArr.shift();
            }
        }
        console.log(obsArr.length);
    },500)
    
}
function addAllObstacles(obsArr){
    for(let i =0;i<obsArr.length;i++){
        
        addObject_toScene(obsArr[i]);
        moveLeft(obsArr[i]);
    }
}


function addGravity(gameObject){
    let gr = 5;
    if(gameObject.y <= scene.height-gameObject.height){
        gameObject.y+=gr;
    }else{
        gameObject.ground =true
    }
}
function addObject_toScene(obj){
    if (obj!==undefined){

        context.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        if(obj.gravity){
            addGravity(obj)
        }
    }
}

let space = document.addEventListener("keydown",(event)=>{
    if(event.code ==="Space"){
       jumpfn(dino);
    }
})

function createGameObject(img,width,height,y,x,ground,collision,gravity){
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

//execution 
cactusImg.onload = ()=>{
    cactus = createGameObject(img=cactusImg,width=30,height=50,y=scene.height-this.height,x=1000,ground=true,collision=true,gravity=true);
}
dinoImg.onload = function(){
    
    dino = createGameObject(img=dinoImg,width=50,height=50,y=scene.height-this.height,x= 10,ground=true,collision=true,gravity=true);
    requestAnimationFrame(update);
}

spawnObstacles(obstacleArr)


function update(){
    context.clearRect(0,0,scene.width,scene.height);
    addObject_toScene(dino);
    addAllObstacles(obstacleArr)
    requestAnimationFrame(update);

}