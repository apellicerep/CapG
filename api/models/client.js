const Sequelize = require('sequelize')

module.exports = (sequelize) => {
    class Client extends Sequelize.Model { }

    Client.init({
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        contactName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        contactEmail: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        contactPhone: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        }
    }, { sequelize });

    Client.associate = (models) => {
        Client.hasMany(models.Assignment, {
            foreignKey: {
                fieldName: 'clientName',
                allowNull: false
            },

        })

    }
    return Client;
}