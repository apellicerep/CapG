const express = require('express')
const router = express.Router()
const { Client } = require('../models')
const auth = require('../middleware/auth')

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

// @route       GET api/clients
// @desc        Get all clients in the system.
// @access      Private 
router.get('/', auth, asyncHandler(async (req, res) => {

    const clientes = await Client.findAll({
        attributes: ['id', 'name']
    })
    res.json({ data: clientes })
}))

module.exports = router