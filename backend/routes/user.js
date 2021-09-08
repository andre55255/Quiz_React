const router = require("express").Router();
const apiUser = require("../api/user");

router.post("/signUp", apiUser.signUp());

router.post("/signIn", apiUser.signIn());

module.exports = router;