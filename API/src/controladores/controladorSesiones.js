const ModeloSesiones=require('../modelos/modeloSesiones');
exports.inicio = async (req,res)=>{
    res.send("hola estas en el inicio de Sesiones"); 
};
exports.listarSesiones = async (req,res)=>{
    const listarSesiones = await ModeloSesiones.findAll();
    if(listarSesiones.length==0){
        res.send("No existe en la base");
    }
    else{
        res.json(listarSesiones);
    }
};
exports.guardar = async (req,res)=>{
    console.log(req.body);
    const{Estado}=req.body;
    if(!Estado){
        res.send("Debe enviar los datos obligatorios");
    }
    else{
        await ModeloSesiones.create(
            {
                Estado:Estado,
            })
            .then((data)=>{
                console.log(data.Estado);
                res.send("Registro almacenado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al guardar los datos");
            }) ;
     }
 };
exports.modificar= async (req,res)=>{
const{id_Sesiones}= req.query;
const{Estado, fechahora, Sesiones_usuario_id} = req.body;
if(!id_Sesiones || !Estado)
{
    res.send("Envie los datos completos");
}
else
{
    var buscarSesiones = await ModeloSesiones.findOne(
        {
            where:
                {
                    id_Sesiones: id_Sesiones,
                }
        });
        if(!buscarSesiones)
        {
            res.send("El ID no existe");
        }
        else
        {
            buscarSesiones.Estado=Estado;
            buscarSesiones.fechahora=fechahora;
            buscarSesiones.id_Sesiones=id_Sesiones;
            await buscarSesiones.save()
            .then((data)=>
            {
                console.log(data);
                res.send("registro actualizado");
            })
            .catch((error)=>
            {
                console.log(error);
                res.send("Error al actualizarlo");
            })

        }
}
};