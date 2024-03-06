
class InputController{
    constructor(playerDino){

        document.addEventListener("keydown",(event)=>{
            if(event.code ==="Space" &&playerDino.ground){
                playerDino.state = true;//makes statefn to run in addobstacletoscene fn in sceneFunction
                playerDino.stateFn = this.jumpfn;
            }
        })
    }
    jumpfn(obj){
        if(obj.state!==undefined && obj.state===true){
                
            if(obj.y<=0){
                obj.state=false;
            }else{
                obj.ground = false;
                obj.y-=15;
            }
        }
        
    }
}
export default InputController;