const express = require("express");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Admin = require("../../model/Admin_model");
const Order = require('../../model/Order_model');

// Define a function to retrieve all orders
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
// Get all admins
// not sure if needed !
router.get("/", (req, res) => {
    Admin.find().then((admins) => res.json(admins));
});

// Add an admin
router.post("/", (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill in required details" });
    }
  
    Admin.findOne({ email }).then((admin) => {
      if (admin) return res.status(400).json({ msg: "Email already exists" });
  
      const newAdmin = new Admin({ name, email, password });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if (err) throw err;
          newAdmin.password = hash;
          newAdmin.save().then((admin) => {
            jwt.sign(
              {
                id: admin.id,
              },
              config.get("jwtSecret"),
              {
                expiresIn: 3600,
              },
              (err, token) => {
                if (err) throw err;
                res.json({
                  token,
                  admin: {
                    id: admin.id,
                    name: admin.name,
                    email: admin.email,
                  },
                });
              }
            );
          });
        });
      });
    });
});

// Retrieve all orders
router.get("/orders", async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
