# 📱 Pokédex Frontend - React & DaisyUI

Interfaz moderna y reactiva para la gestión de entrenadores y sus Pokémon. Construida con **React** y estilizada con **Tailwind CSS**.

## 🚀 Tecnologías

- **React 18** (Vite)
- **React Router Dom 6** (Navegación)
- **Axios** (Peticiones HTTP)
- **Tailwind CSS** + **DaisyUI** (Framework de componentes)

## 🌟 Funcionalidades

- **Autenticación:** Sistema de Login con persistencia del token en `localStorage`.
- **Rutas Protegidas:** Componente `PrivateRoute` para evitar accesos no autorizados.
- **CRUD Completo:** Interfaz para listar, añadir, editar (con gestión de tipos) y borrar Pokémon.
- **Diseño Responsivo:** Adaptado a cualquier pantalla gracias a Tailwind.
- **Intercepción de Peticiones:** Configuración de Axios para inyectar automáticamente el token JWT en las cabeceras.

## 📂 Estructura de Carpetas

- `/src/api`: Configuración de Axios con interceptores.
- `/src/context`: Contexto de autenticación global.
- `/src/pages`: Vistas principales (Home, Pokedex, Login, Edit/Add).
- `/src/components`: Componentes reutilizables (Navbar, PrivateRoute).

## ⚙️ Instalación

1. `npm install` para instalar dependencias.
2. Configura el `baseURL` en `axiosConfig.js` apuntando a tu backend (8080).
3. `npm run dev` para lanzar el servidor de desarrollo.
