const db = require("../database/db");

function newQuiz() {
    return function(req, res) {
        const { idUser, emailUser } = req.user;
        const { quiz, category } = req.body;

        if (!idUser && !emailUser) return res.status(401).send({ error: "Authenticated failed" });

        if (!quiz && !category) return res.status(400).send({ error: "Data not reported" });
        
        db.transaction(async trans => {
            try {
                const idCategory = await trans.select("*")
                .table("category")
                .where({ description: category });
                
                if (idCategory.length <= 0) return res.status(404).send({ error: "Categoria not found" });
                
                await trans.insert({
                    name: quiz,
                    id_category: idCategory[0].id,
                    id_user: idUser
                })
                .table("quiz")
                
                return res.status(201).send({ message: "Quiz created successfully" });
            } catch (err) {
                console.log(err);
                return res.status(400).send({ error: "Server internal error" });
            }
        });
    }
}

function deleteQuiz() {
    return function(req, res) {
        const { quiz, category } = req.query;
        const { idUser, emailUser } = req.user;
        
        if (!idUser && !emailUser) return res.status(401).send({ error: "Authenticated failed" });
        
        if (!quiz && !category) return res.status(400).send({ error: "Data not reported" });
        
        db.transaction(async trans => {
            try {
                const idCategory = await trans.select("*")
                                                .table("category")
                                                .where({ description: category });
                
                if (idCategory.length <= 0) return res.status(404).send({ error: "Categoria not found" });
                
                const idQuiz = await trans.select("*")
                                            .table("quiz")
                                            .where({
                                                name: quiz,
                                                id_category: idCategory[0].id,
                                                id_user: idUser
                                            });

                if (idQuiz.length <= 0) return res.status(404).send({ error: "Quiz not found" });

                await trans.select("*")
                            .table("quiz")
                            .where({ id: idQuiz[0].id })
                            .delete();

                return res.status(200).send({ message: "Quiz deleted successfully" });
            } catch (err) {
                console.log(err);
                return res.status(400).send({ error: "Server internal error" });
            }
        });
    }
}

function selectAllQuizes() {
    return function(req, res) {
        db.select([
            "quiz.id as idQuiz",
            "quiz.name as nameQuiz",
            "category.id as idCategory",
            "category.description as descriptionCategory",
            "users.id as idUser",
            "users.name as nameUser",
            "users.email as emailUser"
        ])
        .table("quiz")
        .innerJoin("category", "quiz.id_category", "category.id")
        .innerJoin("users", "quiz.id_user", "users.id")
        .then(data => {
            if (data.length <= 0) return res.status(404).send({ error: "Quiz not found" });

            return res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        });
    }
}

function selectQuizesByUser() {
    return function(req, res) {
        db.select([
            "quiz.id as idQuiz",
            "quiz.name as nameQuiz",
            "category.id as idCategory",
            "category.description as descriptionCategory",
            "users.id as idUser",
            "users.name as nameUser",
            "users.email as emailUser"
        ])
        .table("quiz")
        .innerJoin("category", "quiz.id_category", "category.id")
        .innerJoin("users", "quiz.id_user", "users.id")
        .where({ "quiz.id_user": req.user.idUser })
        .then(data => {
            if (data.length <= 0) return res.status(404).send({ error: "Quiz not found" });
    
            return res.status(200).send(data);
        })
        .catch(err => {
            console.log(err);
            return res.status(500).send({ error: "Internal server error" });
        });
    }

}

module.exports = {
    newQuiz,
    deleteQuiz,
    selectAllQuizes,
    selectQuizesByUser
}