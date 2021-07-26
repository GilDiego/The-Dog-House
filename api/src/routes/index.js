const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogs.js');
const dogsParams = require('./dogsParams')
const temperament = require('./temperaments.js');
const dogPost = require('./dogPost.js');
const dogsDB = require('./dogsDB')

const router = Router();

// Configurar los routers

router.use('/dogs', dogs)
router.use('/dogs/:id', dogsParams)
router.use('/temperament', temperament)
router.use('/dog', dogPost)
router.use('/dogsDB', dogsDB)


module.exports = router;
