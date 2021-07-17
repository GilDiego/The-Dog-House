const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogs = require('./dogs.js');
const dogsParams = require('./dogsParams')
const Temperament = require('./temperaments.js');
const dogPost = require('./dogPost.js');

const router = Router();

// Configurar los routers

router.use('/dogs', dogs)
router.use('/dogs/:id', dogsParams)
router.use('/temperament', Temperament)
router.use('/dog', dogPost)


module.exports = router;
