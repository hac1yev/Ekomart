import { connectToDB } from "@/app/lib/connectToDB";
import { verifyJWTToken } from "@/app/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { star,reviewMessage,userId } = await req.json();

        const url = req.url;
        const productId = url.split("/").at(-2);

        const bearer = req.headers.get("Authorization");
        const accessToken = bearer?.split(" ").at(-1) || "";
    
        const isValidAccessToken = await verifyJWTToken(accessToken);
    
        if(!isValidAccessToken) {
            return NextResponse.json({ message: 'Forbidden!' }, { status: 403 });
        }    

        const pool = await connectToDB();

        const result = await pool.request().query(`
            select * from ProductRatings where productId = ${productId} and userId = ${userId}
        `);        

        if(result.recordset.length > 0) {
            await pool.request()
                .input('productId', productId)
                .input('userId', userId)
                .input('star', star)
                .input('reviewMessage', reviewMessage)
                .query(`
                    UPDATE ProductRatings
                    SET star = @star, reviewMessage = @reviewMessage
                    WHERE productId = @productId AND userId = @userId
                `);
        }else{
            await pool.request()
                .input('productId', productId)
                .input('userId', userId)
                .input('star', star)
                .input('reviewMessage', reviewMessage)
                .query(`
                    INSERT INTO ProductRatings (productId, userId, star, reviewMessage)
                    VALUES (@productId, @userId, @star, @reviewMessage)
                `);
        }
        
        await pool.close();

        return NextResponse.json({ message: 'Success' });
    } catch (error) {
        return NextResponse.json({ error }, { status: 501 });
    }
}