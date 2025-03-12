const sql = require("mssql");
const { poolPromise } = require("../configs/database");
class SensorRepository {
    static async findAll(offset, size) {
        try {
            const pool = await poolPromise;
            const query = `
                SELECT * FROM data_sensor
                ORDER BY created_at DESC
                OFFSET @offset ROWS FETCH NEXT @size ROWS ONLY;
            `;
            const result = await pool.request()
                .input("offset", sql.Int, offset)
                .input("size", sql.Int, size)
                .query(query);
            return result.recordset;
        } catch (error) {
            throw new Error("Database query failed");
        }
    }

    static async countAll() {
        try {
            const pool = await poolPromise;
            const query = `SELECT COUNT(*) AS total FROM data_sensor;`;
            const result = await pool.request().query(query);
            return result.recordset[0].total;
        } catch (error) {
            throw new Error("Database count query failed");
        }
    }
}

module.exports = SensorRepository;