const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const bcrypt = require("bcrypt");
const Usuario = db.define(
"usuario",
{
    id_Usuario:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true,
        allowNull:false,
    },
    Usuario_persona_id:{
        type:sequelize.INTEGER,
        foreignkey:true,
        allowNull:false,
    },
    login:{
        type:sequelize.STRING(45),
        allowNull:false,
    },
    correo:{
        type:sequelize.STRING(250),
        allowNull:true,
    },
    contrasena:{
        type:sequelize.STRING(250),
        allowNull:true,
    },
    estado:{
        type:sequelize.ENUM('AC', 'IN', 'BL'),
        allowNull:true,
        defaultValue:true,
    },
    fallidos:{
        type:sequelize.INTEGER,
        allowNull:true,
        defaultValue:0
    },
    pin:{
        type:sequelize.CHAR(4),
        allowNull:true,
        defaultValue:"0000"
    },
    tipo:{
        type: sequelize.ENUM('CL', 'EM'),
        allowNull:false,
        defaultValue: "CL"
    }
    
},
{
    tableName:"usuarios",
    timestamps:false,
    hooks:{
        beforeCreate(usuario){
            const hast = bcrypt.hashSync(usuario.contrasena, 10);
            usuario.contrasena=hast;
        },
        beforeUpdate(usuario){
            const hast = bcrypt.hashSync(usuario.contrasena, 10);
            usuario.contrasena=hast;
        },
    }
}
);
Usuario.prototype.VerificarContrasena = (con, com) => {
    return bcrypt.compareSync(con, com);
}
module.exports=Usuario;