import { Request } from "express";

export const getParams = (req: Request) => {
  return {
    body: req.body,
    query: req.query,
    id: req.params.id,
  };
};

export const getPagination = ({ pagination, total }: { pagination: any; total: number }) => {
  const pages = Math.ceil(total / Number(pagination.limit));

  return {
    total,
    pages,
    page: Number(pagination.page),
    limit: Number(pagination.limit),
    offset: Number(pagination.offset),
  };
};
