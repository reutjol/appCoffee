const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require("../../model/User_model");

// Get all Users
// not sure if needed !
router.get("/", (req, res) => {
  User.find().then((users) => res.json(users));
});

// Add a User
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please fill in required details" });
  }

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "Email already exists" });

    const newUser = new User({ name, email, password });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            {
              id: user.id,
            },
            config.get("jwtSecret"),
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

// Delete a User
// not sure if needed !
router.delete("/:id", (req, res) => {});

module.exports = router;
