const sequelize = require("sequelize");
const db = new sequelize(
    "ferreteria",//Nombre de la base de datos
    "root",//usuario de la base de datos
    "d9vad",//contraseña de la base de datos
    {
        host: "localhost",//servidor
        dialect: "mysql",//dbms
        port: "3306",//puerto
    }
);
module.exports=db;