const { Router, response } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { API_KEY } = process.env;
const { Temperament } = require('../db.js');

const router = Router();

const fetchDogsUrl = 'https://api.thedogapi.com/v1/breeds?api_key=' + API_KEY

async function filterTemperaments(data){
        let temperaments = data.map(dog => dog.temperament + ',').toString().split(',').map(word => word.trim().replace(',', ''))
        let uniqueTemperaments = [];
        temperaments.forEach((temperament) => {
            if (temperament && !uniqueTemperaments.includes(temperament) && temperament !== null){
                uniqueTemperaments.push(temperament)
            }
        })
        uniqueTemperaments.forEach((value) => Temperament.create({name: value}))
        // add sort by alphabetical order

}

// fetch(fetchDogsUrl)
//     .then(data => data.json())
// const response = await Temperament.findAll({ attributes: ['name'] })
// if (response.length === 0 && fetch){
//     const fetch = await fetch(fetchDogsUrl).then(data => data.json())
//     filterTemperaments(fetch)
//     const response = await Temperament.findAll({ attributes: ['name'] })
//     res.send(response)
// }

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req, res)=>{

    const temperaments = await Temperament.findAll({ attributes: ['name'] })

    if (temperaments.length === 0) {  
    fetch(fetchDogsUrl)
    .then(data => data.json())
    .then(data => filterTemperaments(data))
    .catch(e => console.log(e))
    
    const response = await Temperament.findAll({ attributes: ['name'] })
    res.status(200).json(response)
    } 
    else res.status(200).json(temperaments)

})


module.exports = router;