const { Router } = require('express');
const fetch = require("node-fetch");
require('dotenv').config();
const { API_KEY } = process.env;


const fetchDogsParams = 'https://api.thedogapi.com/v1/breeds?api_key=' + API_KEY
// [ ] GET /dogs/{idRaza}:
// Obtener el detalle de una raza de perro en particular
// Debe traer solo los datos pedidos en la ruta de detalle de raza de perro
// Incluir los temperamentos asociados
// [ ] Los campos mostrados en la ruta principal para cada raza (imagen, nombre y temperamento)
// [ ] Altura
// [ ] Peso
// [ ] Años de vida

function paramsMatch(data, id){
if (data && id){
    let response = data.filter((dog) => dog.id == id)
    if (response.length > 0){
        response.map((dog) => {
            delete dog.breed_group; 
            delete dog.weight.imperial;
            delete dog.height.imperial;
            delete dog.bred_for;
        })
        return response
    } else {
            return 'No match for the ID recieved'
    }
    }else {
        return 'No param was recieved.'
    }
}

const router = Router( {mergeParams: true} );

router.get('/', (req, res)=>{
    const { id } = req.params
    console.log(id)
    fetch(fetchDogsParams)
    .then(data => data.json())  
    .then(data => res.status(200).send(paramsMatch(data, id)))
})

module.exports = router;