import { connectToDB } from "@/app/lib/connectToDB";
import { verifyJWTToken } from "@/app/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const productId = req.url.split("/").at(-1);
        const bearer = req.headers.get("Authorization");
        const accessToken = bearer?.split(" ")[1] || "";

        const isValidAccessToken = await verifyJWTToken(accessToken);

        if(!isValidAccessToken) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const pool = await connectToDB();

        const userResult = await pool.request().query(`
            select userId from Users where email = '${isValidAccessToken.email}'    
        `);

        const { userId } = userResult.recordset[0];

        await pool.request().query(`
            delete from LikedProducts where userId = ${userId} and productId = ${productId}
        `);
        
        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        NextResponse.json({ error }, { status: 501 });
    }
}