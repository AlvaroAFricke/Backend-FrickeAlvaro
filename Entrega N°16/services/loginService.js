import session from 'express-session'
import dbUsuarios from '../persistence/containers/ContenedorUsuarios.js'
import logger from "../utils/logger.js";
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { direccion } = req.body

    const usuario = await dbUsuarios.getUser(username)
    if (usuario) {
        return done('Usuario ya registrado.')
    }

    const newUser = {
        nombre: username,
        correo: direccion,
        password: password
    }

    logger.info(newUser)

    await dbUsuarios.save(newUser)

    done(null, newUser)
}))

passport.use('login', new LocalStrategy(async (username, password, done) => {

    const usuario = await dbUsuarios.getUser(username)
    if (usuario) {
        return done(false)
    }

    if (usuario.password != password) {
        return done(false)
    }

    return done(null, usuario)
}))

passport.serializeUser((user, done) => {
    done(null, user.nombre)
})

passport.deserializeUser(async (username, done) => {
    const usuario = await dbUsuarios.getUser(username)
    done(null, usuario)
})

passport.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

passport.initialize()
passport.session()

export default {
    passport
}
