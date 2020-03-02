const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class UserAssignment extends Sequelize.Model { }

    UserAssignment.init({}, { sequelize });

    return UserAssignment;
}