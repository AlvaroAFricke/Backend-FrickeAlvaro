const mongoose = require('mongoose') 

const carritosCollName = 'carritos'

const carritosSchema = new mongoose.Schema({
    time: {type: Date, required: true},
    productos: {type: Array, required: true}
})

const carritos = mongoose.model(carritosCollName, carritosSchema)

module.exports = carritos