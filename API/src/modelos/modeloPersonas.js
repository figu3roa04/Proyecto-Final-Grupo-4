const sequelize = require("sequelize");
const db = require("../configuraciones/db");
const Persona = db.define(
    "persona",
    {
        id_Persona:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre:{
            type:sequelize.STRING(45),
            allowNull: false,
        },
        apellido:{
            type:sequelize.STRING(45),
            allowNull: false,
        },
        telefono:{
            type:sequelize.STRING(45),
            allowNull: true,
        },
        estado_Persona:{
            type:sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
        imagen:{
            type:sequelize.STRING(250),
            allowNull: true,
        }
    },
    {
        tableName: "personas",
        timestamps: false,
    }
);
module.exports=Persona;