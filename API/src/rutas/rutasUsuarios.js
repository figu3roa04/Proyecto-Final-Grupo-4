const { Router } = require('express');
const controladorUsuario = require('../controladores/controladorUsuarios');
const { body, query } = require("express-validator");
const controladorAutenticacion = require("../controladores/controladorAutenticacion");
const router = Router();
router.get('/', controladorUsuario.inicio);
router.get('/listar', controladorAutenticacion.ValidarAutenticado, controladorUsuario.listar);
router.get('/buscarusuario', controladorUsuario.buscarUsuario);
router.post('/guardar', 
body("Usuario_persona_id").isInt().withMessage("Debe enviar valores enteros para personas_id"), 
body("login").isLength({min:3}).withMessage("El login debe contener minimo 3 caracteres"), 
body("correo").isEmail().withMessage("Debe ser formato de correo"), 
body("contrasena").isLength({min:6}).withMessage("Debe de tener 6 o mas caracteres"),
controladorUsuario.guardar);
router.put('/modificarcontrasena', controladorUsuario.modificarContrasena);
router.put('/modificarestado', controladorUsuario.modificarEstado);
router.delete('/eliminar', controladorUsuario.eliminar);
module.exports=router;