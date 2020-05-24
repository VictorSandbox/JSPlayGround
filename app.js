// Postman tutorial - Valetin Despa

const express = require("express");
const bcrypt = require("bcrypt");
const app = express();

const users = [];
app.use(express.json());

// https://stackoverflow.com/questions/23259168/what-are-express-json-and-express-urlencoded
app.get("/user", (req, res) => {
  res.status(200).json(users);
});

//https://www.martinstoeckli.ch/hash/en/hash_rainbow.php
//https://medium.com/@mridu.sh92/a-quick-guide-for-authentication-using-bcrypt-on-express-nodejs-1d8791bb418f
app.post("/users", (req, res) => {
  const user = { name: req.body.name, password: req.body.password };

  const saltRounds = 10;

  bcrypt
    .hash(req.body.password, saltRounds)
    .then(function (hashPassword) {
      // Store hash in your password DB.
      user.password = hashPassword;
      users.push(user);
      console.log(hashPassword);
      res.status(201).send(user);
    })
    .catch((err) => {
      console.log(err);
    });

  app.post("/users/login", (req, res) => {
    const user = users.find( user => (user.name = req.body.name))
    if (user == null) 
    res.status(400).send("user is not found")

    bcrypt
      .compare(req.body.password, user.password)
      .then(function (result) {
        if (result) {
          console.log("Password succesfully verified");
          res.send('Password succesfully verified')
        } else {
          console.log("Password is incorrect");
          res.send('Password is incorrect')
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send()
      });
  });
});

app.listen(3000);
