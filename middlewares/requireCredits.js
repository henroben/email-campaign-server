module.exports = (req, res, next) => {
    if(req.user.credits < 1) {
        // User has zero credits
        return res.status(403).send({
            error: "Please add credits."
        });
    }
    // User has credits, proceed to next middleware
    next();
};