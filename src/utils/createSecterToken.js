import jwt from "jsonwebtoken";

export async function createSecretToken(id) {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {
        expiresIn: 3 * 24 * 60 * 60,
    });
};