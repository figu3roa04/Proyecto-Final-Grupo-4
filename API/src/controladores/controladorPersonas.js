const ModeloPersona = require("../modelos/modeloPersonas");
const { validationResult } = require("express-validator"); //Validaciones

/* -------------------------- Inicio ----------------------- */
exports.Inicio = (req, res) => {
    res.send("Esto es el Inicio de el modulo de personas");
};

/* -------------------------- Listar ----------------------- */
exports.listaPersonas = async (req, res) => {
    const listaPersonas = await ModeloPersona.findAll();
    if (listaPersonas.length == 0) {
        res.send("No existen datos");
    }
    else {
        res.json(listaPersonas);
    }
};

/* -------------------------- Guardar ----------------------- */
exports.guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { nombre, apellido, telefono, estado_Persona, imagen } = req.body;
        if (!nombre || !apellido) {
            res.send("Debe enviar los datos completos");
        }
        else {
            await ModeloPersona.create({
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                estado_Persona: estado_Persona,
                imagen: imagen
            })
                .then((data) => {
                    console.log(data);
                    res.send("Nuevo Registro Almacenado");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al guardadr los datos");
                });
        }
    }
};

/* -------------------------- Modificar ----------------------- */
exports.modificar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { id_Persona } = req.query;
        const { nombre, apellido, telefono, estado_Persona, imagen } = req.body;
        if (!id_Persona || !nombre || !apellido) {
            res.send("Enviar los datos completos");
        } else {
            var buscarpersona = await ModeloPersona.findOne({
                where: {
                    id_Persona: id_Persona,
                }
            });
            if (!buscarpersona) {
                res.send("El ID no existe");
            }
            else {
                buscarpersona.nombre = nombre;
                buscarpersona.apellido = apellido;
                buscarpersona.telefono = telefono;
                buscarpersona.estado_Persona = estado_Persona;
                buscarpersona.imagen = imagen;
                await buscarpersona.save()
                    .then((data) => {
                        console.log(data);
                        res.send("Actualizacion de Registro almacenada");
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("Error al actualizar los datos");
                    });
            }
        }
    }
};
/* -------------------------- Elimnar ----------------------- */
exports.eliminar = async (req, res) => {
    const { id_Persona } = req.query;

    if (!id_Persona) {
        res.send("Enviar el id del registro");
    } else {
        await ModeloPersona.destroy({
            where: {
                id_Persona: id_Persona,
            }
        })
            .then((data) => {
                console.log(data);
                if (data == 0) {
                    res.send("El ID no existe");
                }
                else {
                    res.send("Registro eliminado");
                }

            })
            .catch((error) => {
                console.log(error);
                res.send("Error al eliminar los datos");
            });
    }
};