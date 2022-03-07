const express = require("express");
const morgan = require("morgan");
//require("dotenv").config();
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set("json spaces", 2);
app.use("/api/", require("./rutas/rutaInicio"));
app.use("/api/personas/", require("./rutas/rutasPersonas"));
app.use("/api/tipo/", require("./rutas/rutasTipos"));
//app.use("/api/ingredienteactivo/", require("./rutas/rutasIngredienteActivo"));
//app.use("/api/tipos/", require("./rutas/rutasTipos"));
//app.use("/api/descuentos/", require("./rutas/rutasDescuentos"));
app.listen(4001, ()=>{
    console.log("Servidor iniciado en el puerto 4001");
});