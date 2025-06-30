import { connectToDB } from "@/app/lib/connectToDB";
import { NextResponse } from "next/server";

export async function GET() {
  const pool = await connectToDB();

  try {
    const [categoriesResult, tagsResult, typesResult, statusResult] = await Promise.all([
      pool.request().query(`SELECT * FROM Categories ORDER BY value`),
      pool.request().query(`SELECT * FROM Tags ORDER BY value`),
      pool.request().query(`SELECT * FROM Types ORDER BY value`),
      pool.request().query(`SELECT * FROM Status ORDER BY value`)
    ]);

    return NextResponse.json({
      categories: categoriesResult.recordset,
      tags: tagsResult.recordset,
      types: typesResult.recordset,
      status: statusResult.recordset
    });

  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    pool.close();
  }
}