import { connectToDB } from "@/app/lib/connectToDB";
import { verifyJWTToken } from "@/app/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const bearer = req.headers.get('Authorization') || "";
        const accessToken = bearer.split(" ")[1];

        const isValidJwt = await verifyJWTToken(accessToken);

        if(!isValidJwt) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const pool = await connectToDB();

        const result = await pool.request().query(`
            select * from Users where userId = ${isValidJwt.userId}
        `);

        return NextResponse.json({ user: result.recordset[0] });

    } catch (error) {   
        return NextResponse.json({ error }, { status: 500 });
    }
}