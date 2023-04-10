import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import path from 'path';
import views from 'koa-views';

import productosRouter from './routes/productos.js';
import usuariosRouter from './routes/usuarios.js';

import passport from 'koa-passport'; // Importa el middleware koa-passport
import session from 'koa-session'; // Importa el middleware koa-session

const app = new Koa();

// Obtener la ruta del directorio de vistas
const viewsDir = path.join(path.dirname(new URL(import.meta.url).pathname), 'views');

app.use(bodyParser());

// Configurar motor de plantillas
app.use(
  views(viewsDir, {
    extension: 'ejs',
  })
);

// Configura el middleware koa-passport
app.use(passport.initialize()); // Inicializa el middleware de passport
app.use(passport.session()); // Utiliza el middleware de sesiones de passport
// Configurar el middleware de sesión
app.keys = ['clave-de-sesion']; // Cambia esto por una clave secreta para tus sesiones
app.use(session(app));

// Rutas de productos
app.use(productosRouter.routes());

// Rutas de usuarios
app.use(usuariosRouter.routes());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
