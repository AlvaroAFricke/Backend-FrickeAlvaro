import { faker } from '@faker-js/faker'
faker.locale = 'es'

function generarProducto() {
    return {
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        imagen: faker.image.cats(),
        precio: faker.commerce.price()
    }
}

import Contenedor from "../contenedores/ContenedorProductos.js"

class ApiProductosMock extends Contenedor {
    constructor() {
        super()
    }

    producir(cant) {
        const productos = []
        for (let i = 0; i < cant; i++) {
            const prodNuevo = generarProducto()
            this.save(prodNuevo)
            productos.push(prodNuevo)
        }
        return productos
    }
}

export default ApiProductosMock
