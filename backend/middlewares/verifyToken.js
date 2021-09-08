const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.decode(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).send({ error: "Token invalid" });
    }
}