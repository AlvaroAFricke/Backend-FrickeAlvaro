const mongoose = require('mongoose')
const productos = require('../Models/modelProducto.js')
const models = require('../Models/modelProducto.js')

class ContenedorProductosMongo {

    constructor() {
        mongoose.set({ strictQuery: true })
        this.connect = mongoose.connect('mongodb://localhost/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true })
    }

    getAll() {
        try {
            console.log (productos.find({}))
        } catch (error) {
            console.log("Error en la lectura.");
            throw new Error("Error en la lectura.");
        }
    }

    //Borrado de todo
    deleteAll() {
        try {
            this.connect.then(() => {
                models.deleteMany('*')
            })
        } catch (error) {
            throw new Error("Error en el borrado.");
        }
    }

    async save(Objeto) {
        try {
            models.insertMany(Objeto)
            console.log("Agregado con exito.");

        } catch (error) {
            throw new Error("Error en el agregado.");
        }

        return Objeto.id;
    }

    update(cod, Objeto) {
        try {
            models.updateOne({ codigo: cod }, { Objeto })
        } catch (error) {

        }
    }

    getById(cod) {
        try {
            return models.find({ codigo: cod })
        } catch (error) {
            throw new Error("Error en la busqueda por id.");
        }
    }

    async deleteById(cod) {
        try {
            models.deleteOne({ codigo: cod })
        } catch (error) {
            throw new Error("Error en el borrado por id.");
        }
    }

}

module.exports = ContenedorProductosMongo