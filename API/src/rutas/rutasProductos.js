const { Router } = require("express");
const { body, query } = require("express-validator");
const controladorProductos = require("../controladores/controladorProductos");
const router = Router();
router.get("/", controladorProductos.inicio);
router.get("/listar", controladorProductos.listar);
router.get('/buscarproducto', controladorProductos.buscarProducto);
router.post("/guardar",
body("nombre_Producto").isLength({min:3}).withMessage("El nombre debe contener minimo 3 caracteres"),
body("id_tipo_Producto").isInt().withMessage("Debe enviar valores enteros para id_Tipo"), 
controladorProductos.guardar);

router.put("/modificar", 
body("nombre_Producto").isLength({min:3}).withMessage("El nombre debe contener minimo 3 caracteres"),
body("id_tipo_Producto").isInt().withMessage("Debe enviar valores enteros para id_Tipo"),
controladorProductos.modificar);

router.delete("/eliminar", controladorProductos.eliminar);
module.exports = router;