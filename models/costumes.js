const fs = require('fs')
const shortId = require('shortid')

function getAllCostumes(){
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    return JSON.parse(data)
}

function getOneCostume(id){
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    const correctCostume = data.find(costume => costume.id === id)
    return correctCostume
}

function createCostume(desc = '', name, price = 0.01){
    const costumeEntry = {desc, name, price: Number(price), id: shortId(), tags: []}
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    data.push(costumeEntry)
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/costumes.json', data)
    return costumeEntry
}

function editCostume(id, edits){
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    const index = data.findIndex(ele => ele.id === id)
    const correctCostume = data[index]
    for(let key in edits){
       if(!!edits[key]) correctCostume[key] = edits[key]
    }
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/costumes.json', data)
    return correctCostume
}

function deleteCostume(id){
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    const index = data.findIndex(ele => ele.id === id)
    const deletedCostume = data.splice(index, 1)
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/costumes.json', data)
    return deletedCostume
}

module.exports = {getAllCostumes, getOneCostume, createCostume, editCostume, deleteCostume}