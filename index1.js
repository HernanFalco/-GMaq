const nombre = document.getElementById("name");
const mensaje = document.getElementById("message");
const email = document.getElementById("email");
const acepto_condiciones = document.getElementById("acepto_condiciones");
const error = document.getElementById("error");

function enviarFormulario(){
    console.log('Enviando consulta...');
    
    var mensajesError = [];

    if(nombre.value === null || nombre.value === ""){
        mensajesError.push("Ingrese su nombre");
     }

     if(mensaje.value === null || mensaje.value === ""){
        mensajesError.push("Ingrese un mensaje");
     }

     if(email.value === null || email.value === ""){
        mensajesError.push("Ingrese su email");
     }

      if(acepto_condiciones.checked){
      }else{
            mensajesError.push('Acepte términos y condiciones');
      }

    error.innerHTML = mensajesError.join (", ");

    return false;
}
