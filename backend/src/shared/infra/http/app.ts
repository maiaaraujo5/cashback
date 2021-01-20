import 'reflect-metadata';

import express, {NextFunction, Response, Request} from 'express'
import cors from 'cors'
import {errors} from "celebrate";
import AppError from "@shared/errors/AppError";
import routes from "@shared/infra/http/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

export default app;