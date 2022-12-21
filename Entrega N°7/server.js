const { options } = require('./options/options.js')

const Productos = require('./contenedores/Contenedor.js')
const Chat = require('./contenedores/ContenedorChat.js')

const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.static('./public'))

//Dependencias de la app

app.set('view engine', 'ejs')

//Objetos de uso en la app
const sqlProductos = new Productos(options.maria)
const sqlMensajes = new Chat(options.sqlite)

sqlProductos.crearTabla()
sqlMensajes.crearTabla()

io.on('connection', async (socket) =>{
    console.log('Conectado')

    //Enviar Productos
    socket.emit('productos', await sqlProductos.listarArticulos())

    //Enviar Mensajes
    socket.emit('mensajes', await sqlMensajes.listarMensaje())

    //Recibir y actualizar Productos
    socket.on('nuevoProducto', async (producto) => {
        await sqlProductos.insertarArticulos(producto)
        io.sockets.emit('producto', sqlProductos.listarArticulos())
    })

    //Recibir y actualizar Mensajes
    socket.on('nuevoMensaje', async (mensaje) => {
        await sqlMensajes.insertarMensaje(mensaje)
        io.sockets.emit('mensajes', sqlMensajes.listarMensaje())
    })
})

const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})