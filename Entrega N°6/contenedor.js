const fs = require("fs");

/**
 * Se vizualiza perfecto el funcionamiento entrando al archivo txt mientras corre la ejecucion
 * El Programa esta debajo del cierre de clase 
 */

class Contenedor {

    constructor(nombreArchivo) {
        //Guardo el nombre del archivo
        this.archivo = nombreArchivo;
        fs.writeFileSync(`./${nombreArchivo}`, "[]");
    }

    //Contador para el seguimiendo del id
    static idGeneral = 1;

    getAll() {
        try {
            let array = JSON.parse(fs.readFileSync(`./${this.archivo}`, "utf-8"));
            return array;
        } catch (error) {
            throw new Error("Error en la lectura.");
        }
    }

    //Borrado de todo
    deleteAll() {
        try {
            fs.writeFileSync(`./${this.archivo}`, "[]");
            console.log("Todo limpio.");
        } catch (error) {
            throw new Error("Error en la limpieza.");
        }
    }

    async save(Objeto) {
        try {

            Objeto.id = Contenedor.idGeneral;
            Contenedor.idGeneral++;

            //Leer los datos del archivo en un array
            let array = this.getAll();

            //Manipular el array
            array.push(Objeto);

            //Actualizo los datos del archivo
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(array));
            console.log("Agregado con exito.");
        } catch (error) {
            throw new Error("Error en el agregado");
        }

        return Objeto.id;
    }

    getById(number) {
        let array = this.getAll();

        for (let i = 0; i < array.length; i++) {
            if (array[i].id == number) {
                //Retorno el dato y corto el for
                return array[i]
                break
            }
        }
        return null;
    }

    deleteById(number) {
        let array = this.getAll();

        try {
            array = array.filter((item) => item.id !== number);
            fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(array));
        } catch (error) {
            return null;
        }
    }

}

module.exports = Contenedor;