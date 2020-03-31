const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const { User } = require('../models')
const dotenv = require('dotenv')
dotenv.config()


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

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get('/', auth, asyncHandler(async (req, res) => {

    const user = await User.findByPk(req.currentUser.id)
    !user ?
        res.status(404).send("User Not Found") :
        res.status(200).json(
            {
                name: user.name
            }
        )
}))


// @route       POST api/auth
// @desc        Log In user & get Token
// @access      Publics
router.post('/', asyncHandler(async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    console.log(process.env.PASSWORD)
    const pass = process.env.PASSWORD //poner en .env 
    const passOK = password === pass

    try {
        //I have simulated a call to a "Fake Auth api" .
        const fakeApi = () => new Promise(resolve => {
            setTimeout(() => resolve(true), 500)
        })

        const user = await User.findOne({ where: { email: email } })
        const credentials = user === null
            ? false
            : await fakeApi()


        if (!(user && credentials && passOK)) {
            return res.status(400).json({ msg: 'Invalid Credentials' })
        }
        const payload = {
            user: {
                id: user.get({ plain: true }).id,
                name: user.get({ plain: true }).name
            }
        }

        jwt.sign(
            payload,
            process.env.SECRET, //env variable
            {
                expiresIn: 36000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token })
            })

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
}))



module.exports = router
