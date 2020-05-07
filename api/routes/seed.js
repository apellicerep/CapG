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
        { name: "Pepe", surname: "Palm", email: "pepe@gmail.com" },
        { name: "Juan", surname: "Pulido", email: "juan@gmail.com" },
        { name: "Laura", surname: "Perez", email: "laura@gmail.com" },
        { name: "Maria", surname: "Patena", email: "maria@gmail.com" },
        { name: "Arturo", surname: "Ideamas", email: "arturo@gmail.com" },
        { name: "Joaquim", surname: "Allems", email: "joaq@gmail.com" },
        { name: "John", surname: "sutton", email: "john@gmail.com" },
        { name: "Danny", surname: "Thomson", email: "danny@gmail.com" },
        { name: "Ayan", surname: "Evans", email: "ayan@gmail.com" },
        { name: "Adis", surname: "Example", email: "adis@gmail.com" },
        { name: "Miles", surname: "Roberts", email: "Miles@gmail.com" }
    ])
    await Client.bulkCreate([
        { name: "Ikea", contactName: "John", contactEmail: "ikea@gmail.com", contactPhone: "0046111111" },
        { name: "Seb", contactName: "Markus", contactEmail: "markus@gmail.com", contactPhone: "0046222222" },
        { name: "Ica", contactName: "Adolf", contactEmail: "adolf@gmail.com", contactPhone: "0046333333" },
        { name: "Olsen", contactName: "Aiden", contactEmail: "aiden@gmail.com", contactPhone: "0046444444" },
        { name: "Securitas", contactName: "Axel", contactEmail: "axel@gmail.com", contactPhone: "0046555555" },
        { name: "Skanska", contactName: "Oliver", contactEmail: "oliver@gmail.com", contactPhone: "0046666666" }
    ])
    await Assignment.bulkCreate([
        { name: "T&M", start_date: "2020-03-09", end_date: "2020-03-16", clientId: 1 },
        { name: "Payments", start_date: "2020-03-17", end_date: "2020-03-24", clientId: 2 },
        { name: "Public web", start_date: "2020-03-17", end_date: "2020-04-23", clientId: 3 },
        { name: "Athentication", start_date: "2020-03-17", end_date: "2020-04-23", clientId: 4 },
        { name: "Ecommerce", start_date: "2020-03-17", end_date: "2020-04-23", clientId: 1 },
        { name: "Blog", start_date: "2020-03-17", end_date: "2020-04-23", clientId: 6 },
        { name: "React Spa", start_date: "2020-03-17", end_date: "2020-04-23", clientId: 5 },
        { name: "Node email", start_date: "2020-03-17", end_date: "2020-04-23", clientId: 3 },
    ])
    await UserAssignment.bulkCreate([
        { AssignmentId: 1, UserId: 1 },
        { AssignmentId: 1, UserId: 2 },
        { AssignmentId: 2, UserId: 3 },
        { AssignmentId: 2, UserId: 4 },
        { AssignmentId: 3, UserId: 5 },
        { AssignmentId: 3, UserId: 6 },
        { AssignmentId: 3, UserId: 1 },
        { AssignmentId: 4, UserId: 7 },
        { AssignmentId: 4, UserId: 8 },
        { AssignmentId: 5, UserId: 9 },
        { AssignmentId: 5, UserId: 10 },
        { AssignmentId: 6, UserId: 7 },
        { AssignmentId: 6, UserId: 8 },
        { AssignmentId: 6, UserId: 10 },
        { AssignmentId: 7, UserId: 1 },
        { AssignmentId: 8, UserId: 2 },
        { AssignmentId: 8, UserId: 5 },

    ])

    const managed1 = await User.findByPk(1)
    const managed2 = await User.findByPk(2)
    const managed3 = await User.findByPk(3)
    const managed4 = await User.findByPk(4)
    const managed5 = await User.findByPk(5)
    const managed6 = await User.findByPk(6)
    const managed7 = await User.findByPk(7)
    const managed8 = await User.findByPk(8)
    const managed9 = await User.findByPk(9)
    const managed10 = await User.findByPk(10)

    await managed1.setManager(10)
    await managed2.setManager(10)
    await managed3.setManager(10)
    await managed4.setManager(10)
    await managed5.setManager(10)
    await managed6.setManager(10)
    await managed7.setManager(7)
    await managed8.setManager(7)
    await managed9.setManager(7)
    await managed10.setManager(7)


    res.json({ data: users })

}))

module.exports = router