import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as cors from 'cors';

import current from "./routes/current";
import temperature from "./routes/temperature";
import renderError from "./middleware/error";

export const app = express();
const http = require("http").createServer(app);

export default (port: Number) =>
    new Promise((resolve, reject) => {
        try {
            http.listen(port, resolve);
        } catch (err) {
            reject(err);
        }
    });

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static("public"));

app.use("/temperatures", temperature);
app.use("/current", current);
app.use(renderError);
