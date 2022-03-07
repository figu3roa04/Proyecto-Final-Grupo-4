const fs = require("fs");
const path = require("path");
const msj = require("../componentes/mensaje");
const ModeloPersona = require("../modelos/modeloPersonas");

/* -------------------------- Recibir ----------------------- */
exports.Recibir = async (req, res) => {
    const {filename} = req.file;
    const {id_Persona} = req.query;
    var BuscarPersona = await ModeloPersona.findOne({
        where:{
            id_Persona: id_Persona
        }
    });
    if(!BuscarPersona){
        msj("El usuario no existe", 200, [], res);
    }
    else{
        const buscarImagen = fs.existsSync(path.join(__dirname, "../public/img/"+ BuscarPersona.imagen));
        if(!buscarImagen){
            console.log("La imagen no existe");
            msj("La imagen no existe", 200, [], res);
        }
        else{
            try{
                fs.unlinkSync(path.join(__dirname, "../public/img/"+ BuscarPersona.imagen)
                );
                console.log("Imagen Eliminada");
            }
            catch(error){
                console.log(error);
                console.log("No se elimino");
            }
        }
        BuscarPersona.imagen = filename;
        await BuscarPersona.save()
        .then((data) =>{
            msj("Se actualizo la imagen", 200, [], res);
        })
        .cath((error)=>{
            console.log(error);
            msj("Error al guardar la imagen", 200, [], res);
        });
    }
}