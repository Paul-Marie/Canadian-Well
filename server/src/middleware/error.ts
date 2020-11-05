import {ErrorRequestHandler} from 'express';

// Error handling middleware
const renderError: ErrorRequestHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return;
    }

    let error = {
        ok: err.ok || false,
        status: err.status || 500,
        message: undefined,
    }

    if (err.expose) {
        for (let key in err) {
            switch (key) {
                case 'expose':
                case 'headers':
                case 'statusCode':
                    continue;
                default:
            }
        }
        error.message = err.message || 'Internal Server Error';
    }

    res.status(error.status)
       .set(err.headers || {})
       .json(error);
};

export default renderError;
