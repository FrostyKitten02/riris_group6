const express = require("express");
const bodyParser = require("body-parser");
const dbRoutes = require("./src/dbRoutes");
const cors = require("cors");

const app = express();
const PORT = 3000;

const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}


app.use(bodyParser.json());
app.use("/db", dbRoutes);
app.use(cors(corsOptions));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
