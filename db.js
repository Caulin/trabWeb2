var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/workshoptdc")
              .then(conn => global.conn = conn.db("workshoptdc"))
              .catch(err => console.log(err))

function  listaTodos(callback){
  global.conn.collection("customers").find({}).toArray(callback);
}
function inserir(customer, callback){
  global.conn.collection("customers").insert(customer, callback);
}
module.exports = {listaTodos, inserir};
