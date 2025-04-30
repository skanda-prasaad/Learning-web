const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}];

const express = require('express');
const app = express();

app.get("/", function(req, res) {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let numberOfHealthy = 0;
    for (let i = 0; i < numberOfKidneys; i++) {
        if (johnKidneys[i].healthy) {
            numberOfHealthy += 1;
        }
    }
    const numberOfUnhealthy = numberOfKidneys - numberOfHealthy;
    res.json({
        kidneys: johnKidneys,
        totalKidneys: numberOfKidneys,
        healthyKidneys: numberOfHealthy,
        unhealthyKidneys: numberOfUnhealthy
    });
});

app.post("/", function(req, res) {
    
});

app.put("/", function(req, res) {
    // Implementation for PUT request
});

app.delete("/", function(req, res) {
    // Implementation for DELETE request
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
