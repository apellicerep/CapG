const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const { User } = require('../models')
const env = require('../config.js')


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

//ruta que nos sirve para mantener el state del current user en el front.
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

router.post('/', asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const pass = env.password //poner en .env 
    const passOK = password === pass
    //comprobar que el user existe en la base de datos
    try {
        //llamamos a "fake api" para que nos de el visto bueno pasandole las nuevas 
        //credenciales.
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
            "!secret928!!!", //env variable
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
