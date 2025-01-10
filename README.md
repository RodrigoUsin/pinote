# pinote

Siguiendo las directrices de HaB he iniciado un proyecto sobre una App de Notas.

Día 1. 2025/01/09

- como primer punto he pensado en un nombre para la app, mezclando las palabras Pin (colocar) y Note (nota)
- el segundo paso hasido dirigirme a mi perfil de github, e iniciar un repositorio. Al mismo tiempo en loca hecreado una carpeta para el proyecto, la cual contiene a su vez una carpeta para la base de datos, otra para el back y otra para el front.
- seguidamente, sintuado en la carpeta raiz, he iniciado la consola de git y he copiado y ejecutado el siguiente contenido.

  echo "# pinote" >> README.md
  git init
  git add README.md
  git commit -m "first commit"
  git branch -M main
  git remote add origin git@github.com:RodrigoUsin/pinote.git
  git push -u origin main

  esto ha enlazado el repositorio de local con el hub.

- a continuación he empezado a redacción del presente documento.

Database:

- utilizando la herramienta de MySQL Workbench he iniciado la estructura inicial de la base de datos, guardada en el archivo pinoteMySQL
- en este momento tomé la decisión de usar el español para facilitarme la visión global, aunque en código obviaré el uso de tildes.
- según el ejercicio he de tener en cuenta tres tipos de usuario: admin, anónimo y usuario registrado. En la taba de usuarios sólo contemplaré el admin y el registrado, ya que el anónimo simplemente puede visitar la app, pero no interactuar. En el momento que quiera hacerlo le redirigirá a "Registro de usuario".
- también, leyendo las exigencias del ejercicio, he creado varias tablas, que he dividido en dos grupos, tablas independientes y tablas dependientes, estas últimas alojan una o más FK de otras tablas.
- independientes:
  ➖ usuarios -- almacena los datos de los usuarios registrados
  ➖ categorias -- para categorizar las notas
  ➖ etiquetas -- para determinar quién puede ver la nota
  ➖ imagenes -- para amacenar las imágenes que se adjuntes a las notas
- dependientes:
  ➖ notas -- recoge los títulos y cuerpos de las notas, así como las FK de los usuarios que las publican, la caregoria a la que pertenecen, las etiquetas de privacidad y las imágenes que se adjunten.
- tras definir y crear las tablas he usado la función del workbench para crear el diagrama, que se encuentra con el nombre pinoteEsquema
- para acabar voy a subir a la rama principal el trabajo de hoy.

Día 2. 2025/01/09

- he usado el método de programación de SQL para agregar datos a la tabla de usuarios, para introducir un administrador que en el futuro:

  USE pinote;

  INSERT INTO usuarios (
  email,
  contraseña,
  role
  ) VALUES (
  'rousind2@gmail.com',
  '00Ul8065??',
  'admin'
  );

- antes de empezar el proyecto en Node.js hay que incluir algunos datos más. En el ejercicio se pide que las categorías seas únicas, es decir que no se pueden repetir y que no se pueden crear por los usuarios que no tengan permisos de admin. Aprovechhando que podemos incluir varias categorías, he introducido un total de 9 de una sola vez:

animales, fotografía, personal, planes de viaje, recetas, ropa, rutinas fitness, sentimientos, tareas (en orden alfabético)

    USE pinote;

    INSERT INTO categorias (
    categoria
    ) VALUES (
    'personal'
    ),(
    'sentimientos'
    ),(
    'animales'
    ),(
    'fotografía'
    ),(
    'ropa'
    ),(
    'recetas'
    ),(
    'tareas'
    ),(
    'rutinas fitness'
    ),(
    'planes de viaje'
    );

- llegados a este punto creé el proyecto en Node.js. Para ello primero me situé en la carpeta de backend. He insertado en la consola de git dentro del VS USE pinote: cd "backend pinote". Y a continuación npm init -y, que intala el package.json.

- en dicho paquete agrego "type"="module".
- para manejarme correctamente con Node.js he considerado instlar los siguientes paquenes de npm:
  ➖ npm i express -> framework básico para gestionar rutas, middleware y controladores en Node.js
  ➖ npm i dotenv -> para la creación del entorno y permite cargar variables de un archivo .env a process.env para usarlas en el código
  ➖ npm i mysql2 -> cliente de MySQL para Node.js con enfoque en el rendimiento. Soporta declaraciones preparadas
  ➖ npm i date-fns -> proporciona el conjunto de herramientas más completa, pero simple y consistente para manipular las fechas de JavaScript en un navegador y Node.js
  ➖ npm i morgan -> logger HTTP para registrar solicitudes en tu servidor
  ➖ npm i nodemailer -> establece las funcionalidades para el uso de nodemailer, y que se puedan gestionar correos electrónicos
  ➖ npm i cors -> permite configurar el acceso a recursos desde diferentes dominios. Es crucial para aplicaciones API.
- como puedo hacer la instalacion de una sola vez, he procedido a escribir en la consola: npm i express dotenv mysql2 date-fns morgan nodemailer cors.
- en el larchivo package.json el apartado de dependencias queda así:

  "dependencies": {
  "cors": "^2.8.5",
  "date-fns": "^4.1.0",
  "dotenv": "^16.4.7",
  "express": "^4.21.2",
  "morgan": "^1.10.0",
  "mysql2": "^3.12.0",
  "nodemailer": "^6.9.16"
  }

- una vez instalados todos los paquetes he iniciado la compartimentación mediante carpetas del proyecto, y crado los archivos iniciales.
  - carpetas:
    ➖ src: para contener toda la lógica del proyecto relacionada con las siguientes:
    ➖ controllers
    ➖ database
    ➖ middlewares
    ➖ routes
    ➖ services
    ➖ utils
  - archivos:
    ➖ indexBackPinote.js
    ➖ server.js
    ➖ dotenv
    ➖ getPool.js
    ➖ initDB.js
    ➖ dotgitignore
- por el momento no he rellenado ninguno de los archivos.
- he empezado por dotenv, para comenzar con las variables de entorno, empezando con las relacionadas con la base de datos y las de gestion de email por medio de nodemailer, con el siguiente contenido:

DB:
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=

Node Mailer
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SECRET=

- a continuación el archigo dotgitignore, para que las subidas al repositorio ignoren los archivo más pesados o secretos. DEbido a esto he creado un archivo de texto con las claves sin el valor del archivo dotenv, lo llamé ejemdotenv.txt

- una vez completado el archivo dotenv con las claves y valores referidos a la DB toca crear el archivo getPool.js, con el siguiente código:

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

que nos permitirá importar la base de datos en aquellos módulos que sea requerida.

- el primer archivo en el que importado el getPool ha sido iniDB.js, que inicializa la base de datos, con el siguiente código:

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

- también he creado un archivo para testear la conexión, a a espera de configurar el archivo server
