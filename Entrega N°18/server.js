//Imports
import express from 'express'
import logger from "./utils/logger.js";
import GraphqlController from './controller/GraphqlCotroller.js';

const app = express()

//Dependencias de la app

import rutasProductos from "./rutas/rutasProductos.js"
import rutasLoggin from "./rutas/rutasLoggin.js"

app.use(rutasProductos)
app.use(rutasLoggin)

app.use('/graphql', new GraphqlController())

//Puerto
const PORT = process.env.PORT || 8080

//Escucha del servidor
app.listen(PORT, () => {
    logger.info("Servidor Corriendo")
})

export default app
