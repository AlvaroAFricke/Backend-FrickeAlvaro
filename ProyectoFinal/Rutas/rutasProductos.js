import express, { json, urlencoded } from "express";
const { Router } = express;
import Producto from "../Utils/Producto.js";
import MongoProductos from "../Contenedores/ContenedorProductosMongo.js";

const baseProductos = new MongoProductos()

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));

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

routerProductos.get("/:id?", async (req, res) => {

    const cod = Number(req.params.id);
    if (cod) {
        res.json(await baseProductos.getById(cod))
    } else {
        res.json(await baseProductos.getAll())
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

routerProductos.put("/:id", admin, async (req, res) => {

    const cod = Number(req.params.id);
    await baseProductos.update(cod, req.body);

    res.json({Actualizado: 'OK'})

});

routerProductos.delete("/:id?", admin, async (req, res) => {

    const cod = Number(req.params.id);
    if (cod) {
        await baseProductos.deleteById(cod)
        res.json({Borrado: "OK"})
    } else {
        await baseProductos.deleteAll()
        res.json({Borrado: "OK"})
    }

});

export default app