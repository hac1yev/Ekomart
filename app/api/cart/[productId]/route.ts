import { connectToDB } from "@/app/lib/connectToDB";
import { verifyJWTToken } from "@/app/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const pool = await connectToDB();

  try {
    const url = req.url;
    const productId = url.split("/").at(-1);
    const bearer = req.headers.get("Authorization");
    const accessToken = bearer?.split(" ")[1] || "";

    const isValidJwtToken = await verifyJWTToken(accessToken);

    if (!isValidJwtToken) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    pool.request().query(`
        delete from Cart where productId = ${productId}
    `);

    return NextResponse.json({ message: "Successfully deleted!" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    pool.close();
  }
}
