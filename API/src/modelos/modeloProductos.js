const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const Productos = db.define(
"producto",
{
    id_Producto:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull:false,
    },
    codigobarras:{
        type:sequelize.STRING(45),
        allowNull:true,
    },
    codigocatalogo:{
        type:sequelize.STRING(45),
        allowNull:true,
    },
    nombre_Producto:{
        type:sequelize.STRING(45),
        allowNull:false,
    },
    descripcion_Producto:{
        type:sequelize.STRING(45),
        allowNull:true,
    },
    impuesto_Producto:{
        type:sequelize.DOUBLE,
        allowNull:true,
    },
    precio_Producto:{
        type:sequelize.DOUBLE,
        allowNull:true,
    },
    activo:{
        type:sequelize.BOOLEAN,
        allowNull:true,
        defaultValue:true,
    },
    id_tipo_Producto:{
        type:sequelize.INTEGER,
        foreignkey:true,
        allowNull:false,
    },
    imagen_Producto:{
        type:sequelize.STRING(250),
        allowNull:true,
    }
    
},
{
    tableName:"productos",
    timestamps:false,
}
);
module.exports=Productos;