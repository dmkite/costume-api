const fs = require('fs')
const shortId = require('shortid')
const hex =require('random-hex-character-generator')

function getAllCostumes(){
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    return JSON.parse(data)
}

function getOneCostume(id){
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    let correctCostume = data.find(costume => costume.id === id)
    return correctCostume
}

function createCostume(desc = '', name, price = 0.01){
    let costumeEntry = {desc, name, price: Number(price), id: shortId(), tags: []}
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    data.push(costumeEntry)
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/costumes.json', data)
    return costumeEntry
}

function editCostume(costume, edits){
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    let index = data.findIndex(ele => ele.id === costume.id)
    let correctCostume = data[index]
    for(let key in edits){
       if(!!edits[key]) correctCostume[key] = edits[key]
    }
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/costumes.json', data)
    return correctCostume
}

function deleteCostume(costume){
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    let index = data.findIndex(ele => ele.id === costume.id)
    let deletedCostume = data.splice(index, 1)
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/costumes.json', data)
    return deletedCostume
}

module.exports = {getAllCostumes, getOneCostume, createCostume, editCostume, deleteCostume}