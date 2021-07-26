const { Router } = require('express');
const { Dog } = require('../db.js');

const router = Router();




// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res)=>{
    
    Dog.findAll({}).then(data => res.json(data))
    

})


module.exports = router;