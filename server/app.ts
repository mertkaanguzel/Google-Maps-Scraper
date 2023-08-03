const express = require("express");
const app = express();
app.get("/", (req, res) => {
  console.log("ip is ", req.ip);
  res.send(req.ip);
});

app.listen(3000, () => {
  console.log(`App is listening on port 3000`);
});
