import prisma from "../config/db";
import { comparePassword, generateToken, hashPassword } from "../utils/auth";

class AuthService {
  async register({ email, password }: { email: string; password: string }) {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    return user;
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken(user);
    return { user, token };
  }
}

export default new AuthService();
