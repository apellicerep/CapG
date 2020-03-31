const express = require('express')
const router = express.Router()
const { User, Client, Assignment } = require('../models')
const { body, validationResult } = require('express-validator')
const auth = require('../middleware/auth')
const { Op } = require("sequelize");

//Handler function to wrap each route. 
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}

// @route       GET api/assignments
// @desc        Get list of assignments, only assignments of the consultants that the Manager is charge.
// @access      Private 
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
        order: [["name", "ASC"]],
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



// @route       GET api/assignments/:id
// @desc        Get individual assignment
// @access      Private 
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


// @route       POST api/assignments
// @desc        Create new Assignment
// @access      Private 
router.post('/', auth, [
    body('name', 'Please introduce a name').not().isEmpty(),
    body('percentage', 'Please introduce a percentage').not().isEmpty(),
    body('start_date', 'Please introduce a start date').not().isEmpty(),
    body('start_date', 'Date format incorrect').isISO8601(),
    body('end_date', 'Please introduce a end date').not().isEmpty(),
    body('end_date', 'Date format incorrect').isISO8601(),
    body('clientId', 'Please introduce client name').not().isEmpty(),
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
            res.status(201).end()
        } catch (error) {

            if (error.name === "SequelizeUniqueConstraintError") {
                error.message = "The name of the assignment must be unique"
                error.status = 422
                next(error)
            } else {
                throw error;
            }
        }
    }))


// @route       UPDATE api/assignments/:id
// @desc        Update individual asignments
// @access      Private 
router.put('/:id', auth, [
    body('name', 'Please introduce a name').not().isEmpty(),
    body('percentage', 'Please introduce a percentage').not().isEmpty(),
    body('start_date', 'Please introduce a start date').not().isEmpty(),
    body('start_date', 'Date format incorrect').isISO8601(),
    body('end_date', 'Please introduce a end date').not().isEmpty(),
    body('end_date', 'Date format incorrect').isISO8601(),
    body('clientId', 'Please introduce a client name').not().isEmpty(),
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
                    error.status = 422
                    next(error)
                } else {
                    throw error;
                }
            }
        } else {
            res.status(404).send("Not Found")
        }
    }))



// @route       DELETE api/assignments/:id
// @desc        Delte individual assignments
// @access      Private 
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