import connect from './ConectMongo.js';
import Product from '../models/prodSchema.js';

class ProductosMongo {
  constructor() {
    connect()
      .then(() => console.log('Conectado a la base de datos'))
      .catch(error => console.error('Error al conectarse a la base de datos', error));
  }

  async listarProductos() {
    const products = await Product.find({});
    return products;
  }

  async buscarProductoPorId(id) {
    const product = await Product.findById(id);
    return product;
  }

  async buscarProductoPorNombre(nombre) {
    const products = await Product.find({ nombre: { $regex: nombre, $options: 'i' } });
    return products;
  }

  async guardarProducto(producto) {
    const product = new Product(producto);
    await product.save();
  }

  async actualizarProducto(id, producto) {
    await Product.findOneAndUpdate({ _id: id }, producto);
  }

  async borrarProductos() {
    await Product.deleteMany({});
  }

  async borrarProductoPorId(id) {
    const productoEliminado = await Product.deleteOne({ _id: id });
    if (productoEliminado.deletedCount === 0) {
      throw new Error('Producto no encontrado');
    }
    return productoEliminado;
  }
}

export default ProductosMongo;
