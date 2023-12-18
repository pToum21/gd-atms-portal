const { User } = require('../models')

const userData = [
    {
        id: 1,
        user_name: 'saltheguy',
        email: 'salissmall@gmail.com',
        password: 'password123'
    },
    {
        id: 2,
        user_name: 'ryan',
        email: 'ryan@gmail.com',
        password: 'password'
    },
    {
        id: 3,
        user_name: 'pashathecodmobileplayer',
        email: 'pasha@gmail.com',
        password: 'password'
    },
    {
        id: 4,
        user_name: 'juicer123456',
        email: 'bigmoney@gmail.com',
        password: 'password'
    },
];

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true
});

module.exports = seedUser;