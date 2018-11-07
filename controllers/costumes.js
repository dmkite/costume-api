const model = require('../models/costumes')

function getAllCostumes(req, res){
    const data = model.getAllCostumes()
    res.status(200).send(data)
}

function getOneCostume(req, res, next){
    const id = req.params.id
    const correctCostume = model.getOneCostume(id)
    if(!correctCostume) return next({status:404, message: `No costume at id '${id}'`})
    res.status(200).send(correctCostume)
}

function createCostume(req, res, next){
    const {desc, name, price} = req.body
    if (!name) return next({ status: 400, message: 'You must include a name' } )
    const newCostume = model.createCostume(desc, name, price)
    res.status(201).send(newCostume)
}

function editCostume(req, res, next){
    const id = req.params.id
    const {desc, name, price} = req.body
    const edits = {desc, name, price}
    const correctCostume = model.getOneCostume(id)
    if (!correctCostume) return next({ status: 404, message: `No costume at id '${id}'` })  
    
    let editedCostume = model.editCostume(correctCostume, edits)
    res.status(200).send(editedCostume)
}

function deleteCostume(req, res, next){
    const id = req.params.id
    const correctCostume = model.getOneCostume(id)
    if (!correctCostume) return next({ status: 404, message: `No costume at id '${id}'` })  
    const deletedCostume = model.deleteCostume(correctCostume)
    res.status(200).send(deletedCostume)
}

module.exports = { getAllCostumes, getOneCostume, createCostume, editCostume, deleteCostume}