var express = require("express");
var auth = require("../../middleware/auth");
var router = express.Router();

//Order model
const Order = require("../../model/Order_model");

// Get all orders for user id @Route: /api/orders
router.get("/:userid", auth, (req, res) => {
  if (req.user.isAdmin) {
    Order.find()
      .sort({ date: -1 })
      .then(orders => res.json(orders))
      .catch(err => res.status(500).json({ error: 'An error occurred' }));
  } else {
  Order.find({'user.id':req.params.userid})
      .sort({ date: -1 })
      .then(orders => res.json(orders))
      .catch(err => res.status(500).json({ error: 'An error occurred' }));
  }
});





// Add an Order
router.post("/", auth, (req, res) => {
    // console.log("incoming order",req.body.order);
    // console.log("incoming user",req.body.user);
  const newOrder = new Order({
    order: req.body.order,
    user: req.body.user,
    orderTotalAmount:req.body.orderTotalAmount,
    orderTotalQuantity:req.body.orderTotalQuantity
  });
  newOrder.save().then((order) => res.json(order))
  .catch(err => res.status(404).json(err));
});

// Delete an order
router.delete("/:id", auth, (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
