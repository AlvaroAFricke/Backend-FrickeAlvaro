import { Router } from 'express'
import prodController from '../controllers/productoController.js'
import auth from './authorized/auth.js'

const routerProductos = Router()

routerProductos.get('/', auth.requireAuthentication, prodController.listarTodo)

routerProductos.get('/:id', auth.requireAuthentication, prodController.listar)

routerProductos.put('/:id', auth.requireAuthentication, prodController.modificar)

routerProductos.post('/', auth.requireAuthentication, prodController.guardar)

routerProductos.delete('/:id?', auth.requireAuthentication, prodController.borrar)

export default routerProductos