const sequelize = require("sequelize");
const connection = require("./database");

const Answer = connection.define("answer", {
  questionId: {
    type: sequelize.INTEGER,
    allowNull: false,
  },
  answer: {
    type: sequelize.TEXT,
    allowNull: false,
  },
});

Answer.sync({ force: false }).then(() => {});

module.exports = Answer;
