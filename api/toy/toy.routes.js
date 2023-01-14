const express = require('express')
// const {}
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const router = express.Router()
const { getToys, getToyById, addToy, removeToy, updateToy } = require('./toy.controller')

// const { log } = require('../../middlewares/logger.middleware')

router.get('/', getToys)
router.get('/:id', getToyById)
router.post('/', requireAuth, addToy)
router.put('/:id', requireAuth, updateToy)
router.delete('/:id', requireAuth, removeToy)

module.exports = router