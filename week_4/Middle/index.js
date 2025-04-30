const express = require("express");
const app = express();

/// Return a boolean if age is greater thean 14
function ageCheckMiddleware(req, res, next) {
  const age = req.query.age;
  if (age >= 14) {
    next();
  } else {
    res.status(411).json({ msg: "sorry You are not eligible...." });
  }
}
app.use(ageCheckMiddleware);

app.get("/ride1", function (req, res) {
  res.json({
    msg: "You are eligible to ride1...",
  });
});

app.get("/ride2", function (req, res) {
    res.json({
      msg: "You are eligible to ride2...",
    });
  });

app.listen(3000);
