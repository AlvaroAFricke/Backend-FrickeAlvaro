import Router from 'koa-router';
import ProductosController from '../controller/productos.js';

import { isAuthenticated } from '../controller/authController.js';

const routerProductos = new Router({ prefix: '/api/productos' });

const productosCtrl = new ProductosController();

routerProductos.get('/', isAuthenticated, productosCtrl.listarProductos.bind(productosCtrl));
routerProductos.get('/:id', isAuthenticated, productosCtrl.buscarProductoPorId.bind(productosCtrl));
routerProductos.post('/', isAuthenticated, productosCtrl.guardarProducto.bind(productosCtrl));
routerProductos.put('/:id', isAuthenticated, productosCtrl.actualizarProducto.bind(productosCtrl));
routerProductos.delete('/', isAuthenticated, productosCtrl.borrarProductos.bind(productosCtrl));
routerProductos.delete('/:id', isAuthenticated, productosCtrl.borrarProductoPorId.bind(productosCtrl));

export default routerProductos;
