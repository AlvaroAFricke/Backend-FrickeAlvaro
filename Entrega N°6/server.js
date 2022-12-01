const express = require('express')
const app = express()
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const httpServer = HttpServer(app)
const io = new IOServer(httpServer)

const Contenedor = require('./contenedor')
const cont = new Contenedor.Contenedor('productos.txt');


const productos = cont.getAll()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('view engine', 'ejs')

const mensajes = []

/**
 * 
 */

const { Router } = express
const routerProductos = new Router()
app.use('/api/productos', routerProductos)
function validacion(req, res, next) {

    const num = parseInt(req.params.id)

    if (isNaN(num)) {
        return res.json({ error: 'El parametro no es un numero.' })
    }
    if (num < 1) {
        return res.json({ error: 'Parametro fuera de rango.' })
    }
    if (num > prods.getAll().length) {
        return res.json({ error: 'Parametro fuera de rango.' })
    }

    next()
}

//Gets

routerProductos.get('/', (req, res) => {
    res.render('index.ejs', { productos })
})

routerProductos.get('/:id', validacion, (req, res) => {
    res.json(prods.getById(req.params.id))
})

//Post

routerProductos.post('/', (req, res) => {

    cont.save(req.body)
    res.redirect('/api/productos')
    res.json({ Agregado: 'Ok' })

})

//Put

routerProductos.put('/:id', validacion, (req, res) => {

    prods.save(req.body)
    prods.deleteById(req.params.id)
    res.json({ Actualizado: 'Ok' })

})

//Delete

routerProductos.delete('/:id', validacion, (req, res) => {
    prods.deleteById(parseInt(req.params.id))
    res.json({ Borrado: 'Ok' })
})

io.on('connection', socket =>{
    console.log('Un cliente se ha conectado')

    socket.emit('messages', mensajes)

    socket.on('new-message', data => {
        mensajes.push(data)

        io.sockets.emit('messages', mensajes)
    })
})

const PORT = 8080

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})