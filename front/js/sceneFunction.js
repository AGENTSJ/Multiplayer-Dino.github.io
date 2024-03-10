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

    loadDecorations(decorationPath,decorationAssetArr,decorationGameObjects,gameFunctions){
        this.loadImages(decorationPath).then((resolved)=>{
            decorationAssetArr.push(...resolved);
            for(let i = 0;i<decorationAssetArr.length;i++){
                let decor = decorationAssetArr[i]; 
                let x,y;
                
                if(i===0){//game over decoration
                    x = (window.innerWidth/2)-decor.width/2;
                    y = (gameFunctions.canvas.height/2)-decor.height/2
                    
                }else{//other decoration if avilable
                    x = window.innerWidth;
                    y = gameFunctions.canvas.height-decor.height;
                }
                let decorObj = gameFunctions.createGameObject(decor.img,decor.width,decor.height,y,x,true,false,false,false,false,undefined);
                decorationGameObjects.push(decorObj);
            }
        });
    }
}

export default SceneFunction;