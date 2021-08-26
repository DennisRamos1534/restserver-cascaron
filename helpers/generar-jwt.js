const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = {uid}; // guardamos el id en la variable payload
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, { // generamos el token
            expiresIn: '4h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token );
            }
        });
    });
}


module.exports = {
    generarJWT
}