import DAOFileProducto from "../DAO/DAOFileProductos";
import DAOProductos from "../DAO/DAOProductos";

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