const fs = require('fs')
const shortId = require('shortid')

function getAllTags(costume) {
    return costume.tags
}

function getOneTag(costume, id) {
    let index = costume.tags.findIndex(tag => tag.id === id)
    return costume.tags[index]
}

function createTag(tag, costume) {
    tag.id = shortId()
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    let index = data.findIndex(ele => ele.id === costume.id)
    data[index].tags.push(tag)
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/costumes.json', data)
    return tag
}

function editTag(costume, id, edits) {
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    const correctCostume = data.find(ele => ele.id === costume.id)

    const index = correctCostume.tags.findIndex(tag => tag.id === id)

    if (!correctCostume.tags[index]) return next({ status: 404, message: `No tag at id '${id}'` })
    for (let key in edits) {
        if (!!edits[key]) correctCostume.tags[index][key] = edits[key]
    }

    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/costumes.json', data)

    return correctCostume.tags[index]
}

function deleteTag(costume, id) {
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    const index = data.findIndex(ele => ele.id === costume.id)
    const tagIndex = data[index].tags.findIndex(tag => tag.id === id)
    if (tagIndex === -1) return false
    const deletedTag = data[index].tags.splice(tagIndex, 1)
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/costumes.json', data)
    return deletedTag
}

module.exports = { getAllTags, getOneTag, createTag, editTag, deleteTag}