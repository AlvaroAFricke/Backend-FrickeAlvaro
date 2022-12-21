const knex = require('knex')

class Productos {

    constructor(options) {
        this.knex = knex(options)
    }

    async crearTabla() {
        try {
            return await this.knex.schema.dropTableIfExists('articulos')
        } finally {
            return await this.knex.schema.createTable('articulos', table => {
                table.increments('id').primary()
                table.string('nombre', 15).notNullable()
                table.float('precio').notNullable()
                table.string('imagen', 50).notNullable()
            })
        }
    }

    async insertarArticulos(articulo) {
        try {
            return await this.knex('articulos').insert(articulo)
        } catch (error) {
            console.log('Error en Insertar')
        }
    }

    async listarArticulos() {
        try {
            return await this.knex('articulos').select('*')
        } catch (error) {
            console.log('Error en Listar')
        }
    }

    async borrarArticulos(id) {
        try {
            return await this.knex.from('articulos').where('id', '=', id).del()
        } catch (error) {
            console.log('Error en Borrar')
        }
    }

    async actualizarStock(stock, id) {
        try {
            return await this.knex.from("articulos").where('id', '=', id).update({stock: stock})
        } catch (error) {
            console.log('Error en Actualizar')
        }
    }

    close() {
        try {
            return this.knex.destroy()
        } catch (error) {
            console.log('Error en Close')
        }
    }
}

module.exports = Productos