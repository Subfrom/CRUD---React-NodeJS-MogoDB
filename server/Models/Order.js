const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "users",
    },
    orderItems: [
        {
            name: {
            type: String,
            required: true,
            },
            quantity: {
            type: Number,
            required: true,
            },
            price: {
            type: Number,
            required: true,
            }
        },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", orderSchema);