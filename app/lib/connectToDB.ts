import sql from "mssql";

export const dbConfig = {
    server: 'localhost',
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: false,
        trustedConnection: false
    }
} 

export const connectToDB  = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.log(error);
        throw new Error("Database connection failed");
    }
}