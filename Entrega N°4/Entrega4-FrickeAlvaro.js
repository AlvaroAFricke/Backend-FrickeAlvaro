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

/**
 * Parte de la entrega numero 4
 */

//Imports

const express = require('express')
const { Router } = express

const app = express()

//Dependencias de la app

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public/'))

//Objetos de uso en la app

const prods = new Contenedor('productos.txt');
const routerProductos = new Router()

app.use('/api/productos', routerProductos)

//Validaciones de entrada de parametros

function validacion(req, res, next){

    const num = parseInt(req.params.id)

    if (isNaN(num)){
        return res.json({error:'El parametro no es un numero.'})
    }
    if (num < 1){
        return res.json({error:'Parametro fuera de rango.'})
    }
    if (num > prods.getAll().length){
        return res.json({error:'Parametro fuera de rango.'})
    }

    next()
}

//Gets

routerProductos.get('/', (req, res) => {
    res.json(prods.getAll())
})

routerProductos.get('/:id', validacion, (req, res) => {
    res.json(prods.getById(req.params.id))
})

//Post

routerProductos.post('/', (req, res) => {

    prods.save(req.body)
    res.json({Agregado:'Ok'})

})

//Put

routerProductos.put('/:id', validacion, (req, res) => {
    


})

//Delete

routerProductos.delete('/:id', validacion, (req, res) => {
    prods.deleteById(parseInt(req.params.id))
    res.json({Borrado:'Ok'})
})


//Escucha del servidor
const server = app.listen(8080, () => {
    console.log('Escuchando en el 8080 ...')
})