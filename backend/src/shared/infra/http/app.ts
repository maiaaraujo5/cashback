import 'reflect-metadata';

import express, {NextFunction, Response, Request} from 'express'
import 'express-async-errors';
import cors from 'cors'
import {errors} from "celebrate";
import AppError from "@shared/errors/AppError";
import routes from "@shared/infra/http/routes";
import {createConnection} from "typeorm";
import "@shared/container"


createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({
        status: 500,
        message: 'Internal server error',
    });
});

export default app;