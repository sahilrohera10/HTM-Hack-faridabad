const router = require("express").Router();
const auth = require("../App/Controllers/authContoller");
const feeds = require("../App/Controllers/feeds");
const Follow = require("../App/Controllers/Follow");
// const Follow = require('../App/Controllers/Follow')
const Channel = require("../App/Controllers/channel");
const payment = require("../App/Controllers/Payment");

const { chain } = require("lodash");

router.post("/registration", auth.register);
router.put("/UpdateProfile", auth.updateProfile);
router.delete("/DeleteProfile/:userId", auth.DeleteAccount);

//feeds

router.post("/addPost", feeds.addPost);
router.post("/addComment", feeds.addCommentToPost);
router.get("/getAllPosts", feeds.getAllPosts);
router.get("/getMyFeeds/:userId", feeds.getMyFeeds);

// router.post("/Follow", Follow.FollowSomeone);
// router.get("/MyFollowingListCount", Follow.MyFollowingListCount);
// router.get("/MyFollowingList/:userId", Follow.MyFollowList);
// router.get("/MyFollowersListCount", Follow.MyFollowersCount);
// router.get("/MyFollowersList", Follow.MyFollowersList);
// router.delete("/Unfollow", Follow.Unfollow);

router.post("/Follow", Follow.FollowSomeone);
router.get("/MyFollowingListCount/:userId", Follow.MyFollowingListCount);
router.get("/MyFollowingList", Follow.MyFollowList);
router.get("/MyFollowersListCount/:userId", Follow.MyFollowersCount);
router.get("/MyFollowersList/:userId", Follow.MyFollowersList);
router.delete("/Unfollow/:From_id/:To_id", Follow.Unfollow);

router.post("/AddChannel", Channel.AddChannel);
router.get("/GetJoinedChannels", Channel.GetJoinedChannels);
router.delete("/DeleteChannel/:ChannelId", Channel.DeleteChannel);
router.put("/UpdateChannel", Channel.UpdateChannel);
router.post("/JoinChannel", Channel.JoinChannel);

router.post("/initiatePayment", payment.initiatePayment);
router.post("/verifyPayment", payment.verifyPayment);
module.exports = router;
