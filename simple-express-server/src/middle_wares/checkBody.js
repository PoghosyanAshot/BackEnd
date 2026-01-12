const isValidBody = (req, res, next) => {
    const { title, description } = req.body;

    if (
        !title ||
        !description ||
        typeof title !== "string" ||
        typeof description !== "string"
    ) {
        res.status(400).json({message: "Invalid data"});
    } else {
        next();
    }
};

module.exports = isValidBody;
