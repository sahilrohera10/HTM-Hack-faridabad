const mongoose = require("mongoose");


const FollowSchema = new mongoose.Schema({
  From_id:{
    type:String,
    required:true,
    ref:'user'
  },
  To_id:{
    type:String,
    required:true,
    ref:'user'
  }
  });
  
  module.exports = mongoose.model("Follow", FollowSchema);
  