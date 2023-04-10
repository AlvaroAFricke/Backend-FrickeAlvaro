import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  imagen: { type: String }
});

const Product = model('Product', productSchema);

export default Product;

