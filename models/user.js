const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userMetaId: {
    type: ObjectId,
    ref: "userMeta",
  },
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
