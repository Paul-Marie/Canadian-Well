import {Document, Query} from 'mongoose';
import {RequestHandler} from 'express';

import * as createError from 'http-errors';

// paginated will generated a paginated view of a query's results
// it receives a function that returns a Mongoose query as argument, and has
// three query parameters:
//  - limit (integer) defines the maximum number of elements that are sent to
//    the client, and defaults to 10 if missing or invalid
//  - before (object ID) defines before which object ID to look for values,
//    sorted from most recent to oldest
//  - after (object ID) does the same thing in reverse
// before and after are  exclusive, and "after" will take priority
function paginated(queryBuilder: () => Query): RequestHandler {
    return async (req, res, next) => {
        let query = queryBuilder();
        let total = await queryBuilder().estimatedDocumentCount();
        let limit = parseInt(req.query.limit) || 10;
        let mode = 'start';

        if (req.query.after !== undefined) {
            query = query.sort('_id').gt('_id', req.query.after);
            mode = 'after';
        } else if (req.query.before !== undefined) {
            query = query.sort('-_id').lt('_id', req.query.before);
            mode = 'before';
        } else {
            query = query.sort('-_id');
        }

        let values = await query.limit(limit + 1).lean();

        if (!Array.isArray(values) || values.length === 0) {
            return next(createError(404));
        }

        let before = values.length > limit ? values[limit - 1]._id : null;
        let after = null;
        if (mode === 'after') {
            after = before;
            before = values[0]._id;
        } else if (mode === 'before') {
            after = values[0]._id;
        }

        if (values.length > limit)
            values.splice(-1, values.length - limit);
        res.status(200)
           .json({
                ok: true,
                values,
                before,
                after,
                total,
           });
    };
}

export default paginated;
