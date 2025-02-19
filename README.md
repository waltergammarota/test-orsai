# Cuentos App

Esta aplicación consta de un backend desarrollado con Strapi y un frontend desarrollado con Vue.js. La aplicación permite gestionar y visualizar cuentos, incluyendo funcionalidades como votación y conteo de lecturas.

## Instalación

### Backend (Strapi)

1. Navega al directorio del backend:
   ```
   cd backend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Copia el archivo de ejemplo de variables de entorno:
   ```
   cp .env.example .env
   ```

4. Inicia el servidor de desarrollo:
   ```
   npm run develop
   ```

El backend estará disponible en `http://localhost:1337`.
Para acceder al panel de administración de Strapi, utiliza las siguientes credenciales:

- URL: http://localhost:1337/admin
- Email: jorge@orsai.org
- Contraseña: Borges2025

### Frontend (Vue.js)

1. Navega al directorio del frontend:
   ```
   cd frontend
   ```

2. Instala las dependencias:
   ```
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```
   npm run dev
   ```

El frontend estará disponible en `http://localhost:5173`.

## Tarea pendiente: Implementar conteo de lecturas

Para implementar el conteo de lecturas, se deben seguir estos pasos:

1. En el backend (Strapi):
   - Actualizar el modelo de `Story` para incluir un campo `readCount` de tipo entero.
   - Modificar el controlador de `Story` para incrementar el `readCount` cuando se accede a un cuento individual.
   - Asegurarse de que los permisos en Strapi permitan la actualización del campo `readCount`.

2. En el frontend (Vue.js):
   - Crear una nueva página para la visualización individual de cuentos.
   - Implementar un temporizador que, después de 5 segundos de visualización, envíe una solicitud al backend para incrementar el `readCount`.
   - Actualizar la lista de cuentos para mostrar el número de lecturas.

Nota: Asegúrate de revisar y ajustar los permisos en Strapi para permitir el acceso público a las operaciones necesarias.

## Script de Bootstrap

El script `bootstrap.js` en el backend se ejecuta cada vez que se inicia la aplicación Strapi. Este script se utiliza para realizar tareas de inicialización, como la creación de datos por defecto o la configuración inicial de la aplicación.

## Base de datos

La aplicación utiliza SQLite como base de datos por defecto. El archivo de la base de datos se encuentra en `.tmp/data.db`. Asegúrate de no eliminar este archivo si quieres mantener los datos entre reinicios del servidor.

## Variables de entorno

El archivo `.env.example` proporcionado es funcional y contiene las configuraciones básicas necesarias para ejecutar la aplicación. Puedes utilizarlo como punto de partida copiándolo a `.env` y ajustando los valores según sea necesario.

## Contribuciones

Las contribuciones son bienvenidas. Por favor, asegúrate de seguir las mejores prácticas de desarrollo y de documentar adecuadamente cualquier cambio o nueva funcionalidad.