const fs = require('fs')
const shortId = require('shortid')

function getAllTags(costume) {
    return costume.tags
}

function getOneTag(costume, id) {
    const index = costume.tags.findIndex(tag => tag.id === id)
    return costume.tags[index]
}

function createTag(tag, id) {
    tag.id = shortId()
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    const index = data.findIndex(ele => ele.id === id)
    data[index].tags.push(tag)
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/costumes.json', data)
    return tag
}

function editTag(cId, id, edits) {
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    const correctCostume = data.find(ele => ele.id === cId)

    const index = correctCostume.tags.findIndex(tag => tag.id === id)

    if (!correctCostume.tags[index]) return false
    for (let key in edits) {
        if (!!edits[key]) correctCostume.tags[index][key] = edits[key]
    }

    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/costumes.json', data)

    return correctCostume.tags[index]
}

function deleteTag(cId, id) {
    let data = fs.readFileSync('data/costumes.json', 'utf-8')
    data = JSON.parse(data)
    const index = data.findIndex(ele => ele.id === cId)
    const tagIndex = data[index].tags.findIndex(tag => tag.id === id)
    if (tagIndex === -1) return false
    const deletedTag = data[index].tags.splice(tagIndex, 1)
    data = JSON.stringify(data, null, 4)
    fs.writeFileSync('data/costumes.json', data)
    return deletedTag
}

module.exports = { getAllTags, getOneTag, createTag, editTag, deleteTag}