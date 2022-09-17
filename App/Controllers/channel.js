const { ObjectId } = require("mongodb");
const ChannelModel = require("../../models/ChannelModel");
const user = require("../../models/user");
const BaseRepo =  require("../Repository/baseRepository");

module.exports={
AddChannel,
DeleteChannel,
UpdateChannel,
GetJoinedChannels,
JoinChannel
}


async function AddChannel(req,res){
const body = req.body;

    try{
        const Channel = await ChannelModel.findOne({ChannelName:body.
            ChannelName});
            if(Channel){
                return res.status(400).json("Channel Name Already in Use");
            }
     const data = await BaseRepo.baseCreate(ChannelModel,body);

     return res.status(200).json("Channel Added");


    }catch(err){
console.log("Error=>",err);
 return res.status(400).json({message:err});

    }
}

async function DeleteChannel(req,res){
const param = ObjectId(req.params.ChannelId);

try{
    
 await ChannelModel.deleteOne({
    _id:param,
 })
  return res.status(200).json("Channel Deleted");

}catch(err){
    console.log("Error=>",err);
 return res.status(400).json({message:err});
}

}


async function UpdateChannel(req,res){
const body = req.body;
console.log(body);
const searchParams = {
    _id:ObjectId(body.id)
}
    try{
 
  await BaseRepo.baseUpdate(ChannelModel,searchParams,body);

return res.status(200).json("Updation Done");

    }catch(err){
        console.log("Error=>",err);
        return res.status(400).json({message:err});
    }
}


async function GetJoinedChannels(req,res){

    try{
 const ChannelList = await ChannelModel.find();

 return res.status(200).json({List:ChannelList});
    }catch(err){
        console.log("Error=>",err);
        return res.status(400).json({message:err});
    }
}


async function JoinChannel(req,res){

const UserId = req.body.userId;

const Channel= req.body.ChannelId;
try{
     
   await user.updateOne(
    {
_id:UserId
   },
   {
    $push: {
      ChannelsList:Channel,
    },
  }
    )

return res.status(200).json("Channel Added")
    }catch(err){
        console.log("Error=>",err);
        return res.status(400).json({message:err});
    }

}