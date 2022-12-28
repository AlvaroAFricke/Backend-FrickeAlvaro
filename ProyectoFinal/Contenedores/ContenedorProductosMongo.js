const mongoose = require ('mongoose')
const models = require ('../Models/modelProducto.js')

class ContenedorProductosMongo {

    constructor() {
        this.URL = "mongodb+srv://alviafricke%4gmail.com%3<alvi481152>@clusteralvi.cahy3u5.mongodb.net/ecommerce?retryWrites=true&w=majority"
        mongoose.set({strictQuery:true})
        this.connect = mongoose.createConnection(this.URL)
        mongoose.connect(this.URL,{useNewUrlParser: true, useUnifiedTopology: true})
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

    update(cod, Objeto){
        try {
            models.updateOne({codigo: cod}, {Objeto})
        } catch (error) {
            
        }
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

module.exports = ContenedorProductosMongo