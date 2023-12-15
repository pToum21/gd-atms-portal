const User = require('./User')
const Ticket = require('./Ticket')
const Comments = require('./Comment')

// figure out how to implement role to have an admin access
// const Role = require('./Role')

User.hasMany(Ticket, {
    foreignKey: 'user_id'
});
Ticket.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comments, {
    foreignKey: 'user_id'
});
Comments.belongsTo(User, {
    foreignKey: 'user_id'
})

Ticket.hasMany(Comments, {
    foreignKey: 'ticket_id'
})
Comments.belongsTo(Ticket, {
    foreignKey: 'ticket_id'
})

module.exports = { User, Comment, Ticket }