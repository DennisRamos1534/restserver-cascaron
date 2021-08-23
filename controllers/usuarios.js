const {response, request} = require('express');

const usuariosGet = (req = request, res = response) => {

    const {q, nombre = 'No name', apikey, page = "1", limit} = req.query;
    res.json({
        msg: 'get API - controlador',
        q,
        nombre, 
        apikey, 
        page, 
        limit
    })
}

const usuariosPost = (req, res = response) => {
    
    const {nombre, edad} = req.body;
    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {

    const {id} = req.params; // Obtenemos el id que envien por la id como argumento
    res.json({ // respuesta que le daremos al usuario que este solicitando la infomacion.
        msg: 'put API - controlador',
        id
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controalador'
    })
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