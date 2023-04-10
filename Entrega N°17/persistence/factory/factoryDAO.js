import DAOFileProducto from "../DAO/DAOFileProductos.js";
import DAOProductos from "../DAO/DAOProductos.js";

class FactoryDAO {
    constructor(data){
        if(data == 'archivo'){
            return new DAOFileProducto()
        }
        if(data == 'mongo'){
            return DAOProductos
        }
    }
}

export default FactoryDAO