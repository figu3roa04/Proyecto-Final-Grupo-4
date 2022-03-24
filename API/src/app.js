const express = require("express");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();
const app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.set("json spaces", 2);
app.use("/usuario/img/", express.static(path.join(__dirname, "public/img")));
app.use("/api/", require("./rutas/rutaInicio"));
app.use("/api/personas/", require("./rutas/rutasPersonas"));
app.use("/api/tipo/", require("./rutas/rutasTipos"));
app.use("/api/usuarios/", require("./rutas/rutasUsuarios"));
app.use("/api/autenticacion/", require("./rutas/rutasAutenticacion"));
app.use("/api/archivos/", require("./rutas/rutasArchivos"));
app.use("/api/productos/", require("./rutas/rutasProductos"));
app.use("/api/clientes/", require("./rutas/rutasCliente"));

app.listen(4001, ()=>{
    console.log("Servidor iniciado en el puerto 4001");
});