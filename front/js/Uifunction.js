let singleui = document.getElementById('sngbtn');
let multiui = document.getElementById("multiUI");
let readyUI = document.getElementById("redyUi");
let uiBtns = document.getElementById("uiBtns");
let guideDiv = document.getElementById("guide");

function setUp(){
    window.setSingle = setSingleUI;
    window.setMulti = setMultiUI;
    window.addEventListener("chanOpn",setReadyUI)
}
function setSingleUI(){
    singleui.style.display = "flex";
    multiui.style.display = "none";
    readyUI.style.display = "none";
    uiBtns.style.display = "none";

}
function setMultiUI(){
    multiui.style.display = "flex";
    GuideJoin(0);
    singleui.style.display = "none";
    readyUI.style.display = "none";
    uiBtns.style.display = "none";
}
function setReadyUI(){
    readyUI.style.display = "flex";
    multiui.style.display = "none";
    singleui.style.display = "none";
    uiBtns.style.display = "none";
}
function GuideHost(){
    let hostbtn = document.getElementById("hostbtn");
    hostbtn.style.display = "none"
    guideDiv.innerText = "copy this and send this to your friend and wait for your friend to send back something simmilar then paste it above then press Accept";

}
function GuideJoin(state){
    if(state===0){
        
        guideDiv.innerText = "if your friend has hosted a session he will send you a message that you should paste above then click Join else You should Host";
    }else{
        guideDiv.innerText = "send the current text above and send it back to your friend and wait for him to accept";
    }
    
}
function GuideAcceptee(){
    guideDiv.innerText ="See Easy...(I know it was the only way by which i could make it server less)";
}
let setUpFunctions = {
    setUp,
    GuideHost,
    GuideJoin,
    GuideAcceptee
}
export default setUpFunctions;