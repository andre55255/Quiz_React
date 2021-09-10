function verifyToken() {
    return function(req, res) {
        if (req.user) {
            return res.status(200).send({ message: 'Token valido!' });
        } else {
            return res.status(401).send({ error: "Authenticated failed" });
        }
    }
}

module.exports = {
    verifyToken
}