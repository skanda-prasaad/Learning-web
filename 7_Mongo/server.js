const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { TodoModel, UserModel } = require("./db");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const app = express();
mongoose.connect(
  "mongodb+srv://skandaprasad595:Skanda312005@cluster0.dvemxcf.mongodb.net/todo-app-database"
);
app.use(express.json());

const JWT_SECRET = "secretKey";

// Zod schemas
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const todoSchema = z.object({
  title: z.string().min(1),
  done: z.boolean(),
});

// Signup Route
app.post("/signup", async function (req, res) {
  const parseResult = signupSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res
      .status(400)
      .json({ message: "Invalid input", errors: parseResult.error.errors });
  }

  const { email, password, name } = parseResult.data;
  const hashPasw = await bcrypt.hash(password, 5);
  try {
    await UserModel.create({ email, password: hashPasw, name });
    res.json({ message: "You are signed up!" });
  } catch (error) {
    res.status(400).json({ message: "User already exists!" });
  }
});

// Signin Route
app.post("/signin", async function (req, res) {
  const parseResult = signinSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res
      .status(400)
      .json({ message: "Invalid input", errors: parseResult.error.errors });
  }

  const { email, password } = parseResult.data;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(403).json({ message: "User not found!" });
  }

  const passMatch = await bcrypt.compare(password, user.password);
  if (passMatch) {
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
    res.json({ token, message: "You are signed in!" });
  } else {
    res.status(403).json({ message: "Invalid Credentials!" });
  }
});

// Auth Middleware
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

// Create Todo
app.post("/todo", auth, async function (req, res) {
  const parseResult = todoSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res
      .status(400)
      .json({ message: "Invalid todo data", errors: parseResult.error.errors });
  }

  const { title, done } = parseResult.data;
  await TodoModel.create({ title, done, userId: req.userId });
  res.json({ message: "Todo created" });
});

// Get Todos
app.get("/todo", auth, async function (req, res) {
  const todos = await TodoModel.find({ userId: req.userId });
  res.json({ todos });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
