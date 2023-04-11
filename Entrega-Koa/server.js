import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import path from 'path';
import views from 'koa-views';

import productosRouter from './routes/productos.js';
import usuariosRouter from './routes/usuarios.js';

import session from 'koa-session';
import passport from 'passport';
import { isAuth } from './controller/userController.js';

const app = new Koa();
app.use(bodyParser());

// Configurar sesiones y body parser
app.keys = ['secret-key'];
app.use(session({}, app));

app.use(isAuth)
app.use(passport.initialize());
app.use(passport.session());

// Obtener la ruta del directorio de vistas
const viewsDir = path.join(path.dirname(new URL(import.meta.url).pathname), 'views');

// Configurar motor de plantillas
app.use(
  views(viewsDir, {
    extension: 'ejs',
  })
);

// Rutas de productos
app.use(productosRouter.routes());

// Rutas de usuarios
app.use(usuariosRouter.routes());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
