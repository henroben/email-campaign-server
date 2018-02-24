module.exports = (req, res, next) => {
    if(!req.user) {
        // No user logged in, return error
        return res.status(401).send({
            error: "Please sign in."
        });
    }
    // User logged in, proceed to next middleware
    next();
};