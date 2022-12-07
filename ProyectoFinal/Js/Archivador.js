const fs = require("fs");

class Archivador {
    constructor() {
        fs.writeFileSync("./productos.txt", "[]");
        fs.writeFileSync("./carritos.txt", "[]");
    }

    async Save(array) {

        try {
            if (array[0].hasOwnProperty("nombre")) {
                try {
                    //Actualizo los datos del archivo
                    await fs.promises.writeFile("./productos.txt", JSON.stringify(array));
                    console.log("Producto Guardado");
                } catch (error) {
                    throw new Error("Error en el agregado");
                }
            } else {
                try {
                    //Actualizo los datos del archivo
                    await fs.promises.writeFile("./carritos.txt", JSON.stringify(array));
                    console.log("Carrito Guardado");
                } catch (error) {
                    throw new Error("Error en el agregado");
                }
            }

        } catch (error) {
            try {
                //Actualizo los datos del archivo
                await fs.promises.writeFile("./carritos.txt", JSON.stringify(array));
                console.log("Carrito Guardado");
            } catch (error) {
                throw new Error("Error en el agregado");
            }
        }
    }

    Read() {

        try {
            let array = JSON.parse(fs.readFileSync('./productos.txt', "utf-8"));
            return array;
        } catch (error) {
            throw new Error("Error en la lectura");
        }

    }

}

module.exports = Archivador;
