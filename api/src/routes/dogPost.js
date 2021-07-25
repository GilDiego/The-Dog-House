const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { Dog } = require('../db.js');


const router = Router();


function dogGenerator(name, minHeight, maxHeight, minWeight, maxWeight, life_span){
    if (name && minHeight && maxHeight && minWeight && maxWeight && life_span){
        return {
            name,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            life_span
        }
    }
    else return {Error: 'All fields are required.'}
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/', (req, res)=>{
    const { name, minHeight, maxHeight, minWeight, maxWeight, life_span } = req.body
    Dog.create({
        name,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        life_span,
    })
    res.status(200).send('Dog generated successfully.')
    
})


module.exports = router;