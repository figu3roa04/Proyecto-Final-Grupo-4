const { Router } = require('express');
const controladorUsuario = require('../controladores/ControladorCliente');
//const { body, query } = require("express-validator");
const router = Router();

router.post('/guardar', controladorUsuario.guardar);

module.exports=router;