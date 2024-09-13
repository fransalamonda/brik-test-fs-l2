const errorHandler = (err, req, res, next) => {
    let status = err.status || 500;
    let message = err.name || "Internal Server Error";

    if (
        err.name === "SequelizeValidationError" ||
        err.name === "SequelizeUniqueConstraintError"
    ) {
        status = 400;
        message = err.errors ? err.errors[0].message : message;
    } else if (err.name === "Invalid Username/Password") {
        status = 401;
    } else if (err.name === "JsonWebTokenError") {
        status = 401;
    } else if (
        err.name === "Email is required" ||
        err.name === "Password is required"
    ) {
        status = 400;
    } else if (err.name === "Forbiden to Access") {
        status = 403;
    } else if (err.name === "Category not found") {
        status = 404;
    } else if (err.name === "Product not found") {
        status = 404;
    } else if (err.name === "Bad request") {
        status = 400;
    }

    res.status(status).json({
        status: false,
        message,
        data: err.errors ?? null,
    });
};

module.exports = errorHandler;
