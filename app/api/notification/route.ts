import { connectToDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import sql from 'mssql';
import { verifyJWTToken } from "@/lib/verifyToken";

export async function POST(req: NextRequest) {
    const pool = await connectToDB();

    try {
        const { userId,title,description,type } = await req.json();
        const bearer = req.headers.get('Authorization') || "";
        const accessToken = bearer.split(" ")[1];

        const isValidJwt = await verifyJWTToken(accessToken);

        if(!isValidJwt) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
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

        return NextResponse.json({ message: 'Successfully updated' });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        pool.close();
    }
}

export async function GET(req: NextRequest) {
    const pool = await connectToDB();

    try {
        const bearer = req.headers.get('Authorization') || "";
        const accessToken = bearer.split(" ")[1];

        const isValidJwt = await verifyJWTToken(accessToken);

        if(!isValidJwt) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        const result = await pool.request().query(`
            select * from Notification where userId = ${isValidJwt.userId}
        `);
        
        return NextResponse.json({ notifications: result.recordset }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        pool.close();
    }
}