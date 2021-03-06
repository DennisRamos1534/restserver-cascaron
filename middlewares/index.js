const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const tieneRoles = require('../middlewares/validar-roles');
const validarArchivo = require('../middlewares/validar-archivo');


module.exports = {

    ...validaCampos,
    ...validarJWT,
    ...tieneRoles,
    ...validarArchivo
}