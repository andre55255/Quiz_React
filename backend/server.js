const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");

const PORT = process.env.SERVER_PORT || 8081;
const user = require("./routes/user");
const category = require("./routes/category");
const quiz = require("./routes/quiz");
const question = require("./routes/question");
const verification = require('./routes/verification')

/* Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/* Routes */
app.use("/user", user);
app.use("/category", category);
app.use("/quiz", quiz);
app.use("/verification", verification);
app.use("/question", question);

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));