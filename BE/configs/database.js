const mssql = require("mssql");

require("dotenv").config();
const config = {
    user: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: process.env.SQL_DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true, 
    },
    pool: {
        max: 10, 
        min: 0, 
        idleTimeoutMillis: 30000, 
    },
};

// Tạo pool kết nối
const poolPromise = new mssql.ConnectionPool(config);

module.exports = {
    poolPromise,
};

module.exports.connect = async () => {
    try {
        await poolPromise.connect();
        console.log("Connected to the database successfully");
    } catch (error) {
        console.log("Database connection error:", error);
    }
};
