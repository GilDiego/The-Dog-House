const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { API_KEY } = process.env;

const router = Router();

// function filteredDogs(json, query){
//     if (json && query){
        
//     } else {
//         return "Name doesn't match any dogs."
//     }
// }



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res)=>{
    const { name } = req.query
    fetch('https://api.thedogapi.com/v1/breeds/search?q=' + name)
    .then(data => data.json())
    .then(data => res.status(200).send(data.map(dog => dog.name).slice(0,8)))
    .catch(e => console.log('Unable to fetch.'))
})


module.exports = router;