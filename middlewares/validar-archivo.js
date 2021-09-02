const { response } = require("express")


const validarArchivoSubir = (req, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) { // pregunta si hay archivos o que si por lo menos hay algo
        return res.status(400).json({
            msg: 'No hay archivos que subir. - funcion archivo'
        });
    }

    next();
}

module.exports = {
    validarArchivoSubir
}