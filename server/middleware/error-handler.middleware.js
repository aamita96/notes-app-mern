export const NotFound = (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
};

export const ErrorHandler = (err, req, res, next) => {
    const status = err.status || err.statusCode || 500;
    // console.log(err); // can be used to track error stack
    res.status(status).json({
        message: err.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};