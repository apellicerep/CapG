const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class Assignment extends Sequelize.Model { }

    Assignment.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        percentage: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        start_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        end_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        comment: {
            type: Sequelize.STRING,
            allowNull: true
        }
    }, { sequelize });

    Assignment.associate = (models) => {
        //asociation with Assignment using as join table UserAssignment
        Assignment.belongsToMany(models.User, {
            through: models.UserAssignment
        })
        Assignment.belongsTo(models.Client, {
            foreignKey: {
                fieldName: 'clientId',
                allowNull: false
            },
        })
    }
    return Assignment;
}