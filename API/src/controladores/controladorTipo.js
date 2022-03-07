const ModeloTipo = require('../modelos/modeloTipo');
const { validationResult } = require("express-validator"); //Validaciones

/* -------------------------- Inicio ----------------------- */
exports.inicio = (req, res) =>{
    res.send("Esto es el inicio de modulo de tipo");
};

/* -------------------------- Listar ----------------------- */
exports.listar = async (req, res) =>{
    const lista = await ModeloTipo.findAll();
    if(lista.length==0){
        res.send("No existe datos");
    }
    else{
        res.json(lista);
    }
};

/* -------------------------- Guardar ----------------------- */
exports.guardar = async (req, res) =>{
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else{
        const { nombre, activo, imagen } = req.body;
        if(!nombre){
            res.send("Debe enviar los datos completos");
        }
        else{
            await ModeloTipo.create({
                nombre:nombre,
                activo:activo,
                imagen:imagen
            })
                .then((data)=> {
                    console.log(data);
                    res.send("Registro Almacenado");
                })
                .catch((error)=> {
                    console.log(error);
                    res.send("Error al guardar los datos");
                });
        }
    }
    
};

/* -------------------------- Modificar ----------------------- */
exports.modificar = async (req, res) =>{
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else{
        const { id_Tipos } = req.query;
        const { nombre,activo,imagen } = req.body;
            if(!id_Tipos ||!nombre){
            res.send("Envie los datos completos");
        } else{
            var buscartipo = await ModeloTipo.findOne({
                where:{
                    id_Tipos: id_Tipos,
                }
            });
            if(!buscartipo){
                res.send("El id no existe");
            }
            else{
                buscartipo.nombre=nombre;
                buscartipo.activo=activo;
                buscartipo.imagen=imagen;
                await buscartipo.save()
                .then((data)=>{
                    console.log(data);
                    res.send("Registro actualizado");
                })
                .catch((error)=>{
                    console.log(error);
                    res.send("Error al actualizar los datos");
                });
            }
        }
    }   
};

/* -------------------------- Elimnar ----------------------- */
exports.eliminar = async (req, res) =>{
    const { id_Tipos } = req.query;
    
    if(!id_Tipos){   
        res.send("Enviar el id del registro");
    } else{
        await ModeloTipo.destroy({
            where:{
                id_Tipos:id_Tipos,
            }
        })
            .then((data)=>{
                console.log(data);
                if (data == 0) {
                    res.send("El ID no existe");
                }
                else {
                    res.send("Registro eliminado");
                }
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al eliminar los datos");
            });
        }
    
};