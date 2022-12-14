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

    insertarArticulos(articulo) {
        return this.knex('articulos').insert(articulo)
    }

    listarArticulos() {
        return this.knex('articulos').select('*')
    }

    borrarArticulos(id) {
        return this.knex.from('articulos').where('id', '=', id).del()
    }

    actualizarStock(stock, id) {
        return this.knex.from("articulos").where('id', '=', id).update({stock: stock})
    }

    close() {
        this.knex.destroy()
    }
}

module.exports = Productos