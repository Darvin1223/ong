"Use strict";

document.addEventListener("DOMContentLoaded",()=>{
    let icon_bar = document.querySelector("#icon__bar");
    let navegacion = document.querySelector(".navegation");
    let contador = 0;
    icon_bar.addEventListener("click",(e)=>{
        e.preventDefault();
        if(contador == 1){
            navegacion.classList.add("navegation_active");
         
            contador = 0;
        }else{
            contador = 1;
        
            navegacion.classList.remove('navegation_active');
        }
    });
});