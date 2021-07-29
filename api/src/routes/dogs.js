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
                id : dog.id,
                image: dog.image.id,
                name: dog.name,
                temperament: dog.temperament,
                weight: dog.weight.metric,
                height: dog.height.metric,
                lifeSpan: dog.life_span,
                
                
            }
        )))
    }
    return array[0]
}

function queryMatch(data){
    if (data.length === 0) return 'No search queries.'
    else {
        let array = [];
        array.push(data.map(dog => (
            {
                id : dog.id,
                image: dog.reference_image_id,
                name: dog.name,
                temperament: dog.temperament,
                weight: dog.weight.metric,
                height: dog.height.metric,
                lifeSpan: dog.life_span,
                
            }
        )))
        if (array.length > 0) return array[0]
        else return "No results :("
    }
    
}
router.get('/', (req, res)=>{
    const { name } = req.query
    if (name) {
        fetch(fetchDogsQuery + name)
    .then(data => data.json())
    .then(data => res.status(200).json(queryMatch(data)))
    .catch(e => console.log('Unable to fetch with query.'))
    }
        fetch(fetchDogsUrl)
    .then(data => data.json())
    .then(data => res.status(200).json(fetchDogs(data)))
    .catch(e => console.log('Unable to fetch without query.'))
    
    
})


module.exports = router;