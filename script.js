
window.addEventListener('scroll', function() {
    var backToTopButton = document.getElementById('back_to_top');
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

document.getElementById('back_to_top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const formRegister=document.getElementById("form")
const inputNombre=document.getElementById("name");
const inputTelefono=document.getElementById("telefono");
const inputEmail=document.getElementById("email");
const inputTipoConsulta=document.getElementById("tipo_consulta");
const inputMensaje = document.getElementById("message");

const errorNombre=document.getElementById("error_name");
const errorEmail=document.getElementById("error_email");
const errorSelect=document.getElementById("error_select");
const errorMessage=document.getElementById("error_message");
const errorCaptcha=document.getElementById("error_captcha");
const errorEnviado=document.getElementById("error_enviado");


formRegister.addEventListener("submit",e=>{
    e.preventDefault();
    let valor=false;
    errorNombre.innerHTML="";
    errorEmail.innerHTML="";
    errorSelect.innerHTML="";
    errorMessage.innerHTML="";
    errorCaptcha.innerHTML="";
    errorEnviado.innerHTML="";
    let regexEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const captchaResponse = grecaptcha.getResponse();
    
    if(inputNombre.value.length<3){
        errorNombre.innerHTML=`EY! NO PUSISTE TU NOMBRE`
        valor=true;
    }
    if(!regexEmail.test(inputEmail.value)){
        errorEmail.innerHTML=`MMHH, EL EMAIL NO PARECE VÁLIDO... INTENTA DE NUEVO!`
        valor=true;
    }
    if(inputTipoConsulta.value=="default"){
        errorSelect.innerHTML=`ELIJE EL TIPO DE CONSULTA`
        valor=true;
    }
    if(inputMensaje.value.length<3){
        errorMessage.innerHTML=`CONTANOS ALGO, ASI SABREMOS POR DONDE EMPEZAR`
        valor=true;
     }

    if(!captchaResponse.length > 0){
        errorCaptcha.innerHTML=`EY! SOS UNA MAQUINA?, VALIDA EL CAPTCHA!`
        valor=true;
    }

    if(valor){

    }else{
        errorEnviado.innerHTML="Consulta enviada. Gracias! :)";
        formRegister.reset();
    }
    })

   












