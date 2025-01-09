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
  - usuarios -- almacena los datos de los usuarios registrados
  - categorias -- para categorizar las notas
  - etiquetas -- para determinar quién puede ver la nota
  - imagenes -- para amacenar las imágenes que se adjuntes a las notas
- dependientes:
  - notas -- recoge los títulos y cuerpos de las notas, así como las FK de los usuarios que las publican, la caregoria a la que pertenecen, las etiquetas de privacidad y las imágenes que se adjunten.
- tras definir y crear las tablas he usado la función del workbench para crear el diagrama, que se encuentra con el nombre pinoteEsquema
- para acabar voy a subir a la rama principal el trabajo de hoy.
