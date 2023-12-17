const express = require('express')
const app = express();
const sql = require('mysql2')
const config = require('config')
const PORT = config.get("port");
const connectionDetails = {
                                host : config.get("server"),
                                database: config.get("database"),
                                user : config.get("uname"),
                                password: config.get("pwd")
}
app.use(express.json());

app.get("/product",(request,response)=>{
    var statement = `select * from products`
    var connection = sql.createConnection(connectionDetails);
    connection.query(statement,(error,result)=>{
        if(error==null){
            var resultInJSONstring = JSON.stringify(result);
            response.setHeader("Content-Type", "application/json");
            connection.end();
            response.write(resultInJSONstring);
            response.end();
        }
        else{
            var errorInJSONstring = JSON.stringify(error);
            response.setHeader("Content-Type", "application/json");
            connection.end();
            response.write(errorInJSONstring);
            response.end();
        }
    })
})
app.delete("/product/:id",(request,response)=>{
    var statement = `delete from products where productid = ${parseInt(request.params.id)}`
    var connection = sql.createConnection(connectionDetails);
    connection.query(statement,(error,result)=>{
        if(error==null){
            var resultInJSONstring = JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(resultInJSONstring);
            response.end();
        }
        else{
            var errorInJSONstring = JSON.stringify(error);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(errorInJSONstring);
            response.end();
        }
    })
})
app.post("/product",(request,response)=>{
    var statement = `INSERT INTO products values(default,'${request.body.producttitle}',${parseInt(request.body.price)},${parseInt(request.body.stock)})`
    var connection = sql.createConnection(connectionDetails);
    connection.query(statement,(error,result)=>{
        if(error==null){
            var resultInJSONstring = JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(resultInJSONstring);
            response.end();
        }
        else{
            var errorInJSONstring = JSON.stringify(error);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(errorInJSONstring);
            response.end();
        }
    })
})
app.put("/product/:id",(request,response)=>{
    var statement = `UPDATE products set producttitle = '${request.body.producttitle}',price =${parseFloat(request.body.price)},stock = ${parseInt(request.body.stock)} where productid = ${parseInt(request.params.id)}`
    var connection = sql.createConnection(connectionDetails);
    connection.query(statement,(error,result)=>{
        if(error==null){
            var resultInJSONstring = JSON.stringify(result);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(resultInJSONstring);
            response.end();
        }
        else{
            var errorInJSONstring = JSON.stringify(error);
            response.setHeader("Content-Type","application/json");
            connection.end();
            response.write(errorInJSONstring);
            response.end();
        }
    })
})
app.listen(PORT,()=>{console.log("server started at ${PORT}")});