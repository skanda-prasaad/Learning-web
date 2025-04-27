const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const PORT = 3001;

const todoFile2 = path.join(__dirname, "todo2.json");
const usersFile = path.join(__dirname, "user.json");

app.use(express.json());

/// Sign up route ::

app.post("/signup", function (req, res) {
  const { user, password } = req.body;

  if (!user || !password) {
    return res.status(400).send("Username and password are required");
  }
  fs.readFile(usersFile, "utf-8", function (err, data) {
    let users = [];
    if (err) {
      return res.send("Error reading file");
    }
    if (!err) {
      users = JSON.parse(data);
    }
    if (users.find((user) => user.username === username)) {
      return res.send("Username already exists ...");
    }
    users.push({ username, password });
    fs.writeFile(usersFile, JSON.stringify(users, null, 2), (err) => {
      if (err) return res.status(500).send("Error saving user");
      res.status(201).send("User created successfully");
    });
  });
});

// Login Route :::

app.post("/login", function (req, res) {
  const { username, password } = req.body();
  if (!username || !password) {
    return res.status(400).send("Username and password is required");
  }
  fs.readFile(usersFile, function (err, data) {
    const users = [];
    if (!err) {
      users = JSON.parse(data);
    }
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (!user) {
      res.status(400).send("Invalid credentials");
    }
    res.send("Login Successfull");
  });
});

// Get task for specific user :::

app.get("/tasks", function (req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).send("username is required");
  }

  fs.readFile(todoFile2, function (err, data) {
    if (err) {
      return res.send("Error reading the file");
    }
    let tasks = [];
    try {
      tasks = JSON.parse(data);
    } catch (parseErr) {
      return res.send("Error parsing tasks data");
    }
    const userTask = tasks.filter((task) => task.username === username);
    res.send(userTask);
  });
});

// POST Task for specific user :::

app.post("/tasks", function (req, res) {
  const { username, task } = req.body;
  if (!username || !task) {
    res.status(400).send("Username and task is required");
  }
  fs.readFile(todoFile2, function (err, data) {
    if (err) {
      res.send("Error reading the file");
    }
    let tasks = [];
    try {
      tasks = JOSN.parse(data);
    } catch (parseErr) {
      return res.send("Error parsing tasks data");
    }
    let userTask = tasks.filter((t) => t.username === username);
    if (userTask.length === 0) {
      userTask = [{ username, task, completed: false }];
      tasks.push(...userTask);
    } else {
      userTask.push({ username, task, completed: false });
      tasks.map((task) => {
        if (task.username === username) {
          return { ...task, task: userTask };
        }
        return task;
      });
    }

    fs.writeFile(todoFile2, JSON.stringify(tasks, null, 2), function (err) {
      if (err) {
        return res.status(400).send("Error writing file");
      }
      res.send("task added Successfully");
    });
  });
});

// Delete task from a specific user :::

app.delete("/tasks", function (req, res) {
  const { username, task } = req.body;
  if (!username || !task) {
    return res.status(400).res("Username and tasks is required....");
  }
  let tasks = [];
  fs.readFile(todoFile2, "utf-8", function (err, data) {
    if (err) {
      res.send("Error reading file");
    }
    try {
        tasks = JOSN.parse(data);
      } catch (parseErr) {
        return res.send("Error parsing tasks data");
      }
  });
});
