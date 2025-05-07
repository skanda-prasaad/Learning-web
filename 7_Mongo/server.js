// // server.js
const express = require("express");
const jwt = require("jsonwebtoken");
const { UerModel, Todomodel, UesrModel } = require("./db");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = 3000;
mongoose.connect("mongodb+srv://skandaprasad595:Skanda312005@cluster0.dvemxcf.mongodb.net/todo-app-database")
app.use(express.json());

const SECRET = "SuperSecret1212";

app.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UesrModel.create({
    email: email,
    password: password,
    name: name,
  });

  res.json({
    msg: "You are logged in..",
  });
});

app.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await UesrModel.findOne({
    email: email,
    password: password,
  });

  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      SECRET
    );
  } else {
    res.status(403).json({
      msg: "Incorrect Credentials",
    });
  }
});

app.post("/todo", function (req, res) {});

app.get("/todos", function (req, res) {});

app.listen(PORT);
