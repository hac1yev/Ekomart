import { connectToDB } from "@/app/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import sql from 'mssql';
import { verifyJWTToken } from "@/app/lib/verifyToken";

export async function POST(req: NextRequest) {
    try {
        const { productId,userId } = await req.json();
        const bearer = req.headers.get('Authorization');
        const accessToken = bearer?.split(" ")[1] || "";

        const isValidJwt = await verifyJWTToken(accessToken);

        if(!isValidJwt) {
            return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
        }
        
        const pool = await connectToDB();

        await pool.request()
        .input("productId", sql.Int, productId)
        .input("userId", sql.Int, userId)
        .query(`
            insert into LikedProducts
            values(@productId, @userId)
        `);

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        return NextResponse.json({ error }, { status: 501 });        
    }
};

export async function GET(req: NextRequest) {
    try {
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

        const likedProductsResult = await pool.request().query(`
            select p.id, p.discount, p.image, p.title, p.price
            from LikedProducts lp inner join Products p
            on lp.productId = p.id
            where userId = ${userId}
        `);

        const favorites = likedProductsResult.recordset;

        return NextResponse.json({ message: 'Success', favorites });
    } catch (error) {
        return NextResponse.json({ error }, { status: 501 });
    }
}