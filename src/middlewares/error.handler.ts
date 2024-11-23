import { Request, Response, NextFunction } from 'express';

export const internalErrorHandler = async (error: any, req: Request, res: Response, next: NextFunction): Promise<void> => {
    const outputError = {
        statusCode: 500,
        error: "Internal Server Error",
        message: "An unexpected error occurred",
    };

    if (!error.status || error.status >= 500) {
        console.error(error);
        res.status(500).json(outputError);
    } else {
        next(error);
    }
};