const express = require('express');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "random";
const app = express();
app.use(express.json());

let users = [];

app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password){
       return res.status(400).send("Username and password are required");
    }
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).send("User already signed up");
    }

    users.push({
        username : username,
        password : password
    })
    console.log(users);
    res.send("User signed up successfully");
})

app.post("/signin", function(req, res){
    const {username , password} = req.body;
    const foundUser = users.find(user => {
       return user.username == username && user.password == password
    });
    if(foundUser){
        const token = jwt.sign({
            username : username
        }, JWT_SECRET);

        // foundUser.token = token;
        res.json({
            token : token
        })
    }else {
        res.status(400).send("Invalid Credentials..")
    }
    console.log(users);
})

app.get("/me", function(req, res){
    const token = req.headers.authorization;
    console.log(token);
    const decodeinfo = jwt.verify(token, JWT_SECRET);
    const username = decodeinfo.username;
    const user = users.find(user => user.username == username);
    if(user){
        res.send({
            username : user.username,
            password : user.password
        })
    }else{
        res.status(400).send({
           token :  "Unauthorized"
        })
    }
})

app.listen(3000);