const express = require('express')
const router = express.Router()

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

router.get('/', asyncHandler(async (req, res) => {
    res.json({ test: "hello" })
}))

module.exports = router