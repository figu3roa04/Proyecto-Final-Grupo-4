const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Tipo = db.define(
    "tipo",
    {
        id_Tipos:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre:{
            type:sequelize.STRING(45),
            allowNull: false,
        },
        activo:{
            type:sequelize.BOOLEAN,
            allowNull: true,
            defaultValue:true
        },
        imagen:{
            type:sequelize.STRING(250),
            allowNull: true,
        },
    },
    {
        tableName:"tipos",
        timestamps: false,
    }
);
module.exports=Tipo;