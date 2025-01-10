import "dotenv/config";
import mysql from "mysql2/promise";

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

let pool;

const getPool = async () => {
  try {
    if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        timezone: "Z",
      });
      console.log("Realizada la conexión con la piscina de Pinote");
    }

    return await pool;
  } catch (error) {
    console.log(
      "Error al realizar la conexión con la piscina de Pinote:",
      error
    );
    throw error;
  }
};

export default getPool;
