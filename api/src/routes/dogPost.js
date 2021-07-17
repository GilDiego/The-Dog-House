const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();


const router = Router();


function dogGenerator(name, minHeight, maxHeight, minWeight, maxWeight, lifeSpan){
    if (name && minHeight && maxHeight && minWeight && maxWeight && lifeSpan){
        return {
            name,
            minHeight,
            maxHeight,
            minWeight,
            maxWeight,
            lifeSpan
        }
    }
    else return {Error: 'All fields are required.'}
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.post('/', (req, res)=>{
    const { name, minHeight, maxHeight, minWeight, maxWeight, lifeSpan } = req.body
    res.status(200).send(dogGenerator(name, minHeight, maxHeight, minWeight, maxWeight, lifeSpan))
    
})


module.exports = router;