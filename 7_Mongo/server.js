// // server.js
const express = require("express");
const jwt = require("jsonwebtoken");
const { Todomodel, UserModel } = require("./db");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = 3000;
mongoose.connect(
  "mongodb+srv://skandaprasad595:Skanda312005@cluster0.dvemxcf.mongodb.net/todo-app-database"
);
app.use(express.json());

const SECRET = "SuperSecret1212";

app.post("/signup", async function (req, res) {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists." });
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  await UserModel.create({
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

  const user = await UserModel.findOne({
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
    res.json({ token });
  } else {
    res.status(403).json({
      msg: "Incorrect Credentials",
    });
  }
});

app.post("/todo", async function (req, res) {
  const token = req.headers.authorization;
  const { title, done } = req.body;
  const decodeTokoen = jwt.verify(token, SECRET);
  const UserId = decodeTokoen.id;
  const user = await UserModel.findOne(UserId);
  if (user) {
    await Todomodel.create({
      title: title,
      done: done,
      UserId: UserId,
    });
  } else {
    return res.status(400).send("Invalid credentials.");
  }
  res.status(400).send("Task added");
});

app.get("/todos", async function (req, res) {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, SECRET);
    const todos = await Todomodel.find({ userID: decoded.id });
    res.json({ todos });
  } catch (err) {
    res.status(401).json({ msg: "Invalid token" });
  }
});

app.listen(PORT);
