import getPool from "./getPool.js";

const initDB = async () => {
  try {
    const pool = await getPool();

    await pool.query("DROP DATABASE IF EXISTS pinote");
    console.log("Base de datos eliminada.");

    await pool.query("CREATE DATABASE pinote");
    console.log("Base de datos pinote creada.");

    await pool.query("USE pinote");
    console.log("Base de datos seleccionada.");

    console.log("Creando tablas...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(50) NOT NULL UNIQUE,
        contraseña VARCHAR(20) NOT NULL,
        role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
        creado_en_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS imagenes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        url TEXT NOT NULL,
        descripcion VARCHAR(250),
        subida_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS categorias (
        id INT PRIMARY KEY AUTO_INCREMENT,
        categoria VARCHAR(50) NOT NULL UNIQUE
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS etiquetas (
        id INT PRIMARY KEY AUTO_INCREMENT,
        etiqueta ENUM('publica', 'privada') NOT NULL DEFAULT 'privada'
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS notas (
        id INT PRIMARY KEY AUTO_INCREMENT,
        titulo VARCHAR(50) NOT NULL,
        cuerpo TEXT NOT NULL,
        categoria_id INT,
        usuario_id INT,
        imagen_id INT,
        etiqueta_id INT,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
        FOREIGN KEY (categoria_id) REFERENCES categorias(id),
        FOREIGN KEY (imagen_id) REFERENCES imagenes(id),
        FOREIGN KEY (etiqueta_id) REFERENCES etiquetas(id),
        publicada_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Tablas creadas exitosamente!");
    process.exit(0);
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error);
    process.exit(1);
  }
};

initDB();
