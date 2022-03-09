const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Sesiones = db.define(
"sesiones",
{
    id_Sesiones :{
        type:sequelize.INTEGER,
        primaryKey:true,
        allowNull:false,
    },
    Estado:{
        type:sequelize.ENUM('Fallido', 'Correcto'),
        allowNull:false,
        defaultValue:true,
    },
    fechahora:{
        type:sequelize.DATE,
        allowNull:false,
    },
    Sesiones_usuario_id:{
        type:sequelize.INTEGER,
        foreignkey:true,
        allowNull:false,
    },
    
},
{
    tableName:"sesiones",
    timestamps:false,
}
);
module.exports=Sesiones;