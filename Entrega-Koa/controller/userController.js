import passport from "koa-passport";
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

export const login = async (ctx, next) => {
    await passport.authenticate("local", async (err, user) => {
        if (err || !user) {
            ctx.throw(401, "Invalid credentials");
        }

        await ctx.login(user);
        ctx.body = { message: "Logged in successfully" };
    })(ctx, next);
};

export const logout = async (ctx) => {
    await ctx.logout();
    ctx.body = { message: 'Logged out successfully' };
};

