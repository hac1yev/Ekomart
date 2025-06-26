import { connectToDB } from "@/app/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import sql from 'mssql';
import { verifyJWTToken } from "@/app/lib/verifyToken";

export async function POST(req: NextRequest) {
    try {
        const { productId,userId,totalPrice } = await req.json();
        const bearer = req.headers.get('Authorization');
        const accessToken = bearer?.split(" ")[1] || "";

        const isValidJwtToken = await verifyJWTToken(accessToken);

        if(!isValidJwtToken) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const pool = await connectToDB();
        
        const hasProduct = await pool.request().query(`
            select id from Cart where userId = ${userId} and productId = ${productId}
        `);

        if(hasProduct.recordset.length === 0) {
            await pool.request()
                .input("productId", sql.Int, productId)
                .input("userId", sql.Int, userId)
                .input("quantity", sql.Int, 1)
                .input("totalPrice", sql.Int, totalPrice)
                .query(`
                    insert into Cart values(@productId,@userId,@quantity,@totalPrice)
                `);
        }else {
            await pool.request()
                .input("productId", sql.Int, productId)
                .input("userId", sql.Int, userId)
                .input("totalPrice", sql.Int, totalPrice)
                .query(`
                    UPDATE Cart
                    SET quantity = quantity + 1,
                        totalPrice = totalPrice + @totalPrice
                    WHERE productId = @productId AND userId = @userId
                `);
        }
    
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 501 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const bearer = req.headers.get("Authorization");
        const accessToken =  bearer?.split(" ")[1] || "";

        const isValidJwtToken = await verifyJWTToken(accessToken);

        if(!isValidJwtToken) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const pool = await connectToDB();

        const result = await pool.request().query(`
            SELECT 
                c.productId, 
                p.image, 
                p.title, 
                p.price, 
                quantity,
                totalPrice
            FROM Cart c
            INNER JOIN Products p ON c.productId = p.id
        `);

        const cartProducts = result.recordset;

        return NextResponse.json({ cartProducts });

    } catch (error) {
        return NextResponse.json({ error }, { status: 501 });
    }
}