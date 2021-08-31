const express = require('express'); // importamos el paquete de express que es para crear los servidores
const cors = require('cors'); // importamos el paquete que sirve para manejar las rutas o links de los endpoint de nuestro backend
const { dbConnection } = require('../database/config'); // exportamos el archivo para conectarnos a la db

class Server {

    constructor() { // lo que se ejecuta cuando instanciamos la clase
        this.app = express(); // creamos el servidor 
        this.port = process.env.PORT; // creamos la variable de entorno
        
        this.paths = {
            auth:       '/api/auth',  // ruta para manejar los usuarios del endpoint
            buscar:     '/api/buscar',  // ruta para manejar los usuarios del endpoint
            categorias: '/api/categorias',  // ruta para manejar los usuarios del endpoint
            productos:  '/api/productos',  // ruta para manejar los usuarios del endpoint
            usuarios:   '/api/usuarios' // ruta para manejar los usuarios del endpoint
        }

        // conexion a la db de Mongo
        this.conectarDB();

        // Middleswers
        this.middlewares(); // inicializamos el metodo donde estan las rutas de los archivos que debe de seguir el programa
        
        //rutas
        this.routes(); // inicializamos las rutas que seguira nuestro programa donde estan los archivos
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // cors
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json()); // extraemos todas las propiedades que se envian en la url

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto:', this.port);
        });
    }
}

module.exports = Server;