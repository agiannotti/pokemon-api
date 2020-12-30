require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

const API_TOKEN = process.env.API_TOKEN;

console.log(API_TOKEN);

function handleGetTypes(req, res, next) {
  res.json([
    `Bug`,
    `Dark`,
    `Dragon`,
    `Electric`,
    `Fairy`,
    `Fighting`,
    `Fire`,
    `Flying`,
    `Ghost`,
    `Grass`,
    `Ground`,
    `Ice`,
    `Normal`,
    `Poison`,
    `Psychic`,
    `Rock`,
    `Steel`,
    `Water`,
  ]);
}

function validateBearerToken(req, res, next) {
  const authVal = req.get("Authorization") || "";
  // verify bearer token header
  if (!authVal.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing Bearer token" });
  }
  //verify token matches our secret
  // authVal === 'Bearer my-secret'

  const token = authVal.split(" ")[1];

  if (token !== API_TOKEN) {
    return res.status(401).json({ message: "Invalid credential" });
  }
  //all validations passed move to next middleware in pipeline
  next();
}

app.get("/types", validateBearerToken, handleGetTypes);
app.get("/valid-types", handleGetTypes);

app.listen(8080, () => {
  console.log("Server listening at 8080");
});
