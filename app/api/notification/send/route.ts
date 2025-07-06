import { connectToDB } from "@/app/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const pool = await connectToDB();

    try {
        const { userId, title, description, type } = await req.json();

        console.log("CRONNN: ", {
            userId,
            type,
            title,
            description
        });
        
        return NextResponse.json({ message: 'Success' })
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        pool.close();
    }
}