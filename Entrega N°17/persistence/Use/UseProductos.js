import FactoryDAO from "../factory/factoryDAO.js";
import parseArgs from 'minimist'

const config = {
    alias: {
        t: 'tipo',
    },
    default: {
        tipo: archivo,
    }
}

const { tipo } = parseArgs(process.argv.slice(2), config)

class UseProductos {
  constructor() {
    this.dbProds = new FactoryDAO(tipo);
  }

  async getAll() {
    this.dbProds.getAll();
  }
  async getById(cod) {
    this.dbProds.getById(cod);
  }
  async save(Objeto) {
    this.dbProds.save(Objeto);
  }
  async update(cod, Objeto) {
    this.dbProds.update(cod, Objeto);
  }
  async deleteAll() {
    this.dbProds.deleteAll();
  }
  async deleteById(cod) {
    this.dbProds.deleteById(cod);
  }
}

export default UseProductos;
