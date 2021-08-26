const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'EL nombre es obligatorio'] 
    },
    correo: {
        type: String,
        required: [true, 'EL correo es obligatorio'],
        unique: true // para que no sea un correo repetido
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        // enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: Boolean
    }
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, ...usuario} = this.toObject(); // saca la version y el password y todos los demas lo almacena en ...usuario
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);