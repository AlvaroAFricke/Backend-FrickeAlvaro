const express = require("express");
const { Router } = express;
const Carrito = require("../Utils/Carrito.js");
const MongoCarritos = require("../Contenedores/ContenedorCarritosMongo.js")

const baseCarritos = new MongoCarritos()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerCarrito = new Router();

app.use("/api/carrito", routerCarrito);


/**
 * Rutas de Carrito
 */

routerCarrito.get("/:id/productos", (req, res) => {

    const id = parseInt(req.params.id);
    const carro = baseCarritos.getById(id)

    res.json(carro.productos);

});

routerCarrito.post("/", (req, res) => {

    const carrito = new Carrito();
    baseCarritos.save(carrito);
    res.json({CarroAgregado:carrito.getId()});

});

routerCarrito.post('/:idCar/productos/:idProd', (req,res) => {

    const idCar = parseInt(req.params.idCar);
    const carrito = baseCarritos.getById(idCar)

    const productos = carrito.productos

    const idProd = parseInt(req.params.idProd);
    const producto = productos.find( prod => prod.id == idProd ) 

    carrito.productos.push(producto)

    baseCarritos.save(carrito);

    res.json({ProductoAgregado:'OK'})

});

routerCarrito.delete("/:id/productos", (req, res) => {

    const id = parseInt(req.params.id);

    baseCarritos.deleteById(id)

    res.json({ Borrado: 'OK' })

});

routerCarrito.delete('/:idCar/productos/:idProd', (req, res) => {
    
    const idCar = parseInt(req.params.idCar);
    const carrito = baseCarritos.getById(idCar)

    const idProd = parseInt(req.params.idProd);

    carrito.productos = carrito.productos.filter((prod) => prod.idProd !== idProd)

    baseCarritos.save(carrito);

    res.json({ProductoEliminado:'OK'})

});

module.exports = app;
