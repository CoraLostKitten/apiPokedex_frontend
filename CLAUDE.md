# 🤖 Guía de Desarrollo - Pokedex Pro (UT6)

## 🛠 Tecnologías y Arquitectura

- **Frontend:** React + Vite (JavaScript).
- **Estilos:** Tailwind CSS.
- **Iconos:** Lucide-React.
- **Peticiones HTTP:** Axios (configurado centralizado).
- **Enrutamiento:** React Router Dom.

## 📁 Estructura de Carpetas (`src/`)

- `api/`: Configuración de Axios (`axiosConfig.js`) e interceptores JWT.
- `context/`: `AuthContext.jsx` (Estado global del usuario y Token).
- `pages/`: Pantallas completas (`Login.jsx`, `Pokedex.jsx`, `Entrenadores.jsx`).
- `components/`: Piezas reutilizables (`Navbar.jsx`, modales, tarjetas).

## 🗺️ Mapa de Conexión Backend (Spring Boot @ 8080)

- **Base de datos:** `pokedex_db` (MySQL).
- **Seguridad:** JWT en cabecera `Authorization: Bearer <token>`.

### Endpoints Detallados:

1. **Autenticación (`/auth`)**
   - `POST /login` -> Recibe `{email, password}`. Devuelve `{token, user: {email, roles}}`.
   - `POST /register` -> Recibe `{email, password, password2, roles}`.

2. **Pokémon (`/api/pokemons`)**
   - El ID principal es `numPokedex` (Long).
   - `GET /` -> Devuelve Page (paginado de Spring).
   - `POST /` -> Crear nuevo.
   - `PUT /{numPokedex}` -> Actualizar.
   - `DELETE /{numPokedex}` -> Borrar desvinculando tipos.

3. **Entrenadores (`/api/entrenadores`)**
   - `GET /` -> Lista completa paginada.
   - `GET /resumen` -> Lista con DTO (nombre y número de pokemons).

4. **Tipos (`/api/tipos`)**
   - `GET /` -> Obtener lista de tipos.

## 📏 Convenciones de Código

- Usar Hooks funcionales (`useState`, `useEffect`).
- El Token JWT se guarda exclusivamente en `localStorage` con la clave `token`.
- Diseño Responsive First usando clases de Tailwind.
