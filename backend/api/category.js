const db = require("../database/db");

function newCategory() {
    return function(req, res) {
        const { category } = req.body;
        if (category) {
            db.insert({
                description: category
            })
            .table("category")
            .then(_ => res.status(201).send({ message: "Category created successfully" }))
            .catch(err => {
                console.log(err);
                return res.status(500).send({ error: "Internal server error" });
            });
        } else {
            return res.status(400).send({ error: "Data not reported" });
        }
    }
}

function removeCategory() {
    return async function(req, res) {
        const { category } = req.query;
        if (category) {
            try {
                const idCategory = await db.select("*")
                                            .table("category")
                                            .where({ description: category });

                if (idCategory <= 0) return res.status(404).send({ error: "Category not found" });
    
                const quizes = await db.select("*")
                                        .table("quiz")
                                        .where({ id_category: idCategory[0].id });
                                    
                if (quizes.length >= 1) return res.status(409).send({ error: "Quiz linked to this category" });
    
                await db.select("*")
                        .table("category")
                        .where({ id: idCategory[0].id })
                        .delete();

                return res.status(200).send({ message: "Category deleted successfully" });
            } catch (err) {
                console.log(err);
                return res.status(400).send({ error: "Internal server error" });
            }
        } else {
            return res.status(400).send({ error: "Data not reported" });
        }
    }
}

function updateCategory() {
    return async function(req, res) {
        const { oldCategory, newCategory } = req.query;
        if (oldCategory && newCategory) {
            try {
                const idOldCategory = await db.select("*")
                                                .table("category")
                                                .where({ description: oldCategory });

                if (idOldCategory.length <= 0) return res.status(404).send({ error: "Category not found" });

                await db.update({ description: newCategory })
                        .table("category")
                        .where({ id: idOldCategory[0].id });

                return res.status(200).send({ message: "Category updated successfully" });
            } catch (err) {
                console.log(err);
                return res.status(400).send({ error: "Internal server error" });
            }
        } else {
            return res.status(400).send({ error: "Data not reported" });
        }
    }
}

function selectCategories() {
    return function(req, res) {
        db.select("*")
            .table("category")
            .then(categories => {
                if (categories.length < 1) return res.status(404).send({ error: "Categories not found" });

                return res.status(200).send(categories);
            })
            .catch(err => {
                console.log(err);
                return res.status(500).send({ error: "Internal server error" });
            });
    }
}

module.exports = {
    newCategory,
    removeCategory,
    updateCategory,
    selectCategories
}