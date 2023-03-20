import logger from "../utils/logger.js"
import informacion from '../services/testService.js'

const testear = (req, res) => {

}

const info = (req, res) => {
    res.json(informacion.getInfo().repeat(50))
}

const infogzip = (req, res) => {
    res.json(informacion.getInfoZip().repeat(50))
}

export default {
    testear,
    info,
    infogzip
}