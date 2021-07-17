const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { API_KEY } = process.env;



const router = Router();

const fetchDogsUrl = 'https://api.thedogapi.com/v1/breeds?api_key=' + API_KEY
const fetchDogsQuery = 'https://api.thedogapi.com/v1/breeds/search?q='



// function randomDogs(){
//     let dogIds = []
//     while (dogIds.length < 9){
//         let number = Math.floor(Math.random() * 265) + 1
//         if (dogIds.includes(number)){
//             number = Math.floor(Math.random() * 265) + 1
//         } else {
//             dogIds.push(number)
//         }
//     }
//     fetch('https://api.thedogapi.com/v1/breeds?api_key=' + API_KEY)
//     .then(data => data.json())
    
// }

// needs to randomize results . filtra con numero aleatoriamente generado y lo pushea a un array si ese array no lo tiene, si lo tiene entonces genera otro numero aleatorio y repite
function randomDogs(data){
    let array = [];
    if (array.length < 9){
        array.push(data.map(dog => dog.name).slice(0,8))
    } else {
        return array
    }
    return array
}

function queryMatch(data){
    if (data.length === 0) return 'No matches for query'
    else return data    
}

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res)=>{
    const { name } = req.query
    if (name) {
        fetch(fetchDogsQuery + name)
    .then(data => data.json())
    .then(data => res.status(200).send(queryMatch(data.map(dog => dog.name).slice(0,8))))
    .catch(e => console.log('Unable to fetch with query.'))
    } else {
        fetch(fetchDogsUrl)
    .then(data => data.json())
    .then(data => res.status(200).send(randomDogs(data)))
    .catch(e => console.log('Unable to fetch.'))
    }
    
})


module.exports = router;