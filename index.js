const express = require ('express');

const PORT = 3000;

const server = express();

const router = express.Router();

router.get('/', (req, res) =>{

    console.log('Pidiendo cosas al servidor');
    res.send('Ruta de pedidos a home');
});

server.use('/', router);

server.listen(PORT, () => {

    console.log(`Servidor de reciclage, recilando a tope de power en http://localhost:${PORT}`)
});