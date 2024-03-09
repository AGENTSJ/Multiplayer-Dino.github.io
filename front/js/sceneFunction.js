class SceneFunction{
    constructor(){

    }
    
    createScene(width,height){
        let gameCanvas = document.createElement("canvas");
        gameCanvas.width = width;
        gameCanvas.height = height;
        let context = gameCanvas.getContext('2d');
        let gameCont = document.getElementById("games")
        gameCont.appendChild(gameCanvas)
        let scene = {
            canvas:gameCanvas,
            context:context
        }
        return scene;
    }


    async loadImages(imageInfoArr) {
        let images = [];
        
        for(let obj of imageInfoArr){
            let image = new Image();
            image.src = obj.path;
            
            let loadingPromise = new Promise((resolve,reject)=>{
                image.onload = ()=>{
                    resolve({img:image,height:obj.height,width:obj.width})
                }
                image.onerror = ()=>{
                    reject("failed to load image")
                }
            })
            images.push(loadingPromise)
           
        }
        return Promise.all(images)
        
    }

    addGravity(gameObject,canvas){
        const gravityRatioFactor = 0.00555;
        // let gr = 6;
        let gr = gravityRatioFactor*window.innerWidth;
        if(gameObject.y <= canvas.height-gameObject.height-5){
            gameObject.y+=gr;
        }else{
            gameObject.ground =true;
        }
    }

    addObject_toScene(obj,context,canvas){
        if (obj!==undefined){
    
            context.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
            if(obj.gravity){
                this.addGravity(obj,canvas);
            }

            if(obj.state!==undefined && obj.state){
                obj.stateFn(obj);
            }
        }
    }

}

export default SceneFunction;