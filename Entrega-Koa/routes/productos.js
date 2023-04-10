import Router from 'koa-router';
import ProductosController from '../controller/productos.js';

const routerProductos = new Router({ prefix: '/api/productos' });

const productosCtrl = new ProductosController();

routerProductos.get('/', productosCtrl.listarProductos.bind(productosCtrl));
routerProductos.get('/:id', productosCtrl.buscarProductoPorId.bind(productosCtrl));
routerProductos.post('/', productosCtrl.guardarProducto.bind(productosCtrl));
routerProductos.put('/:id', productosCtrl.actualizarProducto.bind(productosCtrl));
routerProductos.delete('/', productosCtrl.borrarProductos.bind(productosCtrl));
routerProductos.delete('/:id', productosCtrl.borrarProductoPorId.bind(productosCtrl));

export default routerProductos;
