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
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  fs.readFile(usersFile, "utf-8", function (err, data) {
    let users = [];
    if (err && err.code !== "ENOENT") {
      // If error is not file not found
      return res.status(500).send("Error reading user file");
    }
    if (!err) {
      try {
        users = JSON.parse(data);
      } catch (parseErr) {
        return res.status(500).send("Error parsing user data");
      }
    }

    if (users.find((user) => user.username === username)) {
      return res.status(400).send("Username already exists");
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
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  fs.readFile(usersFile, "utf-8", function (err, data) {
    if (err) {
      return res.status(500).send("Error reading user file");
    }

    let users = [];
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).send("Error parsing user data");
    }

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      return res.status(400).send("Invalid credentials");
    }

    res.send("Login Successful");
  });
});

// Get tasks for specific user :::
app.get("/tasks", function (req, res) {
  const { username } = req.body;

  if (!username) {
    return res.status(400).send("Username is required");
  }

  fs.readFile(todoFile2, "utf-8", function (err, data) {
    if (err && err.code !== "ENOENT") {
      return res.status(500).send("Error reading tasks file");
    }

    let tasks = [];
    if (!err) {
      try {
        tasks = JSON.parse(data);
      } catch (parseErr) {
        return res.status(500).send("Error parsing tasks data");
      }
    }

    const userTasks = tasks.filter((task) => task.username === username);
    res.json(userTasks);
  });
});

// POST Task for specific user :::
app.post("/tasks", function (req, res) {
  const { username, task } = req.body;

  if (!username || !task) {
    return res.status(400).send("Username and task are required");
  }

  fs.readFile(todoFile2, "utf-8", function (err, data) {
    if (err && err.code !== "ENOENT") {
      return res.status(500).send("Error reading tasks file");
    }

    let tasks = [];
    if (!err) {
      try {
        tasks = JSON.parse(data);
      } catch (parseErr) {
        return res.status(500).send("Error parsing tasks data");
      }
    }

    // Add new task as an individual object
    tasks.push({ username, task, completed: false });

    fs.writeFile(todoFile2, JSON.stringify(tasks, null, 2), function (err) {
      if (err) {
        return res.status(500).send("Error writing tasks file");
      }
      res.send("Task added successfully");
    });
  });
});

// Delete task from a specific user :::
app.delete("/tasks", function (req, res) {
  const { username, task } = req.body;

  if (!username || !task) {
    return res.status(400).send("Username and task are required");
  }

  fs.readFile(todoFile2, "utf-8", function (err, data) {
    if (err) {
      return res.status(500).send("Error reading tasks file");
    }

    let tasks = [];
    try {
      tasks = JSON.parse(data);
    } catch (parseErr) {
      return res.status(500).send("Error parsing tasks data");
    }

    const taskIndex = tasks.findIndex(
      (t) => t.username === username && t.task === task
    );

    if (taskIndex === -1) {
      return res.status(404).send("Task not found");
    }

    tasks.splice(taskIndex, 1);

    fs.writeFile(todoFile2, JSON.stringify(tasks, null, 2), (err) => {
      if (err) return res.status(500).send("Error writing tasks file");
      res.send("Task deleted successfully");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
