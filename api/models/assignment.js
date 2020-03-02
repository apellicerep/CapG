const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class Assignment extends Sequelize.Model { }

    Assignment.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        start_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        end_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        }
    }, { sequelize });

    Assignment.associate = (models) => {
        //asociation with Assignment using as join table UserAssignment
        Assignment.belongsToMany(models.User, {
            through: models.UserAssignment
        })
        Assignment.belongsTo(models.Client, {
            foreignKey: {
                fieldName: 'clientName',
                allowNull: false
            },
        })
    }
    return Assignment;
}