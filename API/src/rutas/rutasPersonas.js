const { Router } = require("express");
const router = Router();
const { body, query } = require("express-validator");
const controladorPersonas = require("../controladores/controladorPersonas");
router.get("/", controladorPersonas.Inicio);
router.get("/listar", controladorPersonas.listaPersonas);
router.post("/guardar",
body("nombre").isLength({min:3}).withMessage("El nombre debe contener minimo 3 caracteres"),
body("apellido").isLength({min:3}).withMessage("El apellido debe contener minimo 3 caracteres"), 
body("telefono").isLength({min:8}).withMessage("Debe de tener minimo 8 caracteres"),
body("telefono").isLength({max:8}).withMessage("Debe de tener maximo 8 caracteres"),
body("estado_Persona").isBoolean().withMessage("El dato es de Tipo Boolean"),
controladorPersonas.guardar);
router.put("/modificar",
body("nombre").isLength({min:3}).withMessage("El nombre debe contener minimo 3 caracteres"),
body("apellido").isLength({min:3}).withMessage("El apellido debe contener minimo 3 caracteres"), 
body("telefono").isLength({min:8}).withMessage("Debe de tener minimo 8 caracteres"),
body("telefono").isLength({max:8}).withMessage("Debe de tener maximo 8 caracteres"),
body("estado_Persona").isBoolean().withMessage("El dato es de Tipo Boolean"),
controladorPersonas.modificar);
router.delete("/eliminar", controladorPersonas.eliminar);
module.exports = router;