const express = require("express");
const { Router } = express;
const Producto = require("../Utils/Producto.js")
const MongoProductos = require("../Contenedores/ContenedorProductosMongo.js")

const baseProductos = new MongoProductos()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = new Router();

app.use("/api/productos", routerProductos);

/**
 * Validacion de admin
 * @returns (JSON) DENEGADO == False --> Acceso == True
 */

 function admin(req, res, next) {
    const admin = true;
    if (!admin) {
        return res.json({ error: "Acceso denegado, no eres administrador." });
    }
    next();
}

/**
 * Rutas de productos
 */

routerProductos.get("/:id?", (req, res) => {

    const cod = parseInt(req.params.id);
    if (cod) {
        baseProductos.getById(cod)
    } else {
        baseProductos.getAll()
    }

});

routerProductos.post("/", admin, (req, res) => {

    const producto = new Producto(
        req.body.nombre,
        req.body.descripcion,
        req.body.imagen,
        req.body.codigo,
        req.body.precio,
        req.body.stock
    );

    baseProductos.save(producto)
    res.json({ Agregado: 'OK' })

});

routerProductos.put("/:id", admin, (req, res) => {

    const cod = parseInt(req.params.id);
    const actualizado = new Producto()

    actualizado.nombre = req.body.nombre;
    actualizado.descripcion = req.body.descripcion;
    actualizado.imagen = req.body.imagen;
    actualizado.precio = req.body.precio;
    actualizado.stock = req.body.stock;

    baseProductos.update(cod, actualizado);

    res.json({Actualizado: 'OK'})

});

routerProductos.delete("/:id", admin, (req, res) => {

    const cod = parseInt(req.params.id);
    baseProductos.deleteById(cod)
    res.json({ Borrado: 'OK' })

});

module.exports = app