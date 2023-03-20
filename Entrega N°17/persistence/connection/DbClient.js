class DbClient {
    async connect(coll){
        throw new Error("Falta implementacion Connect")
    }
    async disconnect(){
        throw new Error("Falta implementacion Disconnect")
    }
}
export default DbClient