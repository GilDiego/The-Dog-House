const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { Dog } = require('../db.js');


const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/', (req, res)=>{
    const { name, minHeight, maxHeight, minWeight, maxWeight, life_span, image, temperament } = req.body
    Dog.create({
        name,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        life_span,
        image,
        temperament
    })
    res.status(200).send('Dog generated successfully.')
    
})


module.exports = router;