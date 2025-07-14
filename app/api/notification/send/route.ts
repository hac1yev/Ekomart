import { connectToDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import sql from 'mssql';

export async function POST(req: NextRequest) {
    const pool = await connectToDB();

    try {
        const { userId, title, description, type } = await req.json();
        const bearer = req.headers.get('Authorization');
        const cron_secret = bearer?.split(" ")[1] || "";

        if(cron_secret !== process.env.CRON_SECRET) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }        
        
        await pool.request()
            .input("userId", sql.Int, userId)
            .input("title", sql.NVarChar, title)
            .input("description", sql.NVarChar, description)
            .input("type", sql.NVarChar, type)
            .query(`
                INSERT INTO Notification (userId, title, description, type)
                VALUES (@userId, @title, @description, @type)
            `);

        return NextResponse.json({ message: 'Success' })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        pool.close();
    }
}