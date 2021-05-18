const express = require('express');
const controller = require('../controllers/pets.controller');
const { upload, uploadToCloudinary } = require('../middlewares/file.middleware');
const { isAdmin } = require('../middlewares/auth.middleware');
const router = express.Router();

/**
 * ¿Qué es un archivo de rutas?
 * Donde definimos todas las rutas que tendrá una parte de nuestra aplicación
 * 
 * ¿Cómo funciona?
 * Creamos un router, es decir una instancia de la clase Router de express.
 * 
 * Iremos configurando rutas dentro ese router con router.get, router.post etc
 * 
 * Una vez que hayamos terminado de configurarlo, lo usaremos en index.js
 * 
 * Cada función router.get tiene 2 argumentos, 
 *      -> ruta: string
 *      -> controlador: función que el router invoca con 3 posibles argumentos (req, res, next)
 *            -> req: request, objeto que trae toda la información de la petición que hace el usuario (Chrome por ejemplo)
 *            -> res: response, objeto que iremos configurando a lo largo de nuestro servidor y que devolveremos al usuario
 *                    como respuesta a su petición.
 *            -> next: invoca a la siguiente función, sin devolver una respuesta al usuario.
 * 
 * A la ruta la llamaremos endopoint
 */

// Una petición get no trae datos asociados, pide algo y se le devuelve algo.
router.get('/', controller.petsGet);

router.get('/create', isAdmin, controller.createPetGet);

// Una petición POST trae datos adjuntos en req.body, esos datos adjuntos los podemos almacenar en variables, normalmente
// para guardar un nuevo documento en nuestra base de datos.
router.post('/create', [upload.single('image'), uploadToCloudinary], controller.createPetPost);

router.put('/edit', controller.petEditPut);

/**
 * :id -> nombre que asignamos a nuestro parámetro de ruta
 */
router.get('/:id', controller.petByIdGet);

/**
 * Usa el verbo http DELETE -> ahora usa POST porque desde el form de HTML no puede ejecutar el verbo delete.
 */
router.post('/:id', controller.deleteByIdPost);

router.get('/type/:tipo', controller.petsByTypeGet);

router.get('/age/:edad', controller.petsByAgeGet);

module.exports = router;

// ¿QUÉ SIGNIFICA CRUD?
// C REATE
// R EAD
// U PDATE
// D ELETE