import { connectToDB } from "@/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const pool = await connectToDB();

  try {
    const url = req.url;
    const id = url.split("/").at(-2) || "";

    await pool.request().query(`
        UPDATE Products
        SET views = views + 1
        WHERE id = ${id}
    `);

    await pool.close();

    return NextResponse.json({ message: "Success" });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    pool.close();
  }
}
