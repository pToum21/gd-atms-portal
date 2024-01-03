const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection')

class Comment extends Model { }

// comment column
Comment.init(
    {
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        ticket_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ticket',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

module.exports = Comment;