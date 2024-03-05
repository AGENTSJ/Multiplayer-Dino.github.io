
class InputController{
    constructor(playerDino){

        document.addEventListener("keydown",(event)=>{
            if(event.code ==="Space"){
                this.jumpfn(playerDino);
            }
        })
    }
    jumpfn(obj){

        if(obj.ground){
            obj.y -=100;
            obj.ground = false;
        }
        
    }
}
export default InputController;