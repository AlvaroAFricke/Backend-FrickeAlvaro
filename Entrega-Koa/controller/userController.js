
import passport from 'passport';
import LocalStrategy from 'passport-local';
import Users from '../persistence/dbMongo/UserMongo.js';


const dbUser = new Users();


export const isAuth = async (ctx, next) => {
    if (ctx.isAuthenticated()) {
        // Si el usuario está autenticado, continuar con la siguiente función de middleware o ruta
        return next();
    } else {
        // Si el usuario no está autenticado, redirigir a la ruta de inicio de sesión
        ctx.redirect('/login');
    }
};

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

export async function register(ctx) {
    const { username, email, password } = ctx.request.body;

    // Verificar si el nombre de usuario ya está en uso
    const existingUser = await dbUser.buscarUsuarioPorNombre(username);
    if (existingUser) {
        ctx.throw(409, "Username already exists");
    }

    // Crear un nuevo usuario
    const user = {
        username,
        email,
        password,
    };

    // Guardar el usuario en la base de datos
    await dbUser.guardarUsuario(user);

    ctx.redirect("/api/productos");
}

export const login = async () => {
    passport.authenticate('local', {
        successRedirect: '/api/productos', // Redireccionar a la página de inicio después de un login exitoso
        failureRedirect: '/login', // Redireccionar a la página de login en caso de fallo de autenticación
    })
};

export const logout = async (ctx) => {
    await ctx.logout();
    ctx.redirect('/login')
};

