const { Router } = require("express");
const router = Router();
const { body, query } = require("express-validator");
const controladorTipos = require("../controladores/controladorTipo")
router.get("/", controladorTipos.inicio);
router.get("/listar", controladorTipos.listar);

router.post("/guardar",
body("nombre").isLength({min:3}).withMessage("El nombre debe contener minimo 3 caracteres"), 
body("activo").isBoolean().withMessage("El dato es de Tipo Boolean"),
controladorTipos.guardar);

router.put("/modificar",
body("nombre").isLength({min:3}).withMessage("El nombre debe contener minimo 3 caracteres"),
body("activo").isBoolean().withMessage("El dato es de Tipo Boolean"),
controladorTipos.modificar);


router.delete("/eliminar", controladorTipos.eliminar);
module.exports=router;