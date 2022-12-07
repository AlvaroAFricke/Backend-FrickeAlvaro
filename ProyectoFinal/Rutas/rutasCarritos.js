const express = require("express");
const { Router } = express;
const Archivador = require("../Js/Archivador");
const Carrito = require("../Js/Carrito");
const Producto = require("../Js/Producto");

const app = express();

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

    const id = parseInt(req.params.id);
    const carro = carritos.find( ele => ele.id == id )

    res.json(carro.productos);

});

routerCarrito.post("/", (req, res) => {

    const carrito = new Carrito();

    carritos.push(carrito);
    archivador.Save(carritos);
    res.json({CarroAgregado:carrito.getId()});

});

routerCarrito.post('/:idCar/productos/:idProd', (req,res) => {

    const idCar = parseInt(req.params.idCar);
    const carrito = carritos.find( carr => carr.id == idCar ) 

    const productos = archivador.Read()

    const idProd = parseInt(req.params.idProd);
    const producto = productos.find( prod => prod.id == idProd ) 

    carrito.productos.push(producto)

    archivador.Save(carritos);

    res.json({ProductoAgregado:'OK'})

});

routerCarrito.delete("/:id/productos", (req, res) => {

    const id = parseInt(req.params.id);
    carritos = carritos.filter((carr) => carr.id !== id)

    archivador.Save(carritos);

    res.json({ Borrado: 'OK' })

});

routerCarrito.delete('/:idCar/productos/:idProd', (req, res) => {
    
    const idCar = parseInt(req.params.idCar);
    const carrito = carritos.find( carr => carr.id == idCar ) 

    const idProd = parseInt(req.params.idProd);

    carrito.productos = carrito.productos.filter((prod) => prod.idProd !== idProd)

    archivador.Save(carritos);

    res.json({ProductoEliminado:'OK'})

});

module.exports = app;
