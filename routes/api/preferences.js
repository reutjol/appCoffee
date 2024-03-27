var express = require("express");
var auth = require("../../middleware/auth");
var router = express.Router();

//preferences model
const Preferences = require("../../model/Preferences_model");
const Item = require("../../model/Item_model");

// Get specific reference
router.get("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

//add a preference
router.post("/", auth, (req, res) => {
  const newPreferences = new Preferences({
    item: req.body.item,
    milk: req.body.milk,
    price: req.body.price,
    size: req.body.size,
    remarks: req.body.remarks,
    is_hot: req.body.is_hot,
  });
  newPreferences
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(404).send(err));
});

module.exports = router;
