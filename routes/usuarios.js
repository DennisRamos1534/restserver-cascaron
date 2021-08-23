
const {Router} = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');

const router = Router(); // inicializamos la clase de route para que nos ayude a enlazar los archivos

router.get('/', usuariosGet)
router.put('/:id', usuariosPut)
router.post('/', usuariosPost)
router.delete('/', usuariosDelete)
router.patch('/', usuariosPatch)

module.exports = router;