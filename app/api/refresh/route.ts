import { connectToDB } from "@/app/lib/connectToDB";
import { verifyRefreshToken } from "@/app/lib/verifyToken";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const cookie = req.headers.get("cookie");

    const refreshToken = cookie?.split("=").at(-1) || "";

    const isValidRefreshToken = await verifyRefreshToken(refreshToken);
        
    if(isValidRefreshToken) {   
        const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);    
            
        const pool = await connectToDB();

        const result = await pool.request().query(`
            select email from Users where email = '${isValidRefreshToken.email}'
        `);        

        const newAccessToken = await new SignJWT({ 
            email: result.recordset[0].email,
            role: result.recordset[0].role
        })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(jwtSecretKey);
        
        await pool.close();

        return NextResponse.json({
            newAccessToken,
        }); 
    }

    return NextResponse.json({ message: 'Refresh token is not valid!' }, { status: 401 });
}