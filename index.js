const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Question = require("./database/question");

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
  res.render("index");
});
app.get("/question", (req, res) => {
  res.render("question");
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

app.listen(8080, () => {
  console.log("Servidor rodando!");
});
