const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();

//Item model
const User = require("../../model/User_model");

//Add a User @Route: /api/users
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  //validate
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
              expiresIn: 3600, //1hour
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  isAdmin: user.isAdmin
                },
              });
            }
          );
        });
      });
    });
  });
});


//Delete a User @Route: /api/users/:id
router.delete("/:id", (req, res) => {});

async function getAllOrders() {
    try {
        // Use Mongoose to find all orders
        const orders = await Order.find();
        return orders; // Return the array of orders
    } catch (error) {
        console.error('Error retrieving orders:', error);
        throw error; // Throw the error to handle it elsewhere
    }
}

// Retrieve all orders
router.get("/users/orders", async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
