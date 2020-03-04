const express = require('express')
const router = express.Router()
const { Client } = require('../models')

/* Handler function to wrap each route. */
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

const manager = 5
router.get('/', asyncHandler(async (req, res) => {

    const clients = await Client.findAll({
        attributes: ['id', 'name']
    })
    console.log(clients)
    res.json({ data: clients })
}))

module.exports = router