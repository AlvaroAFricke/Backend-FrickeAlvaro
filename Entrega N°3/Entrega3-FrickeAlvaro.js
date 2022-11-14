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
            console.log("Error en la lectura.");
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

    async deleteById(number) {
        let array = this.getAll();

        try {
            array = array.filter((item) => item.id !== number);
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(array));
        } catch (error) {
            return null;
        }
    }

}
const cont = new Contenedor("productos.txt");

//Creacion de un producto
let prod = {
    nombre: "Manzana",
    precio: 10,
};

//Insertado de 3 productos
setTimeout(() => {
    console.log(`El id asignado a ${prod.nombre} es: ` + cont.save(prod));
}, "2000");

setTimeout(() => {
    prod.nombre = "Banana";
    prod.precio = 20;

    console.log(`El id asignado a ${prod.nombre} es: ` + cont.save(prod));
}, "4000");

setTimeout(() => {
    prod.nombre = "Naranja";
    prod.precio = 30;

    console.log(`El id asignado a ${prod.nombre} es: ` + cont.save(prod));
}, "6000");

/**
 * Parte del desafio 3
 */

const express = require('express')

const app = express()

app.get("/productos", (req, res) => {
    res.send(cont.getAll());
});

app.get('/productoRandom', (req, res) => {

    //Busco un random que este contemplado dentro de los id
    let rand = Math.round(Math.random()*10)
    while (rand > cont.getAll().length) {
        rand = Math.round(Math.random()*10)
    }

    res.send(cont.getById(rand))

})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el ${PORT}`)
}) 

server.on("Error", error => console.log(`Error en servidor $(error)`))