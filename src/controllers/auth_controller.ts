import { Request, Response } from "express";
import authService from "../services/auth_service";

const authController = {
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      await authService.register({ email, password });
      res.status(201).json({ message: "User created successfully" });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token } = await authService.login({ email, password });
      res.status(200).json({ token });
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },
};

export default authController;
