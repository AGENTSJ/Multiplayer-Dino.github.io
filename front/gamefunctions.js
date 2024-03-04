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

