const { Router } = require("express");
const router = Router();
const controladorInicio = require("../controladores/controladorInicio");
router.get("/", controladorInicio.Raiz);
module.exports = router;