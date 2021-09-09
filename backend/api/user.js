const db = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const emailValid = require("../validation/email");
const passwordValid = require("../validation/password");

function signUp() {
  return function (req, res) {
    const { name, email, password } = req.body;
    if (name && email && password) {
      if (!emailValid(email)) {
        return res.status(400).send({ error: "Email invalid" });
      }
      if (!passwordValid(password)) {
        return res.status(400).send({ error: "Password invalid" });
      }
      db.select("*")
        .table("users")
        .where({ email })
        .then((user) => {
          if (user.length >= 1) {
            return res
              .status(409)
              .send({ error: "User already exists, enter another email" });
          }
          bcrypt.hash(password, 10, (err, hash) => {
            if (err || !hash)
              return res.status(500).send({ error: "Internal server error" });

            db.insert({
              name,
              email,
              password: hash,
            })
              .table("users")
              .then((_) =>
                res.status(201).send({ message: "User created successfully" })
              )
              .catch((err) => {
                console.log(err);
                return res.status(500).send({ error: "Internal server error" });
              });
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send({ error: "Internal server error" });
        });
    } else {
      return res.status(400).send({ error: "Data not reported" });
    }
  };
}

function signIn() {
  return function (req, res) {
    const { email, password } = req.body;
    if (email && password) {
      db.select("*")
        .table("users")
        .where({ email })
        .then((user) => {
          if (user.length < 1)
            return res.status(404).send({ error: "User not found" });

          bcrypt.compare(password, user[0].password, (err, result) => {
            if (err || !result)
              return res.status(401).send({ error: "Password incorrect" });

            const token = jwt.sign(
              {
                idUser: user[0].id,
                emailUser: user[0].email,
              },
              process.env.JWT_KEY,
              {
                expiresIn: "0.5h",
              }
            );

            return res.status(200).send({
              message: "User successfully logged in",
              idUser: user[0].id,
              nameUser: user[0].name,
              emailUser: user[0].email,
              token
            });
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).send({ error: "Internal server error" });
        });
    } else {
      return res.status(400).send({ error: "Data not reported" });
    }
  };
}

module.exports = {
  signUp,
  signIn,
};
