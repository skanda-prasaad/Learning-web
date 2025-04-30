const express = require('express');
const app = express();

let countError = 0;

app.get('/user', function(req, res){
    throw new Error("user not found");
    res.status.json({name : "john"});
})

app.use(function(err, req, res, next){
    res.status(404).send({});
    countError = countError + 1;
})

app.listen(3000);