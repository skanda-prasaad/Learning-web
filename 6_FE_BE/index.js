const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "randomname";
const users = [];

app.use(express.json());

function auth(req, res, next) {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "You are not logged in" });
  }
  try {
    const decodedinfo = jwt.verify(token, JWT_SECRET);
    if (decodedinfo.username) {
      req.user = decodedinfo;
      next();
    } else {
      res.status(401).json({ message: "You are not logged in" });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/Public/index.html");
});

app.post("/signup", function (req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required...");
  }
  const user = users.find((user) => user.username == username);
  if (user) {
    return res.status(400).send("User already exist...");
  }
  users.push({
    username: username,
    password: password,
  });
  res.status(200).send("User signuped succesfull...");
});

app.post("/signin", function (req, res) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required...");
  }
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    const token = jwt.sign({ username: username }, JWT_SECRET);
    return res.json({
      username: username,
      token: token,
    });
  } else {
    return res.status(400).send("Invalid credentials.");
  }
});

app.get("/me", auth, function (req, res) {
  const username = req.user.username;
  const user = users.find((user) => user.username == username);
  if (user) {
    res.json({
      username: username,
    });
  } else {
    res.status(400).send({
      token: "Unauthorized",
    });
  }
});

app.listen(3000);
