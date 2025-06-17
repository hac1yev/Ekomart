import { compare } from "bcrypt";

export const comparePassword = async (password: string, hashedPassword: string) => {
    const isPasswordCorrect = await compare(password, hashedPassword);

    return isPasswordCorrect;
};