const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;
const BaseRepo = require("../Repository/baseRepository");
const feeds = require("../../models/feeds");
const multer = require("multer");
const path = require("path");

module.exports = {
  addPost,
  addCommentToPost,
  getAllPosts,
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
        // productsData.update({ imageId: req.file.filename }, { where: { id: 2 } });
        const data = await feeds.create({
          imageId: req.file.filename,
          userId: ObjectId(req.body.userId),
          caption: req.body.caption,
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

      {
        $unwind: { path: "$feeds", preserveNullAndEmptyArrays: false },
      },

      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "comments.senderId",
      //     foreignField: "_id",
      //     as: "send",
      //   },
      // },

      // {
      //   $addFields: {
      //     items: {
      //       $map: {
      //         input: { $zip: { inputs: ["$comments", "$send"] } },

      //         in: { $mergeObjects: "$$this" },
      //       },
      //     },
      //   },
      // },

      // {
      //   $addFields: {
      //     itemsNext: {
      //       $map: {
      //         input: { $zip: { inputs: ["$items.name", "$items.text"] } },

      //         in: { $mergeObjects: "$$this" },
      //       },
      //     },
      //   },
      // },

      //  comments: [
      //     {
      //       // itemsNext: 1,
      //       name: "$items.name",
      //       text: "$items.text",
      //     },
      //   ],

      {
        $project: {
          _id: 1,
          imageId: 1,
          caption: 1,
          postedBy: "$feeds.name",
          // items: 1,
          // senderName: "$items.name",
          // text: "$items.text",
          // comments: [
          //   {
          //     // itemsNext: 1,
          //     name: "$items.name",
          //     text: "$items.text",
          //   },
          // ],
          comments: 1,
          // commentBy: "$send.name",
        },
      },
      // {
      //   $unwind: { path: "$senderName", preserveNullAndEmptyArrays: false },
      // },
      // {
      //   $unwind: { path: "$text", preserveNullAndEmptyArrays: false },
      // },
    ];

    let data = await BaseRepo.baseAggregate(feeds, query);
    return res.status(200).json({ data });
  } catch (error) {
    // console.log("error", error);
    return res.status(400).json({ error });
  }
}
