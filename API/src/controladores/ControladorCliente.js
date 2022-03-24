const ModeloUsuario = require('../modelos/modeloUsuarios');
const ModeloPersona = require('../modelos/modeloPersonas');
const { validationResult } = require("express-validator");


/* -------------------------- Guardar Cliente ----------------------- */
exports.guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const {nombre, apellido, telefono, login, correo, contrasena, estado, tipo } = req.body;
        if (!nombre || !apellido || !login || !correo || !contrasena) {
            res.send("Debe enviar los datos completos");
        }
        else {
            const buscarPersona = await ModeloPersona.findOne({
                where: {
                    id_Persona: id_Persona
                }
            });
            if (!buscarPersona) {
                await ModeloPersona.create({
                    nombre, 
                    apellido, 
                    telefono
                })
                await ModeloUsuario.create({
                    Usuario_persona_id,
                    login,
                    correo,
                    contrasena,
                    estado,
                    tipo
                })
                    .then((data) => {
                        console.log(data);
                        res.send("Registro Almacenado");
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("Error al guardar los datos");
                    });
                
            }
            else {
                res.send("El id ya existe");
            }
        }
    }

};