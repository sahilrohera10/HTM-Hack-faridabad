const router = require("express").Router();
const auth = require("../App/Controllers/authContoller");
const Follow = require('../App/Controllers/Follow')

router.post("/registration", auth.register);


router.post("/Follow",Follow.FollowSomeone);
router.get("/MyFollowingListCount",Follow.MyFollowingListCount);
router.get("/MyFollowingList",Follow.MyFollowList);
router.get("/MyFollowersListCount",Follow.MyFollowersCount);
router.get("/MyFollowersList",Follow.MyFollowersList);
router.delete("/Unfollow",Follow.Unfollow);

module.exports = router;
