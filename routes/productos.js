const {Router} = require('express');
const { check } = require('express-validator');
const { crearProducto, 
        obtenerProductos, 
        obtenerProducto, 
        borrarProducto,
        actualizarProducto } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router(); // inicializamos la clase de route para que nos ayude a enlazar los archivos

// Obtener todas las categorias - Publico
router.get('/', obtenerProductos);

// Obtener una categoria por ID - Publico
router.get('/:id', [
    check('id', 'No es un id valido de mongoDB').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

//Crear una categoria - Privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un id de Mongo').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

//Actualizar una categoria - Privado - Cualquiera con token valido
router.put('/:id',[
    validarJWT,
    // check('categoria', 'No es un id de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], actualizarProducto);

//Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido de mongoDB').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto);

module.exports = router;