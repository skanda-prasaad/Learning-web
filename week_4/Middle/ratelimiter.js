const express = require('express');
const app = express();
const PORT = 3000;

let numberOFRequestForUser = {};
setInterval(function(){
    numberOFRequestForUser = {};
},1000)

app.use(function(req, res, next){
    const userId = req.headers["user-id"];
    if(!userId){
        return res.status(400).send("Missing User Id.");
    }
    if(!numberOFRequestForUser[userId]){
        numberOFRequestForUser[userId] = 1;
    }else{
        numberOFRequestForUser[userId]++;
    }

    if(numberOFRequestForUser[userId] > 5){
        return res.status(400).send("Rate limit exceeded..");
    }

    next();
})

app.get("/user", function(req, res){
    res.status(200).json({name : 'john'});
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
