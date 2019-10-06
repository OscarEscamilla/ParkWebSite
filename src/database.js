const mysql = require('mysql');
const  {database}  = require('./keys.js');
const { promisify } = require('util');




const pool = mysql.createPool(database);


pool.getConnection((err, connection)=>{
    if(err){
        console.error('conexion a BD fallida');
    }

    if(connection){

        connection.release();
        console.log('DB is connnected');
        return;
    }
});


pool.query = promisify(pool.query);

module.exports = pool;