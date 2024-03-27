const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Object,
    required: true,
  },
  selected: {
    type: Array,
    required: true,
  },
  orderTotalQuantity: {
    type: Number,
    required: true,
    default: 0,
  },
  orderTotalAmount: {
    type: Number,
    required: true,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
    default: "new",
  },
});

module.exports = Order = mongoose.model("order", OrderSchema);
