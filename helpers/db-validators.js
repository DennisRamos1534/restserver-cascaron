const Role = require('../models/role');
const {Usuario, Categoria, Producto} = require('../models');
const { response } = require('express');
 
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

const existeCategoriaPorId = async(id) => {

    // const {id} = req.params;
    const existeCategoria = await Categoria.findById(id); // verificamos que el correo no este repetido
    if(!existeCategoria) { 
        throw new Error(`El id: ${id} no existe`);
    }
}

const existeProductoPorId = async(id) => {

    // const {id} = req.params;
    const existeProducto = await Producto.findById(id); // verificamos que el correo no este repetido
    if(!existeProducto) { 
        throw new Error(`El id: ${id} no existe`);
    }
}

// validar coleccciones permitidas 
const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes(coleccion);
    if(!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }
    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}