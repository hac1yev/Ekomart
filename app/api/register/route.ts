import { connectToDB } from "@/app/lib/connectToDB";
import { NextRequest, NextResponse } from "next/server";
import sql from "mssql";
import { hashPassword } from "@/app/lib/hashPassword";

export async function POST(req: NextRequest) {
    try {
        const { email,username,password,firstname,lastname,phone,birthday } = await req.json();
        const pool = await connectToDB();
        const hasEmailOrUsername = await pool.request().query(`
            SELECT email, username 
            FROM Users 
            WHERE email = '${email}' OR username = '${username}' 
        `);        
        
        if(hasEmailOrUsername.recordset.length > 0) {
            return NextResponse.json({ message: 'Email or username is already exist!' }, { status: 401 });
        }
        
        const hashedPassword = await hashPassword(password);

        await pool.request()
            .input("username", sql.VarChar, username)
            .input("email", sql.VarChar, email)
            .input("role", sql.VarChar, "user")
            .input("password", sql.VarChar, hashedPassword)
            .input("phone", sql.VarChar, phone)
            .input("birthday", sql.VarChar, birthday)
            .input("firstname", sql.VarChar, firstname)
            .input("lastname", sql.VarChar, lastname)
            .query(`
                insert into Users values(@username, @email, @role, @password, @phone, @birthday, @firstname, @lastname)    
            `);
        
        await pool.close();

        return NextResponse.json({ message: 'Your user has created!' });
    } catch (error) {        
        return NextResponse.json({ error });
    }
}