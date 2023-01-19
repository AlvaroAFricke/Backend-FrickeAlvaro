/**
 * Uso de rutas para los productos
 */

import express from 'express'
import productosRouter from './router/productosRouter.js'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.use(express.json())

app.use('/api/productos', new productosRouter())

/**
 * Uso de websockets para el chat
 */

import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'

const httpServer = HttpServer(app)
const io = new IOServer(httpServer)

io.on('connection', async (socket) =>{

    socket.on('mensaje')

})

/**
 * Escucha del puerto 8080
 */

const PORT = 8080
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})