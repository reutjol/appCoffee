var express = require("express");
var auth = require("../../middleware/auth");
var router = express.Router();

//Item model
const Item = require("../../model/Item_model");

// Get all Items
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// Get specific Item
router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

// Get named items
router.get("/name/:name", (req, res) => {
  Item.find({ name: { $regex: req.params.name, $options: "i" } })
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
