class Autor {

    static id = 0;

    constructor(nombre, apellido, edad, alias, avatar) {
        this.id = Autor.id ++
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.alias = alias
        this.avatar = avatar
    }
}

export default Autor