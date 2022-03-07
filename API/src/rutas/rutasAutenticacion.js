const { Router } = require('express');
const controladorAutenticacion = require('../controladores/controladorAutenticacion');
const { body, query } = require("express-validator");
const router = Router();
router.post('/recuperarcontrasena',  
body("correo").isEmail().withMessage("Debe ser formato de correo"), 
controladorAutenticacion.recuperarContrasena);
router.post('/iniciosesion',  
body("usuario").isEmail().withMessage("Debe ser formato de correo"),
body("contrasena").isLength({min:6}).withMessage("La contraseña debe tener 6 o mas caracteres"),  
controladorAutenticacion.InicioSesion);
router.get('/error', controladorAutenticacion.Error); 
module.exports=router;