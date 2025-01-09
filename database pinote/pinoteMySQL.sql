DROP DATABASE IF EXISTS pinote;
CREATE DATABASE pinote;
USE pinote;

-- tablas independientes

CREATE TABLE usuarios (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE,
    contraseña VARCHAR(20) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    creado_en_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE imagenes (
	id INT PRIMARY KEY AUTO_INCREMENT,
    url TEXT NOT NULL,
    descripcion VARCHAR (250) NULL,
    subida_fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
	id INT PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR (50) NOT NULL UNIQUE
);

CREATE TABLE etiquetas (
	id INT PRIMARY KEY AUTO_INCREMENT,
    etiqueta ENUM ('publica', 'privada') NOT NULL DEFAULT 'privada'
);


-- tablas dependientes de una o más FK

CREATE TABLE notas (
	id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR (50) NOT NULL,
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