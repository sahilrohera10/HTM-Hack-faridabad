const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const feedsSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: "user",
  },
  userName: {
    type: String,
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
      senderName: {
        type: String,
      },
      text: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("feeds", feedsSchema);
