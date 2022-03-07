const sequelize = require("sequelize");
const db = new sequelize(
    "Ferreteria",//Nombre de la base de datos
    "root",//usuario de la base de datos
    "123456",//contraseña de la base de datos
    {
        host: "localhost",//servidor
        dialect: "mysql",//dbms
        port: "3306",//puerto
    }
);
module.exports=db;