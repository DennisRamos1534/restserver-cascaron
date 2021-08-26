const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const tieneRoles = require('../middlewares/validar-roles');


module.exports = {

    ...validaCampos,
    ...validarJWT,
    ...tieneRoles
}