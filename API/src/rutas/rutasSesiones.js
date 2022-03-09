const{ Router } = require ('express');
const controladorSesiones=require('../controladores/controladorSesiones');
const router = Router ();
router.get('/',controladorSesiones.inicio);
router.get('/listarSesiones',controladorSesiones.listarSesiones);
router.post('/guardar',controladorSesiones.guardar);
router.put('/modificar',controladorSesiones.modificar);
module.exports=router;