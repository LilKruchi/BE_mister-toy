const toyService = require('./toy.service')

// const logger = require('../../service/logger.service.js')

async function getToys(req, res) {
    try {
        const filterBy = {
            name: req.query.name || '',
            inStock: req.query.inStock || 'true',
            price: +req.query.price || 0,
            labels: req.query.labels || 'On wheels,Art,Box game,Baby,Doll,Puzzle,Outdoor,Battery Powered'
        }

        const toys = await toyService.query(filterBy)
        res.json(toys)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

async function getToyById(req, res) {
    try {
        const toyId = req.params.id
        const toy = await toyService.getById(toyId)
        console.log(toy);
        res.json(toy)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

async function addToy(req, res) {
    const { loggedinUser } = req

    try {
        const toy = req.body
        toy.owner = loggedinUser
        const addedToy = await toyService.add(toy)
        res.json(addedToy)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

async function updateToy(req, res) {
    try {
        const toy = req.body
        const savedToy = await toyService.save(toy)
        res.json(savedToy)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

async function removeToy(req, res) {
    try {
        const toyId = req.params.id
        const removedToy = await toyService.remove(toyId)
        res.send(removedToy)
    } catch (err) {
        res.status(500).send({ err: 'Failed to remove toy' })

    }
}

module.exports = {
    getToys,
    getToyById,
    addToy,
    removeToy,
    updateToy
}