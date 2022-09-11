const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const feedsSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "user",
  },
  imageId: {
    type: String,
  },

  caption: {
    type: String,
    required: true,
  },
  comments: [
    {
      senderId: {
        type: ObjectId,
        required: true,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("feeds", feedsSchema);
