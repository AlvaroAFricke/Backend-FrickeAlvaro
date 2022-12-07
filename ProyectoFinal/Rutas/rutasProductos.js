const express = require("express");
const { Router } = express;
const Archivador = require("../Js/Archivador");
const Producto = require("../Js/Producto")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const archivador = new Archivador();
const routerProductos = new Router();

app.use("/api/productos", routerProductos);

let productos = new Array();

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

    const id = parseInt(req.params.id);
    if (id) {
        res.json(productos.find((prod) => (prod.id == id)));
    } else {
        res.json(productos);
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

    productos.push(producto);
    archivador.Save(productos);
    res.json({ Agregado: 'OK' })

});

routerProductos.put("/:id", admin, (req, res) => {

    const id = parseInt(req.params.id); //Para que reconozca que el id es un numero
    const producto = productos.find( prod => prod.id == id )

    producto.nombre = req.body.nombre;
    producto.descripcion = req.body.descripcion;
    producto.imagen = req.body.imagen;
    producto.codigo = req.body.codigo;
    producto.precio = req.body.precio;
    producto.stock = req.body.stock;

    archivador.Save(productos);

    res.json({Actualizado: 'OK'})

});

routerProductos.delete("/:id", admin, (req, res) => {

    const id = parseInt(req.params.id); //Para que reconozca que el id es un numero
    productos = productos.filter((prod) => prod.id !== id)

    archivador.Save(productos);

    res.json({ Borrado: 'OK' })

});

module.exports = app