const ModeloProducto = require('../modelos/modeloProductos');
const { validationResult } = require("express-validator"); //Validaciones

/* -------------------------- Inicio ----------------------- */
exports.inicio = (req, res) =>{
    res.send("Esto es el inicio del modulo de Productos");
};

/* -------------------------- Buscar Producto ----------------------- */
exports.buscarProducto = async (req, res) => {
    const { nombre_Producto } = req.query;
    const lista = await ModeloProducto.findAll({
        where: {
            nombre_Producto: nombre_Producto
        }
    });
    if (lista.length == 0) {
        res.send("No existen datos..");
    }
    else {
        res.json(lista);
    }
};

/* -------------------------- Listar ----------------------- */
exports.listar = async (req, res) =>{
    const lista = await ModeloProducto.findAll();
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
        const { codigobarras, codigocatalogo, nombre_Producto, descripcion_Producto, impuesto_Producto, precio_Producto, activo, id_tipo_Producto, imagen_Producto } = req.body;
        if(!nombre_Producto || !id_tipo_Producto){
            res.send("Debe enviar los datos completos");
        }
        else{
            await ModeloProducto.create({
                codigobarras: codigobarras,
                codigocatalogo: codigocatalogo,
                nombre_Producto: nombre_Producto,
                descripcion_Producto: descripcion_Producto,
                impuesto_Producto:impuesto_Producto,
                precio_Producto:precio_Producto,
                activo:activo,
                id_tipo_Producto: id_tipo_Producto,
                imagen_Producto:imagen_Producto
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
        const { id_Producto } = req.query;
        const { codigobarras, codigocatalogo, nombre_Producto, descripcion_Producto, impuesto_Producto, precio_Producto, activo, id_tipo_Producto, imagen_Producto } = req.body;
            if(!nombre_Producto || !id_tipo_Producto){
            res.send("Envie los datos completos");
        } else{
            var buscarProducto = await ModeloProducto.findOne({
                where:{
                    id_Producto: id_Producto
                }
            });
            if(!buscarProducto){
                res.send("El id no existe");
            }
            else{
                buscarProducto.codigobarras=codigobarras;
                buscarProducto.codigocatalogo=codigocatalogo;
                buscarProducto.nombre_Producto=nombre_Producto;
                buscarProducto.descripcion_Producto=descripcion_Producto;
                buscarProducto.impuesto_Producto=impuesto_Producto;
                buscarProducto.precio_Producto=precio_Producto;
                buscarProducto.activo=activo;
                buscarProducto.id_tipo_Producto=id_tipo_Producto;
                buscarProducto.imagen_Producto=imagen_Producto;
                await buscarProducto.save()
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
    const { id_Producto } = req.query;
    
    if(!id_Producto){   
        res.send("Enviar el id del registro");
    } else{
        await ModeloProducto.destroy({
            where:{
                id_Producto:id_Producto
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