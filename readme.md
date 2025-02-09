# 🚀 Biz API

**Biz API** es una aplicación backend desarrollada en Node.js con TypeScript, JWT, Prisma y Express. Proporciona endpoints para gestionar productos, órdenes e inventario, siguiendo los principios de **Clean Architecture** y utilizando **PostgreSQL** como base de datos.

---

## 🧠 **¿Por qué Clean Architecture?**

Elegí **Clean Architecture** para este proyecto porque:

1. **Separación de responsabilidades**: La arquitectura divide el código en capas (dominio, aplicación, infraestructura), lo que facilita la mantenibilidad y escalabilidad del proyecto.
2. **Independencia del framework**: Al desacoplar la lógica de negocio de frameworks como Express, el código es más portable y fácil de probar.
3. **Facilidad de pruebas**: Las capas están claramente separadas, lo que permite escribir pruebas unitarias y de integración de manera más eficiente.
4. **Escalabilidad**: La estructura modular permite agregar nuevas funcionalidades sin afectar el código existente.

---

## 🐘 **¿Por qué PostgreSQL en lugar de MongoDB?**

Opté por **PostgreSQL** en lugar de MongoDB por las siguientes razones:

1. **Relaciones complejas**: PostgreSQL es una base de datos relacional que maneja eficientemente las relaciones entre tablas (como productos, órdenes e inventario), algo que es más complicado en MongoDB.
2. **Consistencia de datos**: PostgreSQL garantiza la integridad referencial y la consistencia de los datos mediante transacciones ACID, lo que es crucial para un sistema de inventario y órdenes.
3. **Esquema definido**: A diferencia de MongoDB, PostgreSQL requiere un esquema definido, lo que ayuda a mantener la estructura y calidad de los datos.
4. **Prisma ORM**: Prisma funciona mejor con bases de datos relacionales como PostgreSQL, ofreciendo un sistema de tipos seguro y una API intuitiva para consultas complejas.

---

## 🛠️ **Tecnologías Utilizadas**

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **TypeScript**: Agrega tipos estáticos a JavaScript, mejorando la calidad y mantenibilidad del código.
- **Express**: Framework para construir APIs RESTful.
- **Prisma**: ORM moderno para interactuar con la base de datos.
- **PostgreSQL**: Base de datos relacional robusta y escalable.
- **Clean Architecture**: Estructura del proyecto basada en principios de diseño limpio.

---

## 🚦 **Endpoints Principales**

### Docs

- `GET /api/docs`: Obtener la documentación de la API.

### Auth

- `POST /api/auth/login`: Iniciar sesión.
- `POST /api/auth/register`: Registrar un nuevo usuario.

### Productos

- `GET /api/products`: Obtener todos los productos.
- `POST /api/products`: Crear un nuevo producto.
- `GET /api/products/:id`: Obtener los detalles de un producto.
- `PUT /api/products/:id`: Actualizar un producto.
- `DELETE /api/products/:id`: Eliminar un producto.

### Órdenes

- `GET /api/orders`: Obtener todas las ordenes.
- `POST /api/orders`: Crear una nueva orden con múltiples productos.
- `GET /api/orders/:id`: Obtener los detalles de una orden.
- `PUT /api/orders/:id`: Actualizar una orden.

### Inventario

- `POST /api/inventory`: Crear o actualizar el inventario de un producto.
- `GET /api/inventory/:productoId`: Obtener el inventario de un producto.
- `PUT /api/inventory`: Aumentar o disminuir el inventario de un producto.

---

## 🛠️ **Instalación**

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/biz-api.git
   cd biz-api
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno:

   ```bash
   cp .env.example .env
   ```

4. Conecta la base de datos:

   ```bash
   npm run prisma:push
   ```

5. Inicia el servidor:
   ```bash
   npm run dev
   ```

---
