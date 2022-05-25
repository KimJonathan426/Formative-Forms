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
  res.render("create-normal-user", { title: "User Form", csrfToken: req.csrfToken() })
})

const validateUser = (req, res, next) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;
  const errors = [];

  if (!firstName) {
    errors.push("Please provide a first name.")
  }

  if (!lastName) {
    errors.push("Please provide a last name.")
  }

  if (!email) {
    errors.push("Please provide an email.")
  }

  if (!password) {
    errors.push("Please provide a password.")
  }

  if (password !== confirmedPassword) {
    errors.push("The provided values for the password and password confirmation fields did not match.")
  }

  req.errors = errors;
  next();
}


app.post("/create", validateUser, (req, res) => {
  const { firstName, lastName, email, password, confirmedPassword } = req.body;
  if (req.errors.length > 0) {
    res.render("create-normal-user", {
      title: "User Form",
      errors: req.errors,
      firstName,
      lastName,
      email,
      password,
      confirmedPassword
    })
    return;
  }

  const user = {
    id: users[users.length - 1].id + 1,
    firstName,
    lastName,
    email,
    password,
    confirmedPassword
  };

  // console.log(users[users.length - 1].id)

  users.push(user);
  res.redirect("/");
})


// Create Interesting
app.get("/create-interesting", csrfProtection, (req, res) => {
  res.render("create-interesting-user", { title: "Create Interesting User", csrfToken: req.csrfToken() })
})

app.post("/create-interesting")

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
