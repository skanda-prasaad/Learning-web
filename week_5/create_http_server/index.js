const express = require("express");
const app = express();
const PORT = 3000;

app.use(function (req, res, next) {
    const a = parseFloat(req.query.a || req.params.a);
    const b = parseFloat(req.query.b || req.params.b);

  console.log(`a: ${a}, b: ${b}`);

  if (isNaN(a) || isNaN(b)) {
    return res
      .status(400)
      .send("Both values are required to perform some task");
  }
  req.a = a;
  req.b = b;
  next();
});

app.get("/add", function (req, res) {
  const ans = req.a + req.b;
  res.status(200).send(`Addition done : ${ans}`);
});

app.get("/mul/:a/:b", function(req, res){
    const ans = req.a * req.b;
    res.status(200).send(`Mul done : ${ans}`);
});

app.get("/div", function (req, res) {
  if (req.b == 0) return res.send("num can't be divisible by 0");
  const ans = req.a / req.b;
  res.status(200).send(`Div done : ${ans}`);
});
app.get("/sub", function (req, res) {
  const ans = req.a - req.b;
  res.status(200).send(`Sub done : ${ans}`);
});

app.listen(PORT, function () {
  console.log(`Listening at port : ${PORT}`);
});
