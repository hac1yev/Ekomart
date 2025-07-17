import { comparePassword } from "@/lib/comparePassword";
import { connectToDB } from "@/lib/connectToDB";
import { hashPassword } from "@/lib/hashPassword";
import { verifyJWTToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const pool = await connectToDB();

    try {   
        const { old_pswrd,new_pswrd } = await req.json();
        const bearer = req.headers.get('Authorization') || "";
        const accessToken = bearer.split(" ")[1];

        const isValidJwt = await verifyJWTToken(accessToken);

        if(!isValidJwt) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }
        
        const userResult = await pool.request().query(`
            select password from Users where userId = ${isValidJwt.userId}
        `);

        const { password: currentPassword } = userResult.recordset[0];
        
        const passwordIsValid = await comparePassword(old_pswrd, currentPassword);
            
        if(!passwordIsValid) {
            return NextResponse.json({ message: 'Password is not correct!' }, { status: 401 });
        }

        const hashedNewPassword = await hashPassword(new_pswrd);
        
        await pool
            .request()
            .input("userId", isValidJwt.userId)
            .input("password", hashedNewPassword)
            .query("UPDATE Users SET password = @password WHERE userId = @userId");
        
        return NextResponse.json({ message: "Password changed successfully" });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        pool.close();
    }
}