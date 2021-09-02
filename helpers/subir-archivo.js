const path = require('path'); // para unir la ruta de donde se guardara el documento
const  {  v4 : uuidv4  }  =  require ( 'uuid' ) ; 

const subirArchivo = (files, extensionesValidas = ['jpg', 'png', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const {archivo} = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];
        
        // Validar la extension
        if(!extensionesValidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida - ${extensionesValidas}`);
        }
    
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
    
        archivo.mv(uploadPath, (err) => { // movemos el archivo a la nueva ruta regenada
            if (err) {
                reject(err);
            }
    
            resolve(nombreTemp); // imprimimos la ruta
        });
    });
}

module.exports = {
    subirArchivo
}