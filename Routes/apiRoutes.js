const router = require("express").Router();
const auth = require("../App/Controllers/authContoller");

router.post("/registration", auth.register);

module.exports = router;
