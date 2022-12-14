const knex = require('knex')

class Chats {

    constructor(options) {
        this.knex = knex(options)
    }

    async crearTabla() {
        try {
            return await this.knex.schema.dropTableIfExists('mensajes')
        } finally {
            return await this.knex.schema.createTable('mensajes', table => {
                table.increments('id').primary()
                table.string('autor', 30).notNullable()
                table.string('mensaje', 255).notNullable()
                table.string('date', 255).notNullable()
            })
        }
    }

    insertarMensaje(mensaje) {
        return this.knex('mensajes').insert(mensaje)
    }

    listarMensaje() {
        return this.knex('mensajes').select('*')
    }

    borrarMensaje(id) {
        return this.knex.from('mensajes').where('id', '=', id).del()
    }

    close() {
        this.knex.destroy()
    }
}

module.exports = Chats