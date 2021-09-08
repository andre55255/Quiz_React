const router = require("express").Router();
const apiQuiz = require("../api/quiz");
const verifyToken = require("../middlewares/verifyToken");

router.post("/new", verifyToken, apiQuiz.newQuiz());

router.delete("/delete", verifyToken, apiQuiz.deleteQuiz());

router.get("/all", verifyToken, apiQuiz.selectAllQuizes());

router.get("/allByUser", verifyToken, apiQuiz.selectQuizesByUser());

module.exports = router