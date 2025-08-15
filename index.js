const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/question");
const Answer = require("./database/Answer");

connection
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso!");
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  Question.findAll({ raw: true, order: [["id", "DESC"]] }).then((questions) => {
    res.render("index", { questions: questions });
  });
});
app.get("/question", (req, res) => {
  res.render("makeQuestion");
});
app.post("/savequestion", (req, res) => {
  let title = req.body.title;
  let question = req.body.question;
  Question.create({
    title: title,
    question: question,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/question/:id", (req, res) => {
  let id = req.params.id;
  Question.findOne({ where: { id: id } }).then((question) => {
    if (question != undefined) {
      Answer.findAll({ where: { questionId: question.id }, raw: true, order: [["id", "DESC"]] }).then(
        (answers) => {
          res.render("question", { question: question, answers: answers });
        }
      );
    } else {
      res.redirect("/");
    }
  });
});

app.post("/answer", (req, res) => {
  let answer = req.body.answer;
  let questionId = req.body.questionId;

  Answer.create({
    questionId: questionId,
    answer: answer,
  }).then(() => {
    res.redirect(`/question/${questionId}`);
  });
});

app.listen(8080, () => {
  console.log("Servidor rodando!");
});
