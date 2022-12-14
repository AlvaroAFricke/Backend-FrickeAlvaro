const socket = io();


//Recibir y renderizar Productos
// socket.on('productos', (productos) =>{

//     socket.render('./index.ejs', {productos})

// })

//Enviar Producto, empaquetar e enviar al servidor
const formProducto = document.getElementById("formularioProductos")

formProducto.addEventListener('submit', (event) => {

    event.preventDefault()

    console.log("estoyEnFormProd")

    const producto = {
        nombre: document.getElementById("nombre"),
        precio: document.getElementById("precio"),
        imagen: document.getElementById("imagen")
    }

    socket.emit('nuevoProducto', producto)

})

//Enviar Mensaje, empaquetar mensaje e enviar al servidor
const formMensajes = document.getElementById("formularioMensajes")

formMensajes.addEventListener('submit', (event) => {

    event.preventDefault()

    console.log("estoyEnFormMensa")
    
    const mensaje = {
        autor: document.getElementById("autor").value,
        mensaje: document.getElementById("mensaje").value,
        date: new Date(Date.now()).toLocaleString()
    }

    socket.emit('nuevoMensaje', mensaje)

}) 

//Recibir y renderizar Mensajes
socket.on('mensajes', (mensaje) =>{

    const html = mensaje.map(msj => {
        return `<div class="rounded col-3 text-break" style="background: gray">
        <strong style="color: white">${msj.author}:</strong>
        <em style="color: white">${msj.text}</em>
        <br>
        <em>${msj.date}</em>
        </div>`
    })
    .join("<br>")

    document.getElementById("mensajes").innerHTML = html

})
