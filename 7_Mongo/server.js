const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { TodoModel, UserModel } = require("./db");
const bcrypt = require('bcrypt');

const app = express();
mongoose.connect(
  "mongodb+srv://skandaprasad595:Skanda312005@cluster0.dvemxcf.mongodb.net/todo-app-database"
);
app.use(express.json());

const JWT_SECRET = "secretKey";

app.post("/signup", async function (req, res) {
  const { email, password, name } = req.body;
  const hashPasw = await bcrypt.hash(password, 5);
  try {
    await UserModel.create({ email, hashPasw0, name });
    res.json({ message: "You are signed up!" });
  } catch (error) {
    res.status(400).json({ message: "User already exists!" });
  }
});

app.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });

  if (user) {
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
    res.json({ token, message: "You are signed in!" });
  } else {
    res.status(403).json({ message: "Invalid Credentials!" });
  }
});

function auth(req, res, next) {
  const token = req.headers.authorization;
  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    req.userId = decodedData.id;
    next();
  } catch (e) {
    res.status(403).json({ message: "Invalid Token!" });
  }
}

app.post("/todo", auth, async function (req, res) {
  const { title, done } = req.body;
  await TodoModel.create({ title, done, userId: req.userId });
  res.json({ message: "Todo created" });
});

app.get("/todo", auth, async function (req, res) {
  const todos = await TodoModel.find({ userId: req.userId });
  res.json({ todos });
});

app.listen(3000);
