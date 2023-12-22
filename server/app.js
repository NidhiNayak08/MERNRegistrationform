const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/userSchema"); //importing students module
// const Router = require("./router/auth"); //importing router

const app = express();
const port = process.env.PORT || 3000;

dotenv.config({ path: "./config.env" });
require("./db/conn");

//Middleware
const middleware = (req, res, next) => {
  console.log("hello my middleware world");
  next();
};
app.use(middleware);

app.use(require("./router/auth"));

app.get("/", (req, res) => {
  res.send("home page");
});

app.get("/about", middleware, (req, res) => {
  res.send("about page");
});

app.get("/contact", (req, res) => {
  res.send("contact page");
});

app.get("/register", (req, res) => {
  res.send("login page");
});

app.get("/signup", (req, res) => {
  res.send("signup page");
});

app.listen(port, () => {
  console.log(`connection is setup at ${port}`);
});
