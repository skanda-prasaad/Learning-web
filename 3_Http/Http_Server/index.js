const express = require("express");
const app = express();
const fs = require("fs");
const path = require('path');
const PORT = 3000;

const todoFile = path.join(__dirname, 'todo.json');


app.use(express.json()); 

// GET tasks
app.get('/tasks', function(req, res) {
    fs.readFile(todoFile, "utf-8", function(err, data) {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.send('[]');
            }
            return res.send('Error reading file');
        }

        if (!data) {
            return res.send('[]');
        }

        try {
            const todos = JSON.parse(data);
            res.send(todos);
        } catch (parseErr) {
            return res.send('Error parsing JSON data');
        }
    });
});

// POST tasks
app.post('/tasks', function(req, res) {
    const { task } = req.body;

    if (!task) {
        return res.status(400).send('Bad Request: Task is required');
    }

    fs.readFile(todoFile, "utf-8", function(err, data) {
        let todos = [];
        if (!err && data) {
            try {
                todos = JSON.parse(data);
            } catch (parseErr) {
                return res.send('Error parsing existing data');
            }
        }

        todos.push({ task, completed: false });

        fs.writeFile(todoFile, JSON.stringify(todos, null, 2), function(err) {
            if (err) return res.send("Error Writing file");
            res.send("Task added successfully");
        });
    });
});

// DELETE tasks
app.delete('/tasks', function(req, res) {
    const { task } = req.body;

    // Check if task exists in the body
    if (!task) {
        return res.status(400).send('Bad Request: Task is required');
    }

    fs.readFile(todoFile, "utf-8", function(err, data) {
        if (err) {
            return res.send("Error reading the file");
        }

        let todos = [];
        if (data) {
            try {
                todos = JSON.parse(data);
            } catch (parseErr) {
                return res.send('Error parsing existing data');
            }
        }

        const updatedTodos = todos.filter(t => t.task !== task);

        if (updatedTodos.length === todos.length) {
            return res.send("Task not found");
        }

        fs.writeFile(todoFile, JSON.stringify(updatedTodos, null, 2), function(err) {
            if (err) return res.send("Error writing the file");
            res.send("Task deleted successfully");
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
