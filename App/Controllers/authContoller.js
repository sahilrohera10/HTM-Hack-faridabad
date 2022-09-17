const user = require("../../models/user");
const userMeta = require("../../models/userMeta");
const _ = require("lodash");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ObjectId = mongoose.Types.ObjectId;
const BaseRepo = require("../Repository/baseRepository");
const {
  generateJWT,
  checkMissingFields,
  isValidMongoObjectId,
} = require("../../utils/commonFunctions");

module.exports = {
  register,
  login,
  updateProfile,
  DeleteAccount
};

const userMetaFields = ["email", "phone"];
const userFields = ["name", "address", "role"];

async function register(req, res, next) {
  let body = req.body;

  let metabody = _.pick(body, userMetaFields);
  let userbody = _.pick(body, userFields);

  try {
    const searchParams = {
      email: body.email,
    };
    const isUser = await BaseRepo.baseDetail(userMeta, { searchParams });

    if (isUser) {
      return res.status(400).json({ message: "Already Registered" });
    }

    const salt = await bcrypt.genSalt(10);

    const Secpassword = await bcrypt.hash(body.password, salt);

    metabody.password = Secpassword;

    let userMetaData = await BaseRepo.baseCreate(userMeta, metabody);

    userbody.userMetaId = ObjectId(userMetaData._id);

    const userData = await BaseRepo.baseCreate(user, userbody);

    return res.status(200).json({ message: "Successfully Registered" });
  } catch (error) {
    return res.status(400).json({ message: "some error occured" });
  }
}

async function login(req, res, next) {}


async function updateProfile(req,res){
  const id = req.body.userId;
  const data = {
    name:req.body.name,
    address:req.body.address,
    role:req.body.role
  }
  const searchParams = {
    _id:id
  }
try{

 await BaseRepo.baseUpdate(user,searchParams,data)

return res.status(200).json("Successfully updated")

}catch(err){
  console.log("Error => ",err);
  return res.status(400).json({message:err});
}

}


async function DeleteAccount(req,res){

  const id = req.params.userId;
  const searchParams = {
    _id:id
  }

  try{
     const userdata = await BaseRepo.baseDetail(user,{searchParams});
     console.log("userdata=>",userdata.userMetaId);
     await BaseRepo.baseDeleteById(user,id);
     await BaseRepo.baseDeleteById(userMeta,userdata.userMetaId);
     
return res.status(400).json("Succesfully Deleted")
  }catch(err){
    console.log("Error=>",err);
    return res.status(400).json({message:err});
  }

}
