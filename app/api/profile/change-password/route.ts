import { connectToDB } from "@/app/lib/connectToDB";
import { verifyJWTToken } from "@/app/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const pool = await connectToDB();

    try {   
        const { old_pswrd,new_pswrd } = await req.json();
        const bearer = req.headers.get('Authorization') || "";
        const accessToken = bearer.split(" ")[1];

        const isValidJwt = await verifyJWTToken(accessToken);

        if(!isValidJwt) {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        return NextResponse.json({ message: 'Successfully changed', old_pswrd, new_pswrd });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    } finally {
        pool.close();
    }
}