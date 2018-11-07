const express = require('express')
const router = express.Router({mergeParams:true})
const ctrl = require('../controllers/tags')

router.get('/', ctrl.getAllTags)
router.get('/:tId', ctrl.getOneTag)
router.post('/', ctrl.createTag)
router.patch('/:tId', ctrl.editTag)
router.delete('/:tId', ctrl.deleteTag)

module.exports = router