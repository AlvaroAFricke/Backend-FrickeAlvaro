import ProductosMongo from '../persistence/dbMongo/ProductosMogno.js';

class ProductosController {
  constructor() {
    this.productosDB = new ProductosMongo();
  }

  async listarProductos(ctx) {
    try {
      const productos = await this.productosDB.listarProductos();
      await ctx.render('productos', { productos });
      ctx.response.status = 200;
    } catch (error) {
      ctx.response.body = { error: error.message };
      ctx.response.status = 500;
    }
  }

  async buscarProductoPorId(ctx) {
    try {
      const producto = await this.productosDB.buscarProductoPorId(ctx.params.id);
      if (producto) {
        ctx.response.body = producto;
        ctx.response.status = 200;
      } else {
        ctx.response.body = { error: 'Producto no encontrado' };
        ctx.response.status = 404;
      }
    } catch (error) {
      ctx.response.body = { error: error.message };
      ctx.response.status = 500;
    }
  }

  async guardarProducto(ctx) {
    try {
      const producto = ctx.request.body;
      const nuevoProducto = await this.productosDB.guardarProducto(producto);
      ctx.response.body = nuevoProducto;
      ctx.response.status = 201;
    } catch (error) {
      ctx.response.body = { error: error.message };
      ctx.response.status = 500;
    }
  }

  async actualizarProducto(ctx) {
    try {
      const producto = ctx.request.body;
      const productoActualizado = await this.productosDB.actualizarProducto(ctx.params.id, producto);
      if (productoActualizado) {
        ctx.response.body = productoActualizado;
        ctx.response.status = 200;
      } else {
        ctx.response.body = { error: 'Producto no encontrado' };
        ctx.response.status = 404;
      }
    } catch (error) {
      ctx.response.body = { error: error.message };
      ctx.response.status = 500;
    }
  }

  async borrarProductos(ctx) {
    try {
      await this.productosDB.borrarProductos();
      ctx.response.body = { message: 'Productos eliminados correctamente' };
      ctx.response.status = 200;
    } catch (error) {
      ctx.response.body = { error: error.message };
      ctx.response.status = 500;
    }
  }

  async borrarProductoPorId(ctx) {
    try {
      const productoEliminado = await this.productosDB.borrarProductoPorId(ctx.params.id);
      if (productoEliminado) {
        ctx.response.body = { message: 'Producto eliminado correctamente' };
        ctx.response.status = 200;
      } else {
        ctx.response.body = { error: 'Producto no encontrado' };
        ctx.response.status = 404;
      }
    } catch (error) {
      ctx.response.body = { error: error.message };
      ctx.response.status = 500;
    }
  }
}

export default ProductosController;
