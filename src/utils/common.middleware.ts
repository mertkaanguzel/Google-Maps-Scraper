import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validateInput = (schema: AnyZodObject, source: string) => (req: Request, res: Response, next: NextFunction) => {
  try {
    let data;
    if (source === 'body') {
      data = req.body;
    } else if (source === 'query') {
      data = req.query;
    } else if (source === 'params') {
      data = req.params;
    }

    schema.parse(data);
    next();
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
  const status = error.status || 500;
  res.status(status).send({
    error: JSON.parse(error.message),
  });
}

export { validateInput, errorHandler };