const express = require('express')
const app = express()

const Contenedor = require('./contenedor')
const cont = new Contenedor('productos.txt');

const productos = cont.getAll()

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

module.exports = app