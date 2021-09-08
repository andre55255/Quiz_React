const router = require("express").Router();
const apiCategory = require("../api/category");
const verifyToken = require("../middlewares/verifyToken");

router.post("/new", verifyToken, apiCategory.newCategory());

router.get("/all", verifyToken, apiCategory.selectCategories());

router.put("/update", verifyToken, apiCategory.updateCategory());

router.delete("/delete", verifyToken, apiCategory.removeCategory());

module.exports = router