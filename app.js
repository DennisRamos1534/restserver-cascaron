require('dotenv').config(); // exportamos el paquete para crear variables de entorno
const Server = require('./models/server'); // importamos la clase que tiene todo el proceso del servidor de otro archivo

const server = new Server(); // inicializamos la clase

server.listen(); // ejecutamos el metodo listen de la clase.