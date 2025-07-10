import { connectToDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import sql from 'mssql';
import { verifyJWTToken } from "@/lib/verifyToken";

export async function POST(req: NextRequest) {
    const pool = await connectToDB();

    try {
        const { productId,userId } = await req.json();
        const bearer = req.headers.get('Authorization');
        const accessToken = bearer?.split(" ")[1] || "";

        const isValidJwt = await verifyJWTToken(accessToken);

        if(!isValidJwt) {
            return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
        }
        
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
    } finally {
        pool.close();
    }
};

export async function GET(req: NextRequest) {
    const pool = await connectToDB();

    try {
        const bearer = req.headers.get("Authorization");
        const accessToken = bearer?.split(" ")[1] || "";

        const isValidAccessToken = await verifyJWTToken(accessToken);

        if(!isValidAccessToken) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }        

        const likedProductsResult = await pool.request().query(`
            select p.id, p.discount, p.image, p.title, p.price
            from LikedProducts lp inner join Products p
            on lp.productId = p.id
            where userId = ${isValidAccessToken.userId}
        `);

        const favorites = likedProductsResult.recordset;

        return NextResponse.json({ message: 'Success', favorites }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 501 });
    } finally {
        pool.close();
    }
}