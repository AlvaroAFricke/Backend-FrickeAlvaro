import passport from 'passport';
import LocalStrategy from 'passport-local';
import Users from '../persistence/dbMongo/UserMongo.js';

const dbUser = new Users();

// Configurar la estrategia de autenticación local de Passport
passport.use(
    new LocalStrategy(async (username, password, done) => {
        const usuario = await dbUser.buscarUsuarioPorNombre(username)
        if (usuario && password === usuario.password) {
            return done(null, usuario); // Usuario autenticado
        } else {
            return done(null, false, { message: 'Usuario o contraseña incorrectos' }); // Autenticación fallida
        }
    })
);

// Serialización y deserialización de usuarios
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await dbUser.buscarUsuarioPorId(id)
    done(null, user);
});

// Definir tu middleware de autenticación isAuthenticated
export const isAuthenticated = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        await next();
    } else {
        ctx.redirect('/login');
    }
};

