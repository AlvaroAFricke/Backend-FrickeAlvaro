class Carrito{

    static idGeneral = 0

    constructor() {

        Carrito.idGeneral++
        this.id = Carrito.idGeneral
        this.time = Date.now()

        this.productos = new Array()
    
    }

    getId(){
        return this.id
    }

}

module.exports = Carrito