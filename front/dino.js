
let scene = document.getElementById("gameScene");
scene.width = 1080;
scene.height = 200;
const context = scene.getContext("2d");



let dinoImg = new Image()
dinoImg.src = "../assets/dino.png"
let dino;
let cactus ={
    height:50
}
function gravity(obj){
    let gr = 3;
    if(obj.y <= scene.height-obj.height){
        obj.y+=gr;
    }else{
        obj.ground =true
    }
}
let space = document.addEventListener("keydown",(event)=>{
    if(event.code ==="Space"){
       dino.jumpfn();
    }
})
dinoImg.onload = function(){

    dino = {
        img:dinoImg,
        width:50,
        height:50,
        y: scene.height-this.height,
        x: 10,
        ground:true,
        jumpfn:function(){
            if(this.ground){
                this.y -=cactus.height+50;
                this.ground = false
            }
            
        }
    }
    
    
    requestAnimationFrame(update)
}

function update(){
    context.clearRect(0,0,scene.width,scene.height)
    context.drawImage(dino.img, dino.x, dino.y, dino.width, dino.height);
    gravity(dino)
    requestAnimationFrame(update)

}