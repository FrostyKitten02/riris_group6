import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import dbRoutes from "./src/dbRoutes.js";
import cors from "cors";
import {verifyToken} from '@clerk/express'

const app = express();
const PORT = 3000;

app.use(async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const token = req.header("Authorization")?.replace("Bearer ", "")
  console.log("auth")
  if (token == null) {
    return res.status(403).send({error: "Missng auth"});
  }

  try {
    const verifiedToken = await verifyToken(token, {
      jwtKey : process.env.JWT_KEY
    })
    req.auth = {
      sessionId: verifiedToken.sid,
      userId: verifiedToken.sub
    }
  } catch (e) {
    console.error(e)
    return res.status(403).send({error: "Error validating session"})
  }

    next()
})

app.use(
    cors({
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: '*'
    })
);
app.use(bodyParser.json());
app.use("/api/db", dbRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
