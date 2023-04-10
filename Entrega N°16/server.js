/**
 * Importaciones para app
 */

import express from 'express'
import logger from './utils/logger.js'
import parseArgs from 'minimist'
import configuracion from './utils/parametros.js'

const app = express()

/**
 * Rutas de la app
 */

import routerLogin from './router/routerLogin.js'
import routerApi from './router/routerProductos.js'
import routerTest from './router/routerTest.js'

app.use('/', routerLogin)
app.use('/api', routerApi)
app.use('/', routerTest)

/**
 * Server
 */

const { PORT } = parseArgs(process.argv.slice(2), configuracion.config)

app.listen(PORT, (err) => {

    if (err) {
        logger.error('Error al iniciar el servidor')
    }
    
    logger.info('Servidor corriendo ...')

    app.set('view engine', 'ejs');

    app.get('/*', (req, res) =>{
        res.send("Error")
    })

})

export default {
    app
}

