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

    async insertarMensaje(mensaje) {
        try {
            return await this.knex('mensajes').insert(mensaje)
        } catch (error) {
            console.log('Error en Insertar')
        }
    }

    async listarMensaje() {
        try {
            return await this.knex('mensajes').select('*')
        } catch (error) {
            console.log('Error en Listar')
        }
    }

    async borrarMensaje(id) {
        try {
            return await this.knex.from('mensajes').where('id', '=', id).del()
        } catch (error) {
            console.log('Error en Borrar')
        }
    }

    close() {
        try {
            this.knex.destroy()
        } catch (error) {
            console.log('Error en Cerrar')
        }
    }
}

module.exports = Chats