//Imports
const express = require("express");
const { Router } = express;
const Archivador = require("../Js/Archivador");
const Carrito = require("../Js/Carrito");

const app = express();

//Usos de la App
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const archivador = new Archivador();
const routerCarrito = new Router();

app.use("/api/carrito", routerCarrito);

let carritos = new Array();

/**
 * Rutas de Carrito
 */

routerCarrito.get("/:id/productos", (req, res) => {

    const id = parseInt(req.params.id); //Para que reconozca que el id es un numero
    const carro = carritos.find( carr => carr.id == id )

    res.json(carro.productos);

});

/**
 * Debe ejecutarse este POST antes de poder hacer la alta o bajas de productos
 */

routerCarrito.post("/", (req, res) => {

    const carrito = new Carrito();

    carritos.push(carrito);
    archivador.Save(carritos);
    res.json({CarroAgregado:carrito.getId()});

});

//Agregado idCar, idProd Para diferenciar el carrito en caso que tenga mas de 1
routerCarrito.post('/:idCar/productos/:idProd', (req,res) => {

    const idCar = parseInt(req.params.idCar); //Para que reconozca que el id es un numero
    const carrito = carritos.find( carr => carr.id == idCar ) 

    const productos = archivador.Read()

    const idProd = parseInt(req.params.idProd);
    const producto = productos.find( prod => prod.id == idProd ) 

    carrito.productos.push(producto)

    archivador.Save(carritos);

    res.json({ProductoAgregado:'OK'})

});

routerCarrito.delete("/:id/productos", (req, res) => {

    const id = parseInt(req.params.id); //Para que reconozca que el id es un numero
    carritos = carritos.filter((carr) => carr.id !== id)

    archivador.Save(carritos);

    res.json({ Borrado: 'OK' })

});

//Defectuoso
routerCarrito.delete('/:idCar/productos/:idProd', (req, res) => {
    
    const idCar = parseInt(req.params.idCar); //Para que reconozca que el id es un numero
    const carrito = carritos.find( carr => carr.id == idCar ) 

    const idProd = parseInt(req.params.idProd); //Para que reconozca que el id es un numero

    carrito.productos = carrito.productos.filter((prod) => prod.idProd !== idProd)

    archivador.Save(carritos);

    res.json({ProductoEliminado:'OK'})

});

module.exports = app;
