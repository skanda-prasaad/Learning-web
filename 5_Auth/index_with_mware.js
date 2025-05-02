const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const JWT_SECRET = "randomname";
const users = [];

app.use(express.json());

function auth(req, res, next) {
  const token = req.headers.authorization;
  if(!token){
    res.json({
      message: "You are not logged in",
    });
  }
  const decodedinfo = jwt.verify(token, JWT_SECRET);
  if (decodedinfo.username) {
    req.user = decodedinfo;
    next();
  } else {
    res.json({
      message: "You are not logged in",
    });
  }
}

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
    (user) => user.username == username && user.password == password
  );
  if (user) {
    const token = jwt.sign(
      {
        username: username,
      },
      JWT_SECRET
    );
    res.json({
      username: username,
      token: token,
    });
  } else {
    return res.status(400).send("Invalid credentials..");
  }
  res.status(200).send("User signin successufull..");
});

app.get("/me", auth , function (req, res) {
  const username = req.user.usernmae;
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
