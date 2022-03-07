const ModeloUsuario = require('../modelos/modeloUsuarios');
const ModeloPersona = require('../modelos/modeloPersonas');
const { validationResult } = require("express-validator");

/* -------------------------- Inicio ----------------------- */
exports.inicio = (req, res) => {
    res.send("Esto es el inicio de el modulo de Usuarios");
};

/* -------------------------- Listar ----------------------- */
exports.listar = async (req, res) => {
    const lista = await ModeloUsuario.findAll();
    if (lista.length == 0) {
        res.send("No existen datos..");
    }
    else {
        res.json(lista);
    }
};

/* -------------------------- Buscar Usuario por estado ----------------------- */
exports.buscarUsuario = async (req, res) => {
    const { filtro } = req.query;
    const lista = await ModeloUsuario.findAll({
        where: {
            estado: filtro
        }
    });
    if (lista.length == 0) {
        res.send("No existen datos..");
    }
    else {
        res.json(lista);
    }
};

/* -------------------------- Guardar ----------------------- */
exports.guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const {Usuario_persona_id, login, correo, contrasena, estado, tipo } = req.body;
        if (!Usuario_persona_id || !login || !correo || !contrasena) {
            res.send("Debe enviar los datos completos");
        }
        else {
            const buscarPersona = await ModeloPersona.findOne({
                where: {
                    id_Persona: Usuario_persona_id,
                    estado_Persona: true
                }
            });
            if (!buscarPersona) {
                res.send("El id de la persona no existe o esta inactivo");
            }
            else {
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
        }
    }

};

/* -------------------------- Modificar Contraseña ----------------------- */
exports.modificarContrasena = async (req, res) => {
    const { id_Usuario } = req.query;
    const { contrasena } = req.body;
    if (!id_Usuario || !contrasena) {
        res.send("Envie los datos completos");
    }
    else {
        var buscarUsuario = await ModeloUsuario.findOne({
            where: {
                id_Usuario: id_Usuario,
                estado: 'Activo'
            }
        });
        if (!buscarUsuario) {
            res.send("El id no existe o esta inactivo");
        }
        else {
            buscarUsuario.contrasena = contrasena;
            await buscarUsuario.save()
                .then((data) => {
                    console.log(data);
                    res.send("Registro actualizado");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al actualizar los datos");
                });
        }
    }
};

/* -------------------------- Modificar Estado ----------------------- */
exports.modificarEstado = async (req, res) => {
    const { id_Usuario } = req.query;
    const { estado } = req.body;
    if (!id_Usuario || !estado) {
        res.send("Envie los datos completos");
    }
    else {
        var buscarUsuario = await ModeloUsuario.findOne({
            where: {
                id_Usuario: id_Usuario,
            }
        });
        if (!buscarUsuario) {
            res.send("El id no existe");
        }
        else {
            buscarUsuario.estado = estado;
            await buscarUsuario.save()
                .then((data) => {
                    console.log(data);
                    res.send("Registro actualizado");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al actualizar los datos");
                });
        }
    }
};

/* -------------------------- Eliminar ----------------------- */
exports.eliminar = async (req, res) => {
    const { id_Usuario } = req.query;
    if (!id_Usuario) {
        res.send("Envie el id del registro");
    }
    else {
        await ModeloUsuario.destroy({
            where:
            {
                id_Usuario: id_Usuario,
            }
        })
            .then((data) => {
                console.log(data);
                if (data == 0) {
                    res.send("El id no existe");
                }
                else {
                    res.send("Registro eliminado");
                }
            })
            .catch((error) => {
                console.log(error);
                res.send("Error al eliminar el registro");
            });
    }
};