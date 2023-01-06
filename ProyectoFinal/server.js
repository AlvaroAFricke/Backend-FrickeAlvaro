//Imports
import express from 'express'
const app = express()

//Dependencias de la app

import rutasCarritos from "./Rutas/rutasCarritos.js"
import rutasProductos from "./Rutas/rutasProductos.js"
app.use(rutasCarritos)
app.use(rutasProductos)

//Puerto
const PORT = 8080

//Escucha del servidor
app.listen(PORT, () => {
    console.log('Escuchando en el 8080 ...')
})
