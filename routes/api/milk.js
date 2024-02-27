var express = require("express");
var auth = require("../../middleware/auth");
var router = express.Router();

const Milk = require("../../model/Milk_model");


// get all milk types

router.get("/", (req, res) => {
    Milk.find()
      .sort({ date: -1 })
      .then((milk) => res.json(milk));
});


// get specific milk

router.get("/:id", (req, res) => {
    Milk.findById(req.params.id)
      .then((milk) => res.json(milk))
      .catch((err) => res.status(404).json({ success: false }));
});


// update specific milk
router.put("/:id", auth, (req, res) => {
  const updateMilk = {
    type: req.body.type,
    price: req.body.price,
    softDelete:req.body.softDelete
  };
  // console.log(updateItem);
  Milk.findByIdAndUpdate({ _id: req.params.id }, updateMilk, (err, update) => {
    if (err) res.status(500).send();
    else res.send(update);
  });
});


// add milk
router.post("/", auth, (req, res) => {
    const newMilk = new Milk({
      type: req.body.type,
      price: req.body.price,
    });
    newMilk
      .save()
      .then((milk) => res.json(milk))
      .catch((err) => res.status(404).send(err));
  });