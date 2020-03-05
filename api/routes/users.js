const express = require('express')
const router = express.Router()
const { User } = require('../models')
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

router.get('/', auth, asyncHandler(async (req, res) => {
    const userManaged = await User.findAll({
        attributes: ['id', 'name', 'surname'],
        include: [{
            model: User,
            as: 'Manager',
            where: { id: req.currentUser.id },
            attributes: [],
            through: {
                attributes: []
            }
        }]
    })
    res.json({ data: userManaged })
}))

module.exports = router