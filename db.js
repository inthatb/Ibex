import pkg from 'pg'
const { Pool } = pkg



const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgres://zloaciwpfqaqao:cd274a14a7509e267c3685ecf71311de73f7e01a4cad5734fe06dc821bbe56da@ec2-34-207-12-160.compute-1.amazonaws.com:5432/de858uub92jlgk`;

const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});
export default pool