const router = require("express").Router();
const auth = require("../App/Controllers/authContoller");
const feeds = require("../App/Controllers/feeds");
const Follow = require("../App/Controllers/Follow");

router.post("/registration", auth.register);

//feeds

router.post("/addPost", feeds.addPost);
router.post("/addComment", feeds.addCommentToPost);
router.get("/getAllPosts", feeds.getAllPosts);
router.get("/getMyFeeds/:userId", feeds.getMyFeeds);

router.post("/Follow", Follow.FollowSomeone);
router.get("/MyFollowingListCount", Follow.MyFollowingListCount);
router.get("/MyFollowingList/:userId", Follow.MyFollowList);
router.get("/MyFollowersListCount", Follow.MyFollowersCount);
router.get("/MyFollowersList", Follow.MyFollowersList);
router.delete("/Unfollow", Follow.Unfollow);

module.exports = router;
