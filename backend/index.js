const express = require("express");
const bodyParser = require("body-parser");
const dbRoutes = require("./src/dbRoutes");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/api/db", dbRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
