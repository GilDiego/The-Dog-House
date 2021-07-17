const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { API_KEY } = process.env;

const router = Router();

const fetchDogsUrl = 'https://api.thedogapi.com/v1/breeds?api_key=' + API_KEY

function filterTemperaments(data){
    if (data) {
        let temperaments = data.map(dog => dog.temperament + ',').toString().split(',').map(word => word.trim().replace(',', ''))
        let uniqueTemperaments = [];
        temperaments.forEach((temperament) => {
            if (temperament && !uniqueTemperaments.includes(temperament) && temperament !== null){
                uniqueTemperaments.push(temperament)
            }
        })
        
        return uniqueTemperaments
    }
}



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res)=>{
    fetch(fetchDogsUrl)
    .then(data => data.json())
    .then(data => res.status(200).send(filterTemperaments(data)))
    .catch(e => console.log(e))
})


module.exports = router;