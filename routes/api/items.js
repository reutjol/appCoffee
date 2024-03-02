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

//Get category Items
//no need because we deleted category
// router.get("/category/:category", (req, res) => {
//   // console.log("cat id",req.params.category);
//   Item.find({ category: { $regex: req.params.category, $options: "i" } })
//     .then((item) => res.json(item))
//     .catch((err) => res.status(404).json({ success: false }));
// });

// Get named items
router.get("/name/:name", (req, res) => {
  Item.find({ name: { $regex: req.params.name, $options: "i" } })
    .then((item) => res.json(item))
    .catch((err) => res.status(404).json({ success: false }));
});

//Get named items within category
//no need because we deleted category
// router.get("/category/:category/name/:name", (req, res) => {
//   // console.log("cat id",req.params.category);
//   // console.log("name id",req.params.name);
//   Item.find({
//     $and: [
//       { category: req.params.category },
//       { name: { $regex: req.params.name, $options: "i" } },
//     ],
//   })
//     .then((item) => res.json(item))
//     .catch((err) => res.status(404).json({ success: false }));
// });

// Update specific Item
// not sure if needed !
router.put("/:id", auth, (req, res) => {
  const updateItem = {
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
    price: req.body.price,
    units: req.body.units,
    softDelete:req.body.softDelete
  };
  // console.log(updateItem);
  Item.findByIdAndUpdate({ _id: req.params.id }, updateItem, (err, update) => {
    if (err) res.status(500).send();
    else res.send(update);
  });
});

// Add an Item
// not sure if needed !

router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
    img: req.body.img,
    price: req.body.price,
    units: req.body.units,
  });
  newItem
    .save()
    .then((item) => res.json(item))
    .catch((err) => res.status(404).send(err));
});

// Hard Delete an Item
// not sure if needed !

router.delete("/:id", auth, (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
