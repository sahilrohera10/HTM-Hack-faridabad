const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;


const ChannelSchema = new mongoose.Schema({
 
    ChannelName:{
        type:String,
        required:true
    },
    AdminId:{
        type:ObjectId,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    CreatedDate:{
        type:Date,
        default:Date.now()
    }


 });
   
  

  module.exports = mongoose.model("ChannelModel", ChannelSchema);

