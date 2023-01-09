const express = require('express')
const app = express()
const toyService = require('./service/toy.service.js')
const PORT = 3030

app.use(express.static('public'))
app.use(express.json())

// query
app.get('/api/toy', (req, res) => {
    toyService.query()
        .then(toys => {
            res.send(toys)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('cannot get toys')
        })
})

// update
app.put('/api/toy', (req, res) => {
    const toy = req.body
    // console.log(toy);
    toyService.save(toy)
        .then(savedToy => {
            console.log(savedToy);
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('cannot update toy')
        })
})

// create
app.post('/api/toy', (req, res) => {
    const toy = req.body
    console.log(toy);
    toyService.save(toy)
        .then(savedToy => {
            console.log(savedToy);
            res.send(savedToy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('cannot create toy')
        })
})

// read
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.get(toyId)
        .then(toy => {
            res.send(toy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot find toy')
        })
})

// remove
app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.remove(toyId)
        .then(toy => {
            res.send('Removed')
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot remove toy')
        })
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}: http://localhost:${PORT}/`))
