import passport from 'passport';
import User from "../persistence/dbMongo/UserMongo.js";

const dbUser = new User();

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

