import logger from '../utils/logger.js'
import passport from '../services/loginService.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Controller para las rutas de regitro.
 */

const viewsRegistro = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views', 'register.html'));
    } catch (error) {
        logger.warn('No existe el archivo.')
    }
}

const viwesFailRegistro = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views', 'register-error.html'));
    } catch (error) {
        logger.warn('No existe el archivo.')
    }
}

const registrar = (req, res) => {
    try {
        passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/api' })
    } catch (error) {
        
    }
}

/**
 * Controller para las rutas de loggin.
 */

const viewsLoggin = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views', 'login.html'));
    } catch (error) {
        logger.warn('No existe el archivo.')
    }
}

const viwesFailLoggin = (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '../views', 'login-error.html'));
    } catch (error) {
        logger.warn('No existe el archivo.')
    }
}

const Loguear = (req, res) => {
    try {
        passport.authenticate('login', { failureRedirect: '/failLogin', successRedirect: '/api' })
    } catch (error) {
        logger.warn("No se pudo loguear.")
    }
}

/**
 * Logout
 */

const Desloguear = (req, res) => {
    req.logout(err => {
        res.redirect('/login')
    })
}

/**
 * Export de las funciones
 */

export default {

    viewsRegistro,
    viwesFailRegistro,
    registrar,

    viewsLoggin,
    viwesFailLoggin,
    Loguear, 

    Desloguear

}





