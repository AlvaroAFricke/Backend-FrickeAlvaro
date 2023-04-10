import logger from '../utils/logger.js'
import ContenedorMongo from '../persistence/containers/ContenedorProductos.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbProductos = new ContenedorMongo();

const guardar = async (req, res) => {
    try {
        console.log(req.body.nombre);
        await dbProductos.save(req.body)
        res.redirect('/listar')
    } catch (error) {
        logger.error('Error.' + error)
    }
}

const modificar = async (req, res) => {
    try {
        const id = req.params.id
        const actual = req.body
        res.send(await dbProductos.update(id, actual))
    } catch (error) {
        logger.error('Error.' + error)
    }
}

const listar = async (req, res) => {
    try {
        const idProd = req.params.id
        res.render('index', {productos: await dbProductos.getById(idProd)})
    } catch (error) {
        logger.error('Error.' + error)
    }
}

const listarTodo = async (req, res) => {
    try {
        res.render(path.join(__dirname, '../public', 'index.ejs'), {productos: await dbProductos.getAll()})
    } catch (error) {
        logger.error('Error.' + error)
    }
}

const borrar = async (req, res) => {
    try {
        const id = Number(req.params.id)
        if(id){
            await dbProductos.deleteById(id)
            res.send("Borrado, " + id)
        }else{
            await dbProductos.deleteAll()
            res.send("Todo borrado.")
        }
    } catch (error) {
        logger.error('Error.' + error)
    }
}

export default {
    guardar,
    borrar,
    modificar,
    listar,
    listarTodo,
}