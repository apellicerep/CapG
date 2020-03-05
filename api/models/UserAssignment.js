const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class UserAssignment extends Sequelize.Model { }

    UserAssignment.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, { sequelize });

    return UserAssignment;
}