import MyMongoClient from "../connection/connection.js";
import modelo from "../models/modelUsuarios.js"

export default class RepoUsuarios {
    
    constructor(){
        
        const baseUsuarios = new MyMongoClient();
        baseUsuarios.connect('Usuarios');

    }

    async getAll() {
        try {
            const users = await modelo.find()
            return users
        } catch (error) {
            throw new Error("Error")
        }
    }

    async getUser(nombre){
        try {
            const prod = await modelo.findOne({nombre: nombre})
            return prod
        } catch (error) {
            throw new Error("Error")
        }
    }

    async save(Objeto) {
        try {
            await modelo.insertMany(Objeto)
        } catch (error) {
            throw new Error("Error")
        }
        return Objeto.id;
    }

    async deleteAll() {
        try {
            await modelo.deleteMany({})
        } catch (error) {
            throw new Error("Error")
        }
    }
}
