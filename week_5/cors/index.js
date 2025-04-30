const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.post("/sum", function (req, res) {
  const a = parseInt(req.body.a);
  const b = parseInt(req.body.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).send("Both values are required to run the server...");
  }

  const ans = a + b;
  res.status(200).json({
    answer: ans,
  });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
