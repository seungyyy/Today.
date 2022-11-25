import {Request, Response, NextFunction } from 'express';

interface AsyncRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<any>;
}

export const asyncHandler = (handler: AsyncRequestHandler) => {
  return (async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await handler(req, res, next);
    } catch (error) {
      return next({"error": error });
    }
  });
}
