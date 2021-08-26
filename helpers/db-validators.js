const Role = require('../models/role');
const Usuario = require('../models/usuario');
 
const esRoleValido = async(rol = '') => {
    const existeRole = await Role.findOne({rol});
    if(!existeRole) {
        throw new Error(`El rol ${rol} no esta registrado en el db`);
    } 
}

const emailExiste = async(correo = ' ') => {
    const existeEmail = await Usuario.findOne({correo}); // verificamos que el correo no este repetido
    if(existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado en el db`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existeUsuario = await Usuario.findById(id); // verificamos que el correo no este repetido
    if(!existeUsuario) { 
        throw new Error(`El id: ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}