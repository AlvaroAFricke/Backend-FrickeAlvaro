//Cracion de clase
class Usuario{

    //Llamado al constructor
    constructor(nombre, apellido, libros, mascotas){

        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas

    }

    //getFullNombre : Stirng
    getFullName(){
        return `Mi nombre es ${this.nombre} y mi apellido ${this.apellido}`
    }

    //addMascota : void
    addMascota(mascota){
        this.mascotas.push(mascota)
    }

    //countMascotas : Integer
    countMascotas(){
        return this.mascotas.length
    }

    //addBook(String, String) : void
    addBook(nombre, autor){
        let book = {
            nombre: nombre,
            autor: autor
        }
        this.libros.push(book)
    }

    //getBookNames : Stirng[]
    getBookNames(){
        
        let nombres = []

        this.libros.forEach(element => {
            nombres.push(element.nombre)
        });

        return nombres
    }

}

//Creacion del Objeto
let usu = new Usuario('Alvaro', 'Fricke', [{nombre: 'Fundacion', autor: 'Isaac Asimov'}], ['perro', 'conejo'])

//Llamado a funciones
console.log(usu.getFullName())


//Prueba de agregado correcto de mascota
console.log(usu.countMascotas())
usu.addMascota('gato')
console.log(usu.countMascotas())

//Prueba de agregado correcto de Libro
console.log(usu.getBookNames())
usu.addBook('Evolucion de las especies', 'Darwin')
console.log(usu.getBookNames())