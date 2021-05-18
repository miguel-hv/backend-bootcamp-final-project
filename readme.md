# Comandos de NPM

* `npm run dev` Arrancar proyecto en modo desarrollo
* `npm run start` Arrancar proyecto en modo producción (no necesitáis usarlo)
* `npm run seed` Ejecuta el seed de la base de datos


# Pasos para Deploy
1. Instalar `npm i dotenv` y ejecutarlo en `index.js` y `db.js`.

Con dotenv crearemos nuestras variables de entorno (para no mostrarlas en el código). Dotenv las lee del archivo .env y las añade a nuestro servidor en ejecución.
```js
const dotenv = require('dotenv');
dotenv.config();
```

2. Crear archivo `.env` y añadirlo a `.gitignore`.
Aquí añadiremos todas las variables de entorno
```
    PORT=5000
    SESSION_SECRET=ASDASDASD
    DB_URL=ASDASDASD
    DB_URL_LOCAL=mongodb://localhost:27017/ft-mar-node-session-7
    CLOUDINARY_URL=ASDASDASD
```

3. Asegurar que en nuestro directorio `/public/uploads` existe un archivo vacío dentro. Esto hará que se suba la carpeta y Multer no devuelva un error al no encontrar el directorio.

4. Crear nuestro cluster en Mongo Atlass (ver notion)

5. Subida de imagenes con Cloudinary, añadiremos el middleware en `file.middleware.js` y lo utilizaremos **después** del middleware de multer.

6. Heroku
    - Crear app en Heroku
    - Añadir a heroku las variables de entorno
    - Loguearnos con su CLI
    - Añadir el remoto de Heroku
    - `git push herku master`

7. Comprobar que nuestra aplicación funciona
    - Comprobar que podemos guardar y leer de nuestra DB.
    - Que los archivos se suben correctamente
    - Que podemos loguear y desloguear de nuestra aplicación
    - Que se mantiene la cookie de sesión