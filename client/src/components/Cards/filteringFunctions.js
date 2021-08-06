import {dogsRedux, dogsDB, srcs, options} from "./Cards";

function filterAPI(array){
    if (srcs.API === false){
        return array.filter(dog => !dogsRedux.includes(dog))
    }
    else return array
}
function filterDB(array){
    if (srcs.DB === false){
        return array.filter(dog => !dogsDB.includes(dog))
    }
    else return array
}
function filterByTemperament(array){
    if (array.length && options.temperament !== 'All'){
        return array.filter(dog => dog.temperament? dog.temperament.toString().split(',').map(word => word.trim().replace(',', '')).includes(options.temperament) : null)
    } 
    else {
        return array
    }
}
function filterAlphabetically(array){
    if (options.order === 'asc'){
        let asc = [...array]
        asc.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
        return asc;
    }
    else if (options.order === 'desc'){
        let desc = [...array]
        desc.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))
        return desc;
    }
    else return array 
}
function findAvg(value){
    if (typeof value === 'string'){
        let arr = value.split('-') 
        return arr[0].trim()
    }
}
function filterByWeight(array){
    if (options.weight === "Lightest-first"){
        let lf = [...array]
        lf.sort((a, b) => findAvg(a.weight) - findAvg(b.weight));
        return lf
    }
    else if (options.weight === "Heaviest-first"){
        let hf = [...array]
        hf.sort((a, b) => findAvg(b.weight) - findAvg(a.weight));
        return hf
    }
    else return array
}

module.exports = {
    filterAPI,
    filterDB,
    filterByTemperament,
    filterAlphabetically,
    filterByWeight
}