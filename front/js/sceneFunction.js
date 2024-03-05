class SceneFunction{

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

    async loadImages(imagePaths) {
        let images = [];
    
        for (let path of imagePaths) {
            let image = new Image();
            image.src = path;
    
            let loadedImage = new Promise((resolve, reject) => {
                image.onload = () => resolve(image);
                image.onerror = reject;
            });
    
            images.push(loadedImage);
        }
    
        return Promise.all(images);
    }

    addGravity(gameObject,canvas){
        let gr = 5;
        if(gameObject.y <= canvas.height-gameObject.height){
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
        }
    }

}

export default SceneFunction;