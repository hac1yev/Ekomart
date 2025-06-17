import { comparePassword } from "@/app/lib/comparePassword";
import { connectToDB } from "@/app/lib/connectToDB";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email,password } = await req.json();

        const pool = await connectToDB();
        
        const result = await pool.request().query(`
            select * from Users where email = '${email}'
        `);
            
        if(result.recordset.length === 0 || !result.recordset[0].email) {
            return NextResponse.json({ message: 'Email is not correct!' }, { status: 400 });
        }

        const hashedPassword = result.recordset[0].password;
        
        const isVerifyPassword = await comparePassword(password, hashedPassword);

        if(!isVerifyPassword) {
            return NextResponse.json({ message: 'Password is not correct!' }, { status: 400 });
        }

        const jwtSecretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        const refreshSecretKey = new TextEncoder().encode(process.env.REFRESH_SECRET_KEY);

        const accessToken = await new SignJWT({ 
            email,
            role: result.recordset[0].role
        })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(jwtSecretKey);

        const refreshToken = await new SignJWT({ 
            email,
            role: result.recordset[0].role
        })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('30d')
        .sign(refreshSecretKey);

        const response = NextResponse.json({ 
            userId: result.recordset[0].userId,
            username: result.recordset[0].username,
            role: result.recordset[0].role,
            accessToken,
        });

        response.cookies.set({
            name: 'refreshToken',
            value: refreshToken,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            path: '/',
            httpOnly: true,
            secure: true   
        });
    
        await pool.close();

        return response;
    } catch (error) {
        return NextResponse.json({ error });
    }
}