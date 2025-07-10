import { connectToDB } from "@/lib/connectToDB";
import { verifyJWTToken } from "@/lib/verifyToken";
import { NextRequest, NextResponse } from "next/server";

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
          select * from Users where userId = ${isValidJwt.userId}
      `);

      return NextResponse.json({ user: result.recordset[0] });
    } catch (error) {   
      return NextResponse.json({ error }, { status: 500 });
    }finally{
      pool.close();
    }
}

export async function PUT(req: NextRequest) {
  const pool = await connectToDB();

  try {
    const { firstname, lastname, phone } = await req.json();
    const bearer = req.headers.get('Authorization') || '';
    const accessToken = bearer.split(' ')[1];

    const decoded = await verifyJWTToken(accessToken);

    if (!decoded || !decoded.userId) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    await pool.request()
      .input('userId', decoded.userId)
      .input('firstname', firstname)
      .input('lastname', lastname)
      .input('phone', phone)
      .query(`
        UPDATE Users
        SET 
          phone = @phone,
          firstname = @firstname,
          lastname = @lastname
        WHERE userId = @userId
      `);

    return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    pool.close();
  }
}
