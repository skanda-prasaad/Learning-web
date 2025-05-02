const express = require("express");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "kirat123123";

const app = express();
app.use(express.json());

const users = [];

function logger(req, res, next) {
  console.log(req.method + " request came");
  next();
}

// localhost:3000
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", logger, function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // Check if the user already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.json({
      message: "Username already exists",
    });
  }

  users.push({
    username: username,
    password: password,
  });

  res.json({
    message: "You are signed up",
  });
});

app.post("/signin", logger, function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  let foundUser = null;

  // Find user with matching credentials
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === username && users[i].password === password) {
      foundUser = users[i];
      break; // Stop once user is found
    }
  }

  if (!foundUser) {
    return res.json({
      message: "Credentials incorrect",
    });
  } else {
    const token = jwt.sign(
      {
        username: foundUser.username,
      },
      JWT_SECRET,
      { expiresIn: "1h" } // Optional expiration time for the token
    );
    res.header("jwt", token);
    res.json({
      token: token,
    });
  }
});

function auth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.json({
      message: "You are not logged in",
    });
  }

  try {
    const decodedData = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token data: ", decodedData); // Debug: Log decoded token

    if (decodedData.username) {
      req.username = decodedData.username;
      next();
    } else {
      res.json({
        message: "Invalid token",
      });
    }
  } catch (error) {
    console.log("Error verifying token: ", error); // Log any error with token verification
    res.json({
      message: "Invalid or expired token",
    });
  }
}

app.get("/me", logger, auth, function (req, res) {
  const currentUser = req.username; // Extract the username from the decoded JWT
  const foundUser = users.find((user) => user.username === currentUser);

  if (foundUser) {
    res.json({
      username: foundUser.username,
      password: foundUser.password,
    });
  } else {
    res.json({
      message: "User not found",
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
