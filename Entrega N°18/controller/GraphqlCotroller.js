import ContenedorProductosMongo from '../contenedores/ContenedorProductos.js'

import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'

const schema = buildSchema(`
type Producto {
    id: ID!,
    nombre: String,
    descripcion: String,
    precio: Int,
    codigo: Int
}
input ProductoInput {
    nombre: String,
    descripcion: String,
    precio: Float
}
type Query {
    getProductos: [Producto]
}
type Mutation {
    createProducto(datos: ProductoInput): Producto
    modificarProducto(id: ID!): Producto
    deleteProducto(id: ID!): [Producto]
    deleteProductos(id: ID!): [Producto]
}
`)

export default class GraphqlController {
    constructor() {
        const api = new ContenedorProductosMongo()
        return graphqlHTTP({
            schema: schema,
            rootValue: {

                getProductos: api.getAll,
                createProducto: api.save,
                modificarProducto: api.update,
                deleteProducto: api.deleteById,
                deleteProductos: api.deleteAll,

            },
            graphiql: true
        })
    }
}