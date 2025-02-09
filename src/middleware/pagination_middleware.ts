import { NextFunction, Request, Response } from "express";

export function paginate(req: Request, _res: Response, next: NextFunction) {
  const { page = 1, limit = 10 }: { page?: number; limit?: number } = req.query;

  req.body.pagination = {
    page,
    limit,
    total: 0,
    pages: 0,
    offset: (page - 1) * limit,
  };

  return next();
}
