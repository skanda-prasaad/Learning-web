const express = require("express");
const jwt = require("jsonwebtoken");
const { Todomodel, UserModel } = require("./db");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = 3000;
const SECRET = "SuperSecret1212";

mongoose.connect(
  "mongodb+srv://skandaprasad595:Skanda312005@cluster0.dvemxcf.mongodb.net/todo-app-database"
);

app.use(express.json());

function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ msg: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token" });
  }
}

app.post("/signup", async function (req, res) {
  const { email, password, name } = req.body;

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "User already exists." });
  }

  await UserModel.create({ email, password, name });

  res.json({ msg: "You are signed up." });
});

app.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email, password });

  if (user) {
    const token = jwt.sign({ id: user._id }, SECRET);
    res.json({ token });
  } else {
    res.status(403).json({ msg: "Incorrect Credentials" });
  }
});

app.post("/todo", verifyToken, async function (req, res) {
  const { title, done } = req.body;

  const user = await UserModel.findById(req.userId);
  if (!user) {
    return res.status(400).send("Invalid credentials.");
  }

  await Todomodel.create({
    title,
    done,
    userID: req.userId,
  });

  res.status(201).send("Task added");
});

app.get("/todos", verifyToken, async function (req, res) {
  const todos = await Todomodel.find({ userID: req.userId });
  res.json({ todos });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
