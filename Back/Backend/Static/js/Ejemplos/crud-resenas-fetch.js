const BASEURL = 'http://127.0.0.1:5500'; //direccion del servidor

//Async porque puede que quede en un tiempo de espera
async function fetchData(url, method, data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : null,
    };
    try {
    const response = await fetch (url,options);
    if(!response.ok){
        throw new Error (`Error: ${response.statusText}`);
    }
    return await response.json();
    } catch(error){
        console.error('Fetch error:', error);
        alert('Un error ocurriò buscando los datos. Por favor intente de nuevo')
    }
}

async function saveResena(){
    const idResena = document.querySelector('#id-resena').value;
    const nombre = document.querySelector('#nombre').value;
    const textoResena = document.querySelector('#texto-resena').value;

//Validacion de la reseña
    if(!nombre || textoResena){
        Swal.fire({
            title: 'Error!',
            text: 'Por favor complete todos los campos.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
        return;
    }

// Crea un objeto con los datos de la resena
    const resenaData = {
        nombre: nombre,
        texto_resena: textoResena,
    };

let result = null;

if (idResena!==""){
    result = await fetchData(`${BASEURL}/api/resenas/${idResena}`, 'PUT', resenaData);
} else {
    result = await fetchData(`${BASEURL}/api/resenas/`, 'POST', resenaData);
}

const formResena = document.querySelector('#form-resena');
formResena.reset();
Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
    })
    showResenas();
}

async function showResenas(){
    let resenas = await fetchData (BASEURL+ '/api/resenas/', 'GET');
    const tableResenas = document.querySelector('#list-table-resenas tbody');
    tableResenas.innerHTML='';
    resenas.forEach((resena,index)=>{
        let tr = `<tr>
                        <td>${resena.nombre}</td>
                        <td>${resena.texto_resena}</td>
                        <td>
                            <button class="btn-resena" onclick='updateResena(${resena.id_resena})'><i class="fa fa-pencil"></button></i>
                            <button class="btn-resena" onclick='deleteResena(${resena.id_resena})'><i class="fa fa-trash"></button></i>
                        </td>
                    </tr>`;
tableResenas.insertAdjacentHTML("beforeend", tr);
            
 });
}

function deleteResena(id){
    Swal.fire({
        title: "Esta seguro que desea eliminar la reseña?",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
    }).then(async (result) => {
        if (result.isConfirmed){
            let response = await fetchData (`${BASEURL}/api/resenas/${id}`, 'DELETE');
            showResenas();
            Swal.fire(response.message, "", "success");
        }
    });
}

async function updateResena(id){
    let response = await fetchData(`${BASEURL}/api/resenas/${id}`, 'GET');
    const idResena = document.querySelector('#id-resena');
    const nombre = document.querySelector('#nombre');
    const textoResena = document.querySelector('#texto-resena');

    idResena.value = response.id_resena;
    nombre.value = response.nombre;
    textoResena.value = response.texto_resena;
}

document.addEventListener('DOMContentLoaded', function(){
    const   btnSaveResena = document.querySelector('#btn-save-resena');
    btnSaveResena.addEventListener('click',saveResena)
    showResenas();
});
