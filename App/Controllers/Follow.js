const FollowModel = require("../../models/FollowModel");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const BaseRepo = require("../Repository/baseRepository");

module.exports = {
  FollowSomeone,
  MyFollowingListCount,
  MyFollowList,
  MyFollowersCount,
  MyFollowersList,
  Unfollow,
};

async function FollowSomeone(req, res, next) {
  const body = req.body;
  console.log("BODY=>", body);
  try {
    const data = await BaseRepo.baseCreate(FollowModel, body);
    console.log("DATA=>", data);
    return res.status(200).json({ message: `You Followed ${body.To_id} Id` });
  } catch (err) {
    console.log("Error=>", err);
    return res.status(400).json({ message: err });
  }
}

async function MyFollowingListCount(req, res) {
  const body = req.body;

  try {
    const searchParams = {
      From_id: body.From_id,
    };

    const data = await BaseRepo.baseGetCount(FollowModel, searchParams);
    console.log("Data Count =", data);

    return res
      .status(200)
      .json({ message: `You Followed ${data} no. of persons ` });
  } catch (err) {
    console.log("Error=>", err);
    return res.status(400).json({ message: err });
  }
}

async function MyFollowList(req, res) {
  const id = ObjectId(req.params.userId);
  console.log(id);

  try {
    let query = [
      {
        $match: {
          From_id: id,
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "To_id",
          foreignField: "_id",
          as: "list",
        },
      },

      {
        $unwind: { path: "$list", preserveNullAndEmptyArrays: false },
      },

      {
        $project: {
          name: "$list.name",
        },
      },
    ];
    // const List = await FollowModel.find({ From_id: body.From_id });
    let List = await BaseRepo.baseAggregate(FollowModel, query);
    console.log("here", List);
    return res.status(200).json({ List });
  } catch (err) {
    console.log("Error=>", err);
    return res.status(400).json({ message: err });
  }
}

async function MyFollowersCount(req, res) {
  const body = req.body;

  try {
    const searchParams = {
      To_id: body.To_id,
    };

    const data = await BaseRepo.baseGetCount(FollowModel, searchParams);
    console.log("Data Count =", data);

    return res
      .status(200)
      .json({ message: `You are Followed by ${data} no. of persons ` });
  } catch (err) {
    console.log("Error=>", err);
    return res.status(400).json({ message: err });
  }
}

async function MyFollowersList(req, res) {
  const body = req.body;
  console.log("Body = ", body);
  // const id = ObjectId(body.From_id);
  try {
    const List = await FollowModel.find({ To_id: body.To_id });
    //   const data = await BaseRepo.baseDetailById(FollowModel,searchParams.select);
    console.log("List=>", List);
    //    console.log("data=>",data);

    return res.status(200).json({
      message: `Your Followers List `,
      data: List,
    });
  } catch (err) {
    console.log("Error=>", err);
    return res.status(400).json({ message: err });
  }
}

async function Unfollow(req, res) {
  const body = req.body;
  try {
    await FollowModel.deleteOne({ From_id: body.From_id, To_id: body.To_id });

    return res.status(200).json({ message: ` Unfollow Successfully` });
  } catch (err) {
    console.log("Error=>", err);
    return res.status(400).json({ message: err });
  }
}
