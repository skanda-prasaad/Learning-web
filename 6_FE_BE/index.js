// server.js
const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "randomname";
const app = express();

app.use(express.static(__dirname + "/public"));
app.use(express.json());

const users = [];

function logger(req, res, next) {
  console.log(req.method + " request came");
  next();
}

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", logger, (req, res) => {
  const { username, password } = req.body;
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    return res.status(409).json({ message: "Username already exists" });
  }

  users.push({ username, password });
  res.json({ message: "You are signed up" });
});

app.post("/signin", logger, (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Credentials incorrect" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

app.get("/me", logger, auth, (req, res) => {
  const user = users.find((u) => u.username === req.username);
  res.json(user || { message: "User not found" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
