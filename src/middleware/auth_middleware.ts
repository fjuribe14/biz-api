import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/auth";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return next();
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).json({ error: "Token invalid or expired" });
      return next();
    }

    req.body.user = decoded;
    return next();
  } catch (error) {
    res.status(401).json({ error: "Token invalid or expired" });
    return next();
  }
}
