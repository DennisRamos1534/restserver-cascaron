const {Router} = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        ObtenerCategorias, 
        ObtenerCategoria, 
        borrarCategoria,
        actualizarCategoria } = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');


const router = Router(); // inicializamos la clase de route para que nos ayude a enlazar los archivos

// Obtener todas las categorias - Publico
router.get('/', ObtenerCategorias);

// Obtener una categoria por ID - Publico
router.get('/:id', [
    check('id', 'No es un id valido de mongoDB').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],ObtenerCategoria);

//Crear una categoria - Privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

//Actualizar una categoria - Privado - Cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria);

//Borrar una categoria - Admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id valido de mongoDB').isMongoId(),
    validarCampos,
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria);

module.exports = router;