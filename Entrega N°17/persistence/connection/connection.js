import DbClient from "./DbClient.js";
import mongoose from "mongoose"
import Config from "../config/config.js"
import logger from "../../utils/logger.js"

class MyMongoClient extends DbClient {
    constructor(){
        super()
        this.connect = false
        this.client = mongoose
    }

    async connect(coll){
        try {
            this.client.connect(Config.db.name + coll, { useNewUrlParser: true, useUnifiedTopology: true })
            logger.info("Conectado a la base de datos.")
        } catch (error) {
            logger.error("Error a conectar a la base de datos.")
        }
    }

    async disconnect(){
        try {
            this.client.connection.close()
            logger.info("Base de datos desconectada.")
        } catch (error) {
            logger.error("Error al desconectar a la base de datos.")
        }
    }
}

export default MyMongoClient