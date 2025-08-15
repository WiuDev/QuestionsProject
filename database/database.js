const sequelize = require('sequelize')
const connection = new sequelize('questionsdb', 'root', 'kiko4321', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection