const { response } = require('express');
const {ObjectId} = require('mongoose').Types;

const {Usuario, Categoria, Producto} = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuarios = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); // RETORNO UN TRUE O FALSE
    if(esMongoID) {
        const usuario = await Usuario.findById(termino); // buscamos por id
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    const regex = new RegExp(termino, 'i'); // creamos una expresion regular
    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    }); // buscamos por nombre
    res.json({
        results: usuarios
    });
}

const buscarCategorias = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); // RETORNO UN TRUE O FALSE
    if(esMongoID) {
        const categoria = await Categoria.findById(termino); // buscamos por id
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    const regex = new RegExp(termino, 'i'); // creamos una expresion regular
    const categorias = await Categoria.find({nombre: regex, estado: true}); // buscamos por nombre
    res.json({
        results: categorias
    });
}

const buscarProductos = async(termino = '', res = response) => {

    const esMongoID = ObjectId.isValid(termino); // RETORNO UN TRUE O FALSE
    if(esMongoID) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre'); // buscamos por id
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    const regex = new RegExp(termino, 'i'); // creamos una expresion regular
    const productos = await Producto.find({nombre: regex, estado: true}) // buscamos por nombre
                                    .populate('categoria', 'nombre')
    res.json({
        results: productos
    });
}

const buscar = (req, res = response) => {

    const {coleccion, termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
        break;
        case 'categorias':
            buscarCategorias(termino, res);
        break;
        case 'productos':
            buscarProductos(termino, res);
        break;
    
        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta busqueda'
            });
    }

}

module.exports = {
    buscar
}