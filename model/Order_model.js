const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  preferences: {
    type: Schema.Types.ObjectId,
    ref: 'preferences',
    required: true
  },
  orderTotalQuantity: {
    type: Number,
    required: true,
  },
  orderTotalAmount: {
    type: Number,
    required: true,
  },
  isCurrent: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
  }
});

module.exports = Order = mongoose.model("order", OrderSchema);
