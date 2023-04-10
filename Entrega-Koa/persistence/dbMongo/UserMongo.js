import connect from './ConectMongo.js';
import User from '../models/userSchema.js';

class UserMongo {
  constructor() {
    connect()
      .then(() => console.log('Conectado a la base de datos'))
      .catch(error => console.error('Error al conectarse a la base de datos', error));
  }

  async listarUsuarios() {
    const users = await User.find({});
    return users;
  }

  async buscarUsuarioPorId(id) {
    const user = await User.findById(id);
    return user;
  }

  async buscarUsuarioPorNombre(username) {
    const user = await User.findOne({ username: username });
    return user;
  }

  async guardarUsuario(usuario) {
    const user = new User(usuario);
    await user.save();
  }

  async actualizarUsuario(id, usuario) {
    await User.findByIdAndUpdate(id, usuario);
  }

  async borrarUsuarios() {
    await User.deleteMany({});
  }

  async borrarUsuarioPorId(id) {
    const usuarioEliminado = await User.deleteOne({ _id: id });
    if (usuarioEliminado.deletedCount === 0) {
      throw new Error('Usuario no encontrado');
    }
    return usuarioEliminado;
  }
}

export default UserMongo;
