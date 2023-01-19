/**
 * Uso de rutas para los productos
 */

import express from 'express'
import productosRouter from './rutas/rutasProductos.js'

const app = express()
app.set('view engine', 'ejs')
app.use(express.static('./public'))

app.use(express.json())

import session from 'express-session'

app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
}))

app.get('/login', (req, res) => {
    res.render('login')
    if (!req.session.nombre) {
        req.session.nombre = document.getElementById('log').value
        res.render('index', { nombre: req.session.nombre })
    } else {
        res.render('index', { nombre: req.session.nombre })
    }
})

// aca crea tu olvidar
app.get("/desloguear", (req, res) => {
    const nombre = req.session.nombre || ""
    req.session.destroy(err => {
        if (err) {
            res.json({ error: "Error", descripcion: err })
        } else {
            res.render('deslog', {nombre: nombre})
        }
    })
})
app.use('/api/productos', new productosRouter())


/**
 * Uso de websockets para el chat
 */

import { Server as HttpServer } from 'http'
import { Server as IOServer } from 'socket.io'

const httpServer = HttpServer(app)
const io = new IOServer(httpServer)


io.on('connection', (socket) => {
    console.log("Hola");
    socket.emit('saludo')
})

/**
 * Escucha del puerto 8080
 */

const PORT = 8080
httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})