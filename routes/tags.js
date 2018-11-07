const express = require('express')
const router = express.Router({mergeParams:true})
const ctrl = require('../controllers/tags')

router.get('/', ctrl.checkById, ctrl.getAllTags)
router.get('/:tId', ctrl.checkById, ctrl.getOneTag)
router.post('/', ctrl.checkById, ctrl.createTag)
router.patch('/:tId', ctrl.checkById, ctrl.editTag)
router.delete('/:tId', ctrl.checkById, ctrl.deleteTag)

module.exports = router