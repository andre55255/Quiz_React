const router = require("express").Router();
const api = require("../api/tokenValid");
const verifyToken = require("../middlewares/verifyToken");

router.post("/token", verifyToken, api.verifyToken());

module.exports = router;