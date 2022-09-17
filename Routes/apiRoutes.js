const router = require("express").Router();
const auth = require("../App/Controllers/authContoller");
const Follow = require('../App/Controllers/Follow')
const Channel = require("../App/Controllers/channel");
const { chain } = require("lodash");


router.post("/registration", auth.register);
router.put("/UpdateProfile", auth.updateProfile);
router.delete("/DeleteProfile/:userId", auth.DeleteAccount);


router.post("/Follow",Follow.FollowSomeone);
router.get("/MyFollowingListCount/:userId",Follow.MyFollowingListCount);
router.get("/MyFollowingList",Follow.MyFollowList);
router.get("/MyFollowersListCount/:userId",Follow.MyFollowersCount);
router.get("/MyFollowersList/:userId",Follow.MyFollowersList);
router.delete("/Unfollow/:From_id/:To_id",Follow.Unfollow);


router.post("/AddChannel",Channel.AddChannel);
router.get("/GetJoinedChannels",Channel.GetJoinedChannels);
router.delete("/DeleteChannel/:ChannelId",Channel.DeleteChannel);
router.put("/UpdateChannel",Channel.UpdateChannel);
router.post("/JoinChannel",Channel.JoinChannel);
module.exports = router;
