const router = require("express").Router();
const apiCategory = require("../api/category");
const verifyToken = require("../middlewares/verifyToken");

router.post("/new", verifyToken, apiCategory.newCategory());

router.get("/all", verifyToken, apiCategory.selectCategories());

router.put("/update", verifyToken, apiCategory.updateCategory());

router.delete("/deleteById/:id", verifyToken, apiCategory.removeCategoryById());

router.delete("/deleteByDescription/:category", verifyToken, apiCategory.removeCategoryByDescription());

module.exports = router