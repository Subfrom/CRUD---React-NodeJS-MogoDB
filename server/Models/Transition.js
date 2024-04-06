const moogoose = require('mongoose');

const transitionSchema = new moogoose.Schema(
  {
    userID: {
      type: moogoose.Schema.Types.ObjectId,
      ref: "users",
    },
    orderID: {
      type: moogoose.Schema.Types.ObjectId,
      ref: "orders",
    },
    response: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = moogoose.model("transitions", transitionSchema);
