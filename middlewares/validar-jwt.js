const { response, request } = require("express")
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY); // verificamos que sea un token creado por nosotros
        
        const usuario = await Usuario.findById(uid); // extraemos todos los datos del usuario autenticado
        // verificar que el usuario no regrese un undefine
        if(!usuario) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });
        }
        
        // validar que el usuario no este eliminado
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - usuario eliminado'
            });
        }
        
        req.usuario = usuario; // creamos una nueva propiedad llamada uid y se la asignamos del que extraemos

       next(); 
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}