
/**
 * Parte de la entrega numero 4
 */

//Imports

const express = require('express')
const { Router } = express
const Contenedor = require('./Contenedor')

const app = express()

//Dependencias de la app

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public/'))

app.set()
app.set('view engine', 'ejs')

//Objetos de uso en la app

const prods = new Contenedor.Contenedor('productos.txt');
const routerProductos = new Router()

app.use('/api/productos', routerProductos)

//Validaciones de entrada de parametros

function validacion(req, res, next){

    const num = parseInt(req.params.id)

    if (isNaN(num)){
        return res.json({error:'El parametro no es un numero.'})
    }
    if (num < 1){
        return res.json({error:'Parametro fuera de rango.'})
    }
    if (num > prods.getAll().length){
        return res.json({error:'Parametro fuera de rango.'})
    }

    next()
}

// //Gets

routerProductos.get('/', (req, res) => {
    const productos = prods.getAll()
    res.render('inicio', {productos})
})

routerProductos.get('/:id', validacion, (req, res) => {
    res.json(prods.getById(req.params.id))
})

// //Post

routerProductos.post('/', (req, res) => {

    prods.save(req.body)
    res.redirect('/api/productos')

})

// //Put

routerProductos.put('/:id', validacion, (req, res) => {
    
    prods.save(req.body)
    prods.deleteById(req.params.id)
    res.json({Actualizado:'Ok'})

})

// //Delete

routerProductos.delete('/:id', validacion, (req, res) => {
    prods.deleteById(parseInt(req.params.id))
    res.json({Borrado:'Ok'})
})


//Escucha del servidor
const server = app.listen(8080, () => {
    console.log('Escuchando en el 8080 ...')
})