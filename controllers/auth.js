const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const {googleVerify} = require('../helpers/google-verify');

const login = async(req, res = response) => {

    const {correo, password} = req.body;

    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({correo}); // obtenemos el objeto del usuario que enviamos como correoen la peticion
        if(!usuario) { // si no existe entonces
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // Si el usuario esta activo
        if(!usuario.estado) { // si no existe entonces
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword) { // si no existe entonces
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        //General el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador algo salio mal'
        });
    }

}

const googleSingin = async(req, res = response) => {

    const {id_token} = req.body;

    try {

        const {correo, nombre, img} = await googleVerify(id_token);
        let usuario = await Usuario.findOne({correo});

        if(!usuario) {
            // crear el usuario
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            }

            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario el DB no esta eliminado
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador - usuario bloqueado'
            });
        }

        //General el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Token de google no es valido'
        });
    }

}

module.exports = {
    login,
    googleSingin
}