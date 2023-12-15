const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection')

class Role extends Model { }

Role.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'role',
    }
);

module.exports = Role;