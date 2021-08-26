const {response, request} = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    // const {q, nombre = 'No name', apikey, page = "1", limit} = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await  Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query) // para que nos retorne todos los usuarios que esten registrados en al db
            .skip(Number(desde))    
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios 
    })
}

const usuariosPost = async(req, res = response) => {
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save(); // Para que guarde en Mongo El nuevo usuario que esta registrado

    res.json({
        usuario
    })
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params; // Obtenemos el id que envien por la id como argumento
    const {_id, password, google, correo, ...resto} = req.body; // extraemos toda la infomacion de la url 

    // Validar contra db
    if(password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario); // respuesta que le daremos al usuario que este solicitando la infomacion.
}

const usuariosDelete = async(req, res = response) => {

    const {id} = req.params;

    // Fisicamente lo borramos 
    // const usuario = await Usuario.findByIdAndDelete(id);

    // Cambiar el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}