const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class User extends Sequelize.Model { }

    User.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }

    }, { sequelize });

    User.associate = (models) => {
        //asociation with Assignment using as join table UserAssignment
        User.belongsToMany(models.Assignment, {
            through: models.UserAssignment
        })
        //create table Manager
        User.belongsToMany(models.User, { as: 'Manager', through: 'ConsultantManager' })
    }
    return User;
}