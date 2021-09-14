const Sequelize = require('sequelize');
const db = require('../db');

const images = [
  '/images/tulsi.jpg',
  '/images/jd.jpg',
  '/images/cody.jpg',
  '/images/murphy.jpg',
  '/images/ben.jpg',
];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

module.exports = db.define('author', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: function () {
      return getRandomImage();
    },
  },
});
