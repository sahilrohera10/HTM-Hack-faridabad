const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const FollowSchema = new mongoose.Schema({
  From_id: {
    type: ObjectId,
    required: true,
    ref: "user",
  },
  To_id: {
    type: ObjectId,
    required: true,
    ref: "user",
  },
});

module.exports = mongoose.model("Follow", FollowSchema);
