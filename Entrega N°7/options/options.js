
const path = require("path");

const options = {
    maria: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "productos"
        }
    },
    sqlite: {
        client: "sqlite",
        connection: {
            filename: path.join(__dirname, "../db/mensajes.sqlite")
        },
        useNullAsDefault: true
    }
}

module.exports = { options };