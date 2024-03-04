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