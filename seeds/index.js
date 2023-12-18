const seedComment = require('./comment-seeds');
const seedTicket = require('./ticket-seeds');
const seedUser = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await seedUser();
  console.log('\n----- USERS SEEDED -----\n');

  await seedTicket();
  console.log('\n----- TICKETS SEEDED -----\n');

  await seedComment();
  console.log('\n----- COMMENTS SEEDED -----\n');

  // process.exit(0) ensures the Node.js process will terminate immediately and return the exit code to the operating system gracefully.
  process.exit(0);
};

seedAll();