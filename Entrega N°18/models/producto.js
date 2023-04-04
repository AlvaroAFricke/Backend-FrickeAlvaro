export default class Recordatorio {
    constructor(id, { nombre, descripcion, imagen, precio, codigo }) {

        this.nombre = nombre
        this.descripcion = descripcion
        this.imagen = imagen
        this.codigo = codigo
        this.precio = precio
    }
}
