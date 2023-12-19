const { User } = require('../models')

const userData = [
    {
        id: 1,
        user_name: 'saltheguy',
        email: 'salissmall@gmail.com',
        password: 'password123',
        role: 'customer'
    },
    {
        id: 2,
        user_name: 'ryan',
        email: 'ryan@gmail.com',
        password: 'password',
        role: 'customer'
    },
    {
        id: 3,
        user_name: 'pashathecodmobileplayer',
        email: 'pasha@gmail.com',
        password: 'password',
        role: 'customer'
    },
    {
        id: 4,
        user_name: 'juicer123456',
        email: 'bigmoney@gmail.com',
        password: 'password',
        role: 'admin'
    },
];

const seedUser = () => User.bulkCreate(userData, {
    individualHooks: true
});

module.exports = seedUser;