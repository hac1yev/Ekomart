import { connectToDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import sql from 'mssql';
import { verifyJWTToken } from "@/lib/verifyToken";

export async function POST(req: NextRequest) {
    const pool = await connectToDB();

    try {
        const { productId,userId,totalPrice,quantity } = await req.json();
        const bearer = req.headers.get('Authorization');
        const accessToken = bearer?.split(" ")[1] || "";

        const isValidJwtToken = await verifyJWTToken(accessToken);

        if(!isValidJwtToken) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }
        
        const hasProduct = await pool.request().query(`
            select id from Cart where userId = ${userId} and productId = ${productId}
        `);

        if(hasProduct.recordset.length === 0) {
            await pool.request()
                .input("productId", sql.Int, productId)
                .input("userId", sql.Int, userId)
                .input("quantity", sql.Int, quantity)
                .input("totalPrice", sql.Int, totalPrice)
                .query(`
                    insert into Cart values(@productId,@userId,@quantity,@totalPrice)
                `);
        }else {
            await pool.request()
                .input("productId", sql.Int, productId)
                .input("userId", sql.Int, userId)
                .input("quantity", sql.Int, quantity)
                .input("totalPrice", sql.Int, totalPrice)
                .query(`
                    UPDATE Cart
                    SET quantity = quantity + @quantity,
                        totalPrice = totalPrice + @totalPrice
                    WHERE productId = @productId AND userId = @userId
                `);
        }
    
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 501 });
    } finally {
        pool.close();
    }
}

export async function GET(req: NextRequest) {
    const pool = await connectToDB();

    try {
        const bearer = req.headers.get("Authorization");
        const accessToken =  bearer?.split(" ")[1] || "";

        const isValidJwtToken = await verifyJWTToken(accessToken);

        if(!isValidJwtToken) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

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

        return NextResponse.json({ cartProducts }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error }, { status: 501 });
    } finally {
        pool.close();
    }
}

export async function PUT(req: NextRequest) {
    const pool = await connectToDB();

    try {
        const { productId,userId,price,count_type } = await req.json();
        const bearer = req.headers.get("Authorization");
        const accessToken =  bearer?.split(" ")[1] || "";

        const isValidJwtToken = await verifyJWTToken(accessToken);

        if(!isValidJwtToken) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }
        
        if(count_type === 'increase') {
            await pool.request()
                .input("productId", sql.Int, productId)
                .input("userId", sql.Int, userId)
                .input("totalPrice", sql.Int, price)
                .query(`
                    UPDATE Cart
                    SET quantity = quantity + 1,
                        totalPrice = totalPrice + @totalPrice
                    WHERE productId = @productId AND userId = @userId
                `);
        }else{
            await pool.request()
                .input("productId", sql.Int, productId)
                .input("userId", sql.Int, userId)
                .input("totalPrice", sql.Int, price)
                .query(`
                    UPDATE Cart
                    SET quantity = quantity - 1,
                        totalPrice = totalPrice - @totalPrice
                    WHERE productId = @productId AND userId = @userId
                `);
        }

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        pool.close();
    }
}