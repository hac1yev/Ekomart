import { connectToDB } from "@/app/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    const url = req.url;
    const id = url.split("/").at(-2) || "";

    const updatePool = await connectToDB();
    
    await updatePool.request().query(`
        UPDATE Products
        SET views = views + 1
        WHERE id = ${id}
    `);

    await updatePool.close();

    return NextResponse.json({ message: 'Success' });
}