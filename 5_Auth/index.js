const express = require('express');
const app = express();
app.use(express.json());

let users = [];

function generateToken(){
    const options = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
        'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
        'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        '1', '2', '3', '4', '5', '6', '7', '8', '9'
      ];
      let token = '';
    for (let i = 0; i < 32; i++) {
        const randomIndex = Math.floor(Math.random() * options.length);
        token += options[randomIndex];
    }
    return token;      
}

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
    res.send("User signed up successfully");
})

app.post("/signin", function(req, res){
    const {username , password} = req.body;
    const foundUser = users.find(user => {
       return user.username == username && user.password == password
    });
    if(foundUser){
        const token = generateToken();
        foundUser.token = token;
        res.json({
            message : token
        })
    }else {
        res.status(400).send("Invalid Credentials..")
    }
})

app.listen(3000);