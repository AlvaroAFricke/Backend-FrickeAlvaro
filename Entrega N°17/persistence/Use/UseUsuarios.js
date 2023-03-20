import RepoUsuarios from "../Repository/RepoUsuarios.js";

class UseUsuarios {

    constructor() {
        this.dbUsuarios = new RepoUsuarios()
    }

    async getAll() {
        this.dbUsuarios.getAll()
    }

    async getUser(nombre){
        this.dbUsuarios.getUser(nombre)
    }

    async save(Objeto) {
        this.dbUsuarios.save(Objeto)
    }

    //Borrado de todo
    async deleteAll() {
        this.dbUsuarios.deleteAll()
    }

}

export default UseUsuarios