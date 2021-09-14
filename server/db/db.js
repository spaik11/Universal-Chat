const Sequelize = require('sequelize');
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/stackchat',
  {
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: true,
    },
  }
);
module.exports = db;
