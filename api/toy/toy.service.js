const dbService = require('../../service/db.service.js')
const utilService = require('../../service/util.service.js')
const ObjectId = require('mongodb').ObjectId
// const logger = require('../../service/logger.service')
const collectionName = 'toy'
module.exports = {
    query,
    getById,
    add,
    update,
    remove
}

async function query(filterBy) {
    try {

        const criteria = {
            name: { $regex: filterBy.name, $options: 'i' },
            price: { $gt: filterBy.price },
            labels: { $in: filterBy.labels.split(',') }
        }

        const collection = await dbService.getCollection(collectionName)
        var toys = await collection.find(criteria).toArray()
        return toys

    } catch (err) {
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection(collectionName)
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            name: toy.name,
            price: toy.price,
            inStock: toy.inStock,
            img: toy.img
        }
        const collection = await dbService.getCollection(collectionName)
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
    } catch (err) {
        throw err
    }
}

// function query(filterBy) {
//     // console.log(filterBy);
//     let filteredToys = toys
//     if (filterBy.name) {
//         const regex = new RegExp(filterBy.name, 'i')
//         filteredToys = filteredToys.filter(toy => regex.test(toy.name))
//     }
//     if (filterBy.price) {
//         filteredToys = filteredToys.filter(toy => toy.price >= filterBy.price)
//     }
//     if (!!filterBy.inStock) {

//         if (filterBy.inStock === 'true') {
//             filteredToys = filteredToys.filter(toy => toy)
//         } else {
//             filteredToys = filteredToys.filter(toy => toy.inStock)
//         }
//     }
//     if (filterBy.labels) {
//         if (filterBy.label === ['']) console.log('heee');
//         filterBy.labels = filterBy.labels.split(',')
//         console.log(filterBy.labels);
//         filteredToys = filteredToys.filter(toy => toy.labels.some(label => filterBy.labels.includes(label)))
//     }
//     return Promise.resolve(filteredToys)
// }

// function get(toyId) {
//     const toy = toys.find(toy => toy._id === toyId)
//     if (!toy) return Promise.reject('No such toy')
//     return Promise.resolve(toy)
// }

// function save(toy) {
//     // console.log('service', toy);
//     // console.log('service', toy._id);
//     if (toy._id) {
//         const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
//         if (!toyToUpdate) return Promise.reject('No such toy')
//         console.log(toy);
//         if (toy.inStock === 'false') toyToUpdate.inStock = false
//         else toyToUpdate.inStock = 'on'
//         toyToUpdate.name = toy.name
//         toyToUpdate.price = toy.price
//         // toyToUpdate.inStock = toy.inStock
//         toyToUpdate.img = toy.img
//         toyToUpdate.labels = toy.labels
//         toyToUpdate.createdAt = new Date().getTime()
//     } else {
//         toy._id = _makeId()
//         toy.createdAt = new Date().getTime()
//         toys.unshift(toy)
//     }
//     return _writeToysToFile().then(() => toy)
// }

// function remove(toyId) {
//     const idx = toys.findIndex(toy => toy._id === toyId)
//     if (idx === -1) return Promise.reject('No such toy')
//     // const toy = toys[idx]
//     toys.splice(idx, 1)
//     return _writeToysToFile()
// }
