import { jwtVerify } from "jose";

export async function verifyJWTToken(token: string) {
    const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
    
    try {
        const { payload } = await jwtVerify(token, jwtSecretKey);
        return payload;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function verifyRefreshToken(token: string) {
    const refreshSecretKey = new TextEncoder().encode(process.env.REFRESH_SECRET_KEY);

    try {
        const { payload } = await jwtVerify(token, refreshSecretKey);
        return payload;
    } catch (error) {
        console.log(error);
        return null;
    }
}