const express = require('express')
const router = express.Router({mergeParams:true})
const ctrl = require('../controllers/costumes')

const tagRoutes = require('./tags')

router.get('/', ctrl.getAllCostumes)
router.get('/:id', ctrl.getOneCostume)
router.post('/', ctrl.createCostume)
router.patch('/:id', ctrl.checkById, ctrl.editCostume)
router.delete('/:id', ctrl.checkById, ctrl.deleteCostume)

router.use('/:id/tags', ctrl.checkById, tagRoutes)


module.exports = router