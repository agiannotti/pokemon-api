require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("common"));

const API_TOKEN = process.env.API_TOKEN;

console.log(API_TOKEN);

function handleGetTypes(_req, res, _next) {
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

app.get("/types", handleGetTypes);
app.get("/valid-types", handleGetTypes);

app.listen(8080, () => {
  console.log("Server listening at 8080");
});
