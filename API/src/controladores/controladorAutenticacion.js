const enviarCorreo = require("../configuraciones/correo");
const ModeloUsuario = require("../modelos/modeloUsuarios");
const { validationResult } = require("express-validator");
const passport = require("../configuraciones/passport");
const msj = require("../componentes/mensaje");

/* -------------------------- Recuperar Contraseña ----------------------- */
exports.recuperarContrasena = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else{
        const { correo } = req.body;
        var buscarUsuario = await ModeloUsuario.findOne({
            where: {correo}
        });
        const pin ="8346";
        if(buscarUsuario){
            const data = {
                correo: correo,
                pin : pin,
            };
            if (enviarCorreo.recuperarContrasena(data)){
                res.send("Correo enviado");
            }
            else{
                res.send("Error al enviar correo");
            }
            
        }
    }
};

/* -------------------------- Inicio Sesion ----------------------- */
exports.ValidarAutenticado = passport.ValidarAutenticado;
exports.InicioSesion = async (req, res) =>{
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        msj("Los datos son invalidos", 200, validacion.array(), res);
    }
    else{
        const { usuario, contrasena} = req.body;
        const buscarUsuario = await ModeloUsuario.findOne({
            where: {
                correo: usuario,
            }
        });
        if(!buscarUsuario){
            msj("El usuario o contaseña son incorrectos", 200, [], res);
        }
        else{
            if(!buscarUsuario.VerificarContrasena(contrasena, buscarUsuario.contrasena)){
                msj("El usuario o contaseña son incorrectos", 200, [], res);
            }
            else{
                const Token = passport.generarToken({id_Usuario: buscarUsuario.id_Usuario});
                const data = {
                    token: Token,
                    data: buscarUsuario
                };
                msj("Bienvenido", 200, data, res);
            }
        }
    }
};

exports.Error = (req, res) =>{
    msj("Debe estar autenticado", 200, [], res);
}