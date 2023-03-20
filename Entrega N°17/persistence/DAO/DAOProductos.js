import MyMongoClient from "../connection/connection.js";
import modelo from '../models/modelProducto.js'
import logger from '../../utils/logger.js'

let instance;

class DAOProductos  {
    constructor(){

        const baseProductos = new MyMongoClient();
        baseProductos.connect("Productos");

    }

    async getAll() {
        try {
            const prods = await modelo.find()
            return prods
        } catch (error) {
            logger.error(error)
        }
    }

    async getById(cod) {
        try {
            const prod = await modelo.findOne({codigo: cod})
            return prod
        } catch (error) {
            logger.error(error)
        }
    }

    async save(Objeto) {
        try {
            await modelo.insertMany(Objeto)
        } catch (error) {
            logger.error(error)
        }
        return Objeto.id;
    }

    async update(cod, Objeto) {
        try {
            await modelo.updateOne({ codigo: cod }, { 
                nombre: Objeto.nombre,
                descripcion: Objeto.descripcion,
                imagen: Objeto.imagen,
                precio: Objeto.precio,
            })
        } catch (error) {
            logger.error(error)
        }
    }

    //Borrado de todo
    async deleteAll() {
        try {
            await modelo.deleteMany({})
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteById(cod) {
        try {
            await modelo.deleteOne({ codigo: cod })
        } catch (error) {
            console.log(error)
        }
    }

    static getInstance(){
        if (!instance) {
            instance = new DAOProductos()
        }
        return instance
    }
}

export default DAOProductos.getInstance()