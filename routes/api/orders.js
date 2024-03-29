var express = require("express");
var auth = require("../../middleware/auth");
var router = express.Router();

//Order model
const Order = require("../../model/Order_model");
const User = require("../../model/User_model");

// Get all orders for user id @Route: /api/orders
router.get("/:userid", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.isAdmin) {
      const orders = await Order.find().sort({ date: -1 });
      res.json(orders);
    } else {
      const orders = await Order.find({ "user.id": req.user.id }).sort({
        date: -1,
      });
      res.json(orders);
    }
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

function onNewOrder(order) {
  io.emit("newOrder", order); // שולחים את ההזמנה החדשה לכל הלקוחות המחוברים
}

// Add an Order
router.post("/", auth, (req, res) => {
  const newOrder = new Order({
    user: req.body.user,
    selected: req.body.selected,
    orderTotalAmount: req.body.orderTotalAmount,
    orderTotalQuantity: req.body.orderTotalQuantity,
  });

  newOrder
    .save()
    .then((order) => {
      // שלח את ההזמנה החדשה לכל הלקוחות המחוברים
      onNewOrder(order);
      res.json(order);
    })
    .catch((err) => res.status(404).json(err));
});

//update status of order
router.put("/:id", auth, async (req, res) => {
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: req.params.id },
    { status: req.body.status },
    { new: true }
  );
  if (!updatedOrder) {
    res.status(404).send({ message: "Order not found" });
  } else {
    res.send(updatedOrder);
  }
});

// Delete an order
router.delete("/:id", auth, (req, res) => {
  Order.findByIdAndRemove(req.params.id)
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
