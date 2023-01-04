const mongoose = require ('mongoose')
const models = require ('../Models/modelCarrito.js')

class ContenedorCarritosMongo {

    constructor() {
        mongoose.set({strictQuery:true})
        this.connect =  mongoose.connect('mongodb://localhost/ecommerce',{useNewUrlParser: true, useUnifiedTopology: true})
    }

    getAll() {
        try {
            this.connect.then(()=>{
                models.find()
            })
        } catch (error) {
            console.log("Error en la lectura.");
            throw new Error("Error en la lectura.");
        }
    }

    //Borrado de todo
    deleteAll() {
        try {
            this.connect.then(()=>{
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

    getById(cod) {
        try {
            models.find({codigo: cod})
        } catch (error) {
            throw new Error("Error en la busqueda por id.");
        }
    }

    async deleteById(cod) {
        try {
            models.deleteOne({codigo: cod})
        } catch (error) {
            throw new Error("Error en el borrado por id.");
        }
    }

}

module.exports = ContenedorCarritosMongo