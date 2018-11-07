const model = require('../models/costumes')
// const data = require('./data/costumes.json')


function getAllCostumes(req, res){
    let data = model.getAllCostumes()
    res.status(200).send(data)
}

function getOneCostume(req, res, next){
    let id = req.params.id
    let correctCostume = model.getOneCostume(id)
    if(!correctCostume) return next({status:404, message: `No costume at id '${id}'`})
    res.status(200).send(correctCostume)
}

function createCostume(req, res, next){
    let {desc, name, price} = req.body
    if (!name) next({ status: 400, message: 'You must include a name' } )
    let newCostume = model.createCostume(desc, name, price)
    res.status(201).send(newCostume)
}

function editCostume(req, res, next){
    let id = req.params.id
    let {desc, name, price} = req.body
    let edits = {desc, name, price}
    let correctCostume = model.getOneCostume(id)
    if (!correctCostume) return next({ status: 404, message: `No costume at id '${id}'` })  
    
    let editedCostume = model.editCostume(correctCostume, edits)
    res.status(200).send(editedCostume)
}

function deleteCostume(req, res, next){
    let id = req.params.id
    let correctCostume = model.getOneCostume(id)
    if (!correctCostume) return next({ status: 404, message: `No costume at id '${id}'` })  

    let deletedCostume = model.deleteCostume(correctCostume)
    res.status(200).send(deletedCostume)
}
//=============================================================================



module.exports = { getAllCostumes, getOneCostume, createCostume, editCostume, deleteCostume}