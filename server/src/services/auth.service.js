import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

const SALT_ROUNDS = 10;

export const registerUser = async(email, password) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        const err = new Error("Email already registered");
        err.status = 409;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
        data: { email, password: hashedPassword },
    });

    return { id: user.id, email: user.email };
};

export const loginUser = async(email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        const err = new Error("Invalid email or password");
        err.status = 401;
        throw err;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        const err = new Error("Invalid email or password");
        err.status = 401;
        throw err;
    }

    const token = jwt.sign({ userId: user.id, email: user.email },
        process.env.JWT_SECRET, { expiresIn: "7d" }
    );

    return { token, user: { id: user.id, email: user.email } };
};