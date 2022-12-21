const socket = io();


// Recibir y renderizar Productos
socket.on('productos', (productos) =>{

    console.log(productos)

})

//Enviar Producto, empaquetar e enviar al servidor
const formProducto = document.getElementById("formularioProductos")

formProducto.addEventListener('submit', (event) => {

    event.preventDefault()

    console.log("Formulario Productos Completo")

    const producto = {
        nombre: document.getElementById("nombre").value,
        precio: document.getElementById("precio").value,
        imagen: document.getElementById("imagen").value
    }

    socket.emit('nuevoProducto', producto)

})

//Enviar Mensaje, empaquetar mensaje e enviar al servidor
const formMensajes = document.getElementById("formularioMensajes")

formMensajes.addEventListener('submit', (event) => {

    event.preventDefault()

    console.log("Formulario Mensaje Completo")
    
    const mensaje = {
        autor: document.getElementById("autor").value,
        mensaje: document.getElementById("mensaje").value,
        date: new Date(Date.now()).toLocaleString()
    }

    socket.emit('nuevoMensaje', mensaje)

}) 

// //Recibir y renderizar Mensajes
socket.on('mensajes', async (mensajes) => {

    console.log(mensajes)

    // const html = (Array).isArray(mensajes).map((msj) => {
    //     return `<div class="rounded col-3 text-break" style="background: gray">
    //     <strong style="color: white">${msj.author}:</strong>
    //     <em style="color: white">${msj.text}</em>
    //     <br>
    //     <em>${msj.date}</em>
    //     </div>`
    // }).join("<br>")

    // document.getElementById("mensajes").innerHTML = html

})
