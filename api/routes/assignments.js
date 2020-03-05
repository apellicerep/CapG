const express = require('express')
const router = express.Router()
const { User, Client, Assignment, UserAssignment } = require('../models')
const { body, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const { Op } = require("sequelize");

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
        attributes: ['id'],
        include: [{
            model: User,
            as: 'Manager',
            where: { id: req.currentUser.id },
            attributes: ['id', 'name'],
            through: {
                attributes: []
            }
        }]
    })

    if (!userManaged.length) return res.status(200).json({ data: [] })

    const arrayUsersManaged = userManaged.map(user => user.get({ plain: true }).id)

    const assignments = await Assignment.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'clientId']
        },
        include: [{
            model: User,
            attributes: ['id', 'name', 'surname'],
            where: {
                id: {
                    [Op.or]: arrayUsersManaged
                }
            },
            through: {
                attributes: []
            }
        }, {
            model: Client,
            attributes: ['name']
        }]
    })
    res.status(200).json({ data: assignments })

}))

router.get('/:id', auth, asyncHandler(async (req, res) => {

    const assignment = await Assignment.findByPk(req.params.id, {
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'clientId']
        },
        include: [{
            model: User,
            attributes: ['id', 'name', 'surname'],
            through: {
                attributes: []
            }
        },
        {
            model: Client,
            attributes: ['id', 'name']
        }]
    })

    assignment ?
        res.status(200).json({ data: assignment }) :
        res.status(404).send("Not Found")

}))

router.post('/', auth, [
    body('name', 'Please introduce a name').not().isEmpty(),
    body('percentage', 'Please introduce a percentage').not().isEmpty(),
    body('start_date', 'Please introduce a start date').not().isEmpty(),
    body('start_date', 'Date format incorrect').isISO8601(),
    body('end_date', 'Please introduce a end date').not().isEmpty(),
    body('end_date', 'Date format incorrect').isISO8601(),
    body('clientId', 'Please introduce a client Id').not().isEmpty(),
    body('clientId', 'Must be an Integer').isInt(),
    body('consultants', 'Please introduce consultants').not().isEmpty()
],
    asyncHandler(async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

        const { consultants } = req.body
        delete req.body.consultants
        //console.log(Object.keys(Assignment.prototype))
        try {
            const asign = await Assignment.create(req.body)
            await asign.addUser(consultants.map(i => i.id))
            // await asign.addUser(consultants, { through: { nameAssignment: name, nameConsultant: "inventado" } })
            res.status(201).end()
        } catch (error) {

            if (error.name === "SequelizeUniqueConstraintError") {
                error.message = "The name of the assignment must be unique"
                error.status = 400
                next(error)
            } else {
                throw error;
            }
        }
    }))

router.put('/:id', auth, [
    body('name', 'Please introduce a name').not().isEmpty(),
    body('percentage', 'Please introduce a percentage').not().isEmpty(),
    body('start_date', 'Please introduce a start date').not().isEmpty(),
    body('start_date', 'Date format incorrect').isISO8601(),
    body('end_date', 'Please introduce a end date').not().isEmpty(),
    body('end_date', 'Date format incorrect').isISO8601(),
    body('clientId', 'Please introduce a client Id').not().isEmpty(),
    body('clientId', 'Must be an Integer').isInt(),
    body('consultants', 'Please introduce consultants').not().isEmpty()
],
    asyncHandler(async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const assignment = await Assignment.findByPk(req.params.id)
        if (assignment) {
            try {
                const { consultants } = req.body
                delete req.body.consultants
                await assignment.update(req.body)
                const test = await assignment.getUsers()
                await assignment.removeUsers(test)
                await assignment.addUser(consultants.map(i => i.id))
                res.status(204).end()
            } catch (error) {
                if (error.name === "SequelizeUniqueConstraintError") {
                    error.message = "The name of the assignment must be unique"
                    error.status = 400
                    next(error)
                } else {
                    throw error;
                }
            }
        } else {
            res.status(404).send("Not Found")
        }
    }))

router.delete('/:id', auth, asyncHandler(async (req, res) => {

    const assignment = await Assignment.findByPk(req.params.id)
    if (assignment) {
        await assignment.destroy()
        res.status(204).end()
    } else {
        res.status(404).send("Not Found")
    }
}))


module.exports = router