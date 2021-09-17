const router = require("express").Router();
const apiQuestion = require("../api/question");
const verifyToken = require("../middlewares/verifyToken");

router.post("/new", verifyToken, apiQuestion.newQuestion());

router.get("/all", verifyToken, apiQuestion.allQuestionsByQuizByUser());

module.exports = router;