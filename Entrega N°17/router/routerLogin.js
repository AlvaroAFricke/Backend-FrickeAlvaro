import { Router } from 'express'
import controller from '../controllers/loginContorller.js'

const routerLoggin = Router()

routerLoggin.get('/register', controller.viewsRegistro)

routerLoggin.post('/register', controller.registrar)

routerLoggin.get('/failRegister', controller.viwesFailRegistro)

routerLoggin.get('/login', controller.viewsLoggin)

routerLoggin.post('/login', controller.Loguear)

routerLoggin.get('/failLogin', controller.viwesFailLoggin)

routerLoggin.get('/logout', controller.Desloguear)

routerLoggin.get('/', (req, res) => {
    res.redirect('/index')
})

export default routerLoggin