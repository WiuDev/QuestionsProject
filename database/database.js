const sequelize = require('sequelize')
const connection = new sequelize('questionsdb', 'root', 'Senha123', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = connection