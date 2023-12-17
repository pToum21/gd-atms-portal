const { Comment } = require('../models')

const commentData = [
    {
        id: 1,
        description: 'this is a really cool test',
        date_created: 'march 2, 2022',
        ticket_id: 1,
        user_id: 2
    },
    {
        id: 2,
        description: 'this is a really bad test',
        date_created: 'march 5, 2022',
        ticket_id: 2,
        user_id: 3
    }
];

const seedComment = () => {
    return Comment.bulkCreate(commentData)
};

module.exports = seedComment;