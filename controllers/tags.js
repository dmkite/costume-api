const model = require('../models/tags')
const {getOneCostume} = require('../models/costumes')

function checkById(req, res, next) {
    const id = req.params.id
    const correctCostume = getOneCostume(id)
    req.body.correctCostume = correctCostume
    if (!correctCostume) return next({ status: 404, message: `No costume at id '${id}'` })
    next()
}

function getAllTags(req, res, next) {
    const { correctCostume } = req.body
    let tagList = model.getAllTags(correctCostume)
    res.status(200).send(tagList)
}

function getOneTag(req, res, next) {
    const correctCostume = req.body.correctCostume
    const { tId } = req.params
    const correctTag = model.getOneTag(correctCostume, tId)
    if (!correctTag) return next({ status: 404, message: `No tag at id '${id}'` })
    res.status(200).send(correctTag)
}

function createTag(req, res, next) {
    const { color, name, correctCostume } = req.body
    if (!name) return next({ status: 400, message: 'Tags must contain at least a name' })
    const newTag = { color, name }
    const createdTag = model.createTag(newTag, correctCostume)
    res.status(201).send(createdTag)
}

function editTag(req, res, next) {
    const { correctCostume, name, color } = req.body
    if (!name && !color) return next({ status: 400, message: 'Only name and color can be edited' })
    const edits = { name, color }
    const tId = req.params.tId
    const editedTag = model.editTag(correctCostume, tId, edits)
    res.status(200).send(editedTag)
}

function deleteTag(req, res, next) {
    const { correctCostume } = req.body
    const { tId } = req.params
    let deletedTag = model.deleteTag(correctCostume, tId)
    if (!deletedTag) return next({ status: 404, message: `No tag at id '${id}'` })
    res.send(deletedTag)
}

module.exports = {checkById, getAllTags, getOneTag, createTag, editTag, deleteTag}