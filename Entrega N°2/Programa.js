const fs = require('fs') 

class Contenedor {

    constructor(nombreArchivo){

        this.archivo = nombreArchivo
        fs.writeFileSync(`./${nombreArchivo}`, '[]')

    }

    //Contador para el seguimiendo del id
    static idGeneral = 1

    getAll(){

        try {

            let array = JSON.parse((fs.readFileSync(`./${this.archivo}`,'utf-8')))
            console.log('Devolviendo array.')
            return array

        } catch (error) {
            console.log('Error en la lectura.')
            throw new Error ('Error en la lectura.')
        }

    }

    deleteAll(){
        try {
            fs.writeFileSync(`./${this.archivo}`, '[]')
            console.log('Todo limpio.')
        } catch (error) {
            throw new Error ('Error en la limpieza.')
        }
    }

    async save(Objeto){

        try {

            Objeto.id = Contenedor.idGeneral
            Contenedor.idGeneral++
    
            let array = this.getAll()

            array.push(Objeto)
            
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(array))
            console.log('Agregado con exito.')

        } catch (error) {
            throw new Error ('Error en el agregado')
        }

        return Contenedor.idGeneral

    }

    getById(number){

        let array = this.getAll()

        for (let i = 0; i < array.length; i++) {
            if (array[i].id == number) {
                array[i].
                break;
            }
        }
        return null
    }

    async deleteById(number){

        let array = this.getAll()

        try { 

            array = array.filter((item) => item.id !== number)
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(array))
            
        } catch (error) {
            return null
        }


    }

}

let cont = new Contenedor("prueba.txt")

let prodi = {
    nombre:'Fran',
    precio: 12
}

setTimeout(() => {
    cont.save(prodi)
}, "5000");


setTimeout(() => {
    console.log(cont.getById(1)) 
}, "7000");


setTimeout(() => {
    console.log(cont.deleteById(3)) 
}, "9000");
