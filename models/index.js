const User = require('./User')
const Ticket = require('./Ticket')
const Comment = require('./Comment')

// figure out how to implement role to have an admin access
// const Role = require('./Role')

User.hasMany(Ticket, {
    foreignKey: 'user_id'
});
Ticket.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});
Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

Ticket.hasMany(Comment, {
    foreignKey: 'ticket_id'
})
Comment.belongsTo(Ticket, {
    foreignKey: 'ticket_id'
})

module.exports = { User, Comment, Ticket }