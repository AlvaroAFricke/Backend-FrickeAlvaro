const mongoose = require('mongoose') 

const productosCollName = 'productos'

const productosSchema = new mongoose.Schema({

    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    imagen: {type: Number, required: true},
    codigo: {type: String, required: true, unique: true},
    precio: {type: String, required: true},
    stock: {type: Number, required: true},
    time: {type: Date, require: true}
})

const productos = mongoose.model(productosCollName, productosSchema)

module.exports = productos