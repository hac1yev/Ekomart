import { connectToDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const pool = await connectToDB();

    try {
        const bearer = req.headers.get("Authorization");
        const cron_secret =  bearer?.split(" ")[1] || "";

        if(cron_secret !== process.env.CRON_SECRET) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        const result = await pool.request().query(`
            SELECT 
                c.userId,
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
    } finally {
        pool.close();
    }
}
