const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { API_KEY } = process.env;



const router = Router();

const fetchDogsUrl = 'https://api.thedogapi.com/v1/breeds?api_key=' + API_KEY
const fetchDogsQuery = 'https://api.thedogapi.com/v1/breeds/search?q='


function fetchDogs(data){
    let array = []
    if (array.length < 9){
        array.push(data.map(dog => (
            {
                image: dog.image.id,
                name: dog.name,
                temperament: dog.temperament
            }
        )).slice(0,8))
    }
    return array[0]
}

function queryMatch(data){
    if (data.length === 0) return 'No matches :('
    else return data    
}

router.get('/', (req, res)=>{
    const { name } = req.query
    if (name) {
        fetch(fetchDogsQuery + name)
    .then(data => data.json())
    .then(data => res.status(200).json(queryMatch(data.map(dog => dog.name).slice(0,8))))
    .catch(e => console.log('Unable to fetch with query.'))
    }
        fetch(fetchDogsUrl)
    .then(data => data.json())
    .then(data => res.status(200).json(fetchDogs(data)))
    .catch(e => console.log('Unable to fetch.'))
    
    
})


module.exports = router;