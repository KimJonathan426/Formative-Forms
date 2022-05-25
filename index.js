const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const { restart } = require("nodemon");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");

app.use(cookieParser())
app.use(express.urlencoded());
const csrfProtection = csrf({ cookie: true });


app.get("/", (req, res) => {
  res.render("index", {
    users
  });
});

app.get("/create", csrfProtection, (req, res) => {
  res.render("create-normal-user", { users, title: "User Form", csrfToken: req.csrfToken() })
})

const users = [
  {
    id: 1,
    firstName: "Jill",
    lastName: "Jack",
    email: "jill.jack@gmail.com"
  }
];

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
