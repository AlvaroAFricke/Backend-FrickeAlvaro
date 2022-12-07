//Imports
const express = require('express')
const app = express()

//Dependencias de la app

const rutasCarritos = require("./Rutas/rutasCarritos")
const rutasProductos = require("./Rutas/rutasProductos")
app.use(rutasCarritos)
app.use(rutasProductos)

//Puerto
const PORT = 8080

//Escucha del servidor
app.listen(PORT, () => {
    console.log('Escuchando en el 8080 ...')
})
