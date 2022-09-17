const mongoose = require("mongoose");
const FollowModel = require("../../models/FollowModel");
const ObjectId = mongoose.Types.ObjectId;
const BaseRepo = require("../Repository/baseRepository");
const feeds = require("../../models/feeds");
const multer = require("multer");
const path = require("path");

module.exports = {
  addPost,
  addCommentToPost,
  getAllPosts,
  getMyFeeds,
};

async function addPost(req, res, next) {
  try {
    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "./ImgUploads");
        // cb(null, path.join(__dirname, "/ImgUploads/"));
      },
      filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
      },
    });

    const maxSize = 10 * 2000 * 2000;

    var upload = multer({
      storage: storage,
      limits: { fileSize: maxSize },
      fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(
          path.extname(file.originalname).toLowerCase()
        );

        if (mimetype && extname) {
          return cb(null, true);
        }

        cb(
          "Error: File upload only supports the " +
            "following filetypes - " +
            filetypes
        );
      },

      // mypic is the name of file attribute
    }).single("image");

    upload(req, res, async function (err) {
      if (err) {
        // ERROR occurred (here it can be occurred due
        // to uploading image of size greater than
        // 1MB or uploading different file type)
        return res.send(err);
      } else {
        console.log("userName=>", req.body.userName);
        // productsData.update({ imageId: req.file.filename }, { where: { id: 2 } });
        const data = await feeds.create({
          imageId: req.file.filename,
          userId: ObjectId(req.body.userId),
          caption: req.body.caption,
          userName: req.body.userName
        });

        console.log("data uploaded :", data);
        return res.status(200).json("post uploaded successfully");
        // SUCCESS, image successfully uploaded
        // res.send("Success, Image uploaded!");
      }
    });
  } catch (error) {
    console.log("error : ", error);
    return next(error);
  }
}

async function addCommentToPost(req, res, next) {
  try {
    const postId = req.body.postId;

    const Body = req.body.comments;
    const comment = await feeds.updateOne(
      { _id: postId },
      //  { comments: Body }
      {
        $push: {
          comments: Body,
        },
      }
    );
    console.log("here1");

    return res.status(200).json({ message: "comment done" });
  } catch (error) {
    return res.status(400).json({ message: "some error occured" });
  }
}

async function getAllPosts(req, res) {
  try {
    let query = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "feeds",
        },
      },

      // {
      //   $unwind: { path: "$feeds", preserveNullAndEmptyArrays: false },
      // },
      // {
      //   $unwind: { path: "$comments", preserveNullAndEmptyArrays: false },
      // },

      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "comments.senderId",
      //     foreignField: "_id",
      //     as: "send",
      //   },
      // },
      // {
      //   $unwind: { path: "$send", preserveNullAndEmptyArrays: false },
      // },

      // {
      //   $group: {
      //     _id: {
      //       id: "$_id",
      //       imageId: "$imageId",
      //       caption: "$caption",
      //       postedBy: "$feeds.name",
      //     },
      //     cooments: {
      //       $push: {
      //         senderId: "$comments.senderId",
      //         text: "$comments.text",
      //         commentBy: "$send.name",
      //       },
      //     },
      //   },
      // },

      // {
      //   $replaceRoot: {
      //     newRoot: {
      //       $mergeObjects: [
      //         {
      //           _id: "$_id.id",
      //           imageId: "$_id.imageId",
      //           caption: "$_id.caption",
      //           postedBy: "$_id.postedBy",
      //           comments: "$cooments",
      //         },
      //         {},
      //       ],
      //     },
      //   },
      // },
    ];

    let data = await BaseRepo.baseAggregate(feeds, query);
    return res.status(200).json({ data });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ error });
  }
}

async function getMyFeeds(req, res) {
  const id = ObjectId(req.params.userId);

  try {
    let query = [
      {
        $match: {
          From_id: id,
        },
      },

      {
        $lookup: {
          from: "feeds",
          localField: "To_id",
          foreignField: "userId",
          as: "post",
        },
      },

      {
        $unwind: { path: "$post", preserveNullAndEmptyArrays: false },
      },

      {
        $lookup: {
          from: "users",
          localField: "post.userId",
          foreignField: "_id",
          as: "user",
        },
      },

      {
        $unwind: { path: "$user", preserveNullAndEmptyArrays: false },
      },
      {
        $project: {
          postedBy: "$user.name",
          post: "$post",
        },
      },
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "post.comments.senderId",
      //     foreignField: "_id",
      //     as: "send",
      //   },
      // },

      // {
      //   $unwind: { path: "$send", preserveNullAndEmptyArrays: false },
      // },

      // {
      //   $group: {
      //     _id: {
      //       id: "$_id",
      //       imageId: "$imageId",
      //       caption: "$caption",
      //       postedBy: "$user.name",
      //     },
      //     cooments: {
      //       $push: {
      //         senderId: "$post.comments.senderId",
      //         text: "$post.comments.text",
      //         commentBy: "$send.name",
      //       },
      //     },
      //   },
      // },

      // {
      //   $replaceRoot: {
      //     newRoot: {
      //       $mergeObjects: [
      //         {
      //           _id: "$_id",
      //           imageId: "$imageId",
      //           caption: "$caption",
      //           postedBy: "$user.name",
      //           text: "$post.comments.text",
      //           //senderName: "$send.name",
      //         },
      //         {},
      //       ],
      //     },
      //   },
      // },
    ];

    let List = await BaseRepo.baseAggregate(FollowModel, query);
    console.log("here", List);
    return res.status(200).json({ List });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({ error });
  }
}
