import getPool from "./getPool.js";

const testConexion = async () => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query("SELECT categoria FROM categorias");
    console.log(
      "Conexión exitosa. Categorías:",
      rows.map((row) => row.categoria)
    );
  } catch (error) {
    console.error("Error al conectar con Pinote:", error);
  }
};

testConexion();
