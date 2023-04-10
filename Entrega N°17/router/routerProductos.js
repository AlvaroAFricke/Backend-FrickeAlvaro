import { Router } from 'express'
import prodController from '../controllers/productoController.js'
import auth from './authorized/auth.js'

const routerProductos = Router()

routerProductos.get('/', prodController.listarTodo)

routerProductos.get('/:id', prodController.listar)

routerProductos.put('/:id', prodController.modificar)

routerProductos.post('/', prodController.guardar)

routerProductos.delete('/:id?', prodController.borrar)

export default routerProductos