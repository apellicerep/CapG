const express = require('express')
const router = express.Router()
const { User, Client, UserAssignment, Assignment, ConsultantManager } = require('../models')


// *************************************
// *************************************
//         DEVELOPMENT PURPOSE
// *************************************
// *************************************


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


// @route       GET api/seed
// @desc        **Testing purpose** seed the database.
// @access      Public
router.get('/', asyncHandler(async (req, res) => {
    const users = await User.bulkCreate([
        { name: "Pepe", surname: "Palm", email: "pepe@gmail.com", isManager: 0 },
        { name: "Juan", surname: "Pulido", email: "juan@gmail.com", isManager: 0 },
        { name: "Laura", surname: "Perez", email: "laura@gmail.com", isManager: 0 },
        { name: "Maria", surname: "Patena", email: "maria@gmail.com", isManager: 0 },
        { name: "Arturo", surname: "Ideamas", email: "arturo@gmail.com", isManager: 0 },
        { name: "Joaquim", surname: "Allems", email: "joaq@gmail.com", isManager: 0 }
    ])
    await Client.bulkCreate([
        { name: "Ikea", contactName: "John", contactEmail: "ikea@gmail.com", contactPhone: "0046111111" },
        { name: "Seb", contactName: "Markus", contactEmail: "markus@gmail.com", contactPhone: "0046222222" },
        { name: "Ica", contactName: "Adolf", contactEmail: "adolf@gmail.com", contactPhone: "0046333333" }
    ])
    await Assignment.bulkCreate([
        { name: "T&M", start_date: "2020-03-09", end_date: "2020-03-16", clientId: 1 },
        { name: "Payments", start_date: "2020-03-17", end_date: "2020-03-24", clientId: 2 },
        { name: "Public web", start_date: "2020-03-17", end_date: "2020-04-23", clientId: 3 }
    ])
    await UserAssignment.bulkCreate([
        { AssignmentId: 1, UserId: 1 },
        { AssignmentId: 1, UserId: 2 },
        { AssignmentId: 2, UserId: 1 },
        { AssignmentId: 3, UserId: 3 },
        { AssignmentId: 3, UserId: 1 },
        { AssignmentId: 2, UserId: 4 },
        { AssignmentId: 3, UserId: 5 },

    ])

    const managed1 = await User.findByPk(1)
    const managed2 = await User.findByPk(2)
    const managed3 = await User.findByPk(3)
    const managed4 = await User.findByPk(4)
    const managed5 = await User.findByPk(5)
    await managed1.setManager(5)
    await managed2.setManager(5)
    await managed3.setManager(5)
    await managed4.setManager(5)
    await managed5.setManager(2)

    res.json({ data: users })

}))

module.exports = router