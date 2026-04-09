# 📝 Diario de Prompts - Proyecto Pokédex

Este documento detalla la interacción con la IA para resolver los retos técnicos más complejos del proyecto. No se trata solo de generar código, sino de dirigir la solución técnica.

## 1. Gestión de Relaciones Complejas (ManyToMany)

**Reto:** Hibernate lanzaba errores de bucle infinito y colecciones no inicializadas al intentar guardar los tipos de un Pokémon.
**Prompt destacado:**

> "No me deja guardar los datos si selecciono un tipo, Hibernate da un error de 'Detaching an uninitialized collection'. ¿Cómo puedo limpiar la lista de tipos en el Service y volver a cargar los tipos reales de la base de datos antes de guardar para que Hibernate no se líe?"

**Resultado:** Implementación de `@Transactional` y una lógica de `clear()` y `addAll()` con búsqueda de entidades "manejadas" por el EntityManager.

## 2. Experiencia de Usuario y Estilos (UI/UX)

**Reto:** Los tipos de Pokémon no se leían correctamente debido al modo oscuro de DaisyUI y el contraste con el fondo.
**Prompt destacado:**

> "Funciona perfecto pero no se lee nada, los nombres de los tipos aparecen casi invisibles sobre el fondo gris. ¿Qué clases de Tailwind puedo usar para forzar un color oscuro que ignore el modo del navegador y sea más grande?"

**Resultado:** Ajuste de clases CSS de `label-text` a `font-bold text-gray-900 text-base` para garantizar legibilidad total.

## 3. Resolución de Ambigüedad en Endpoints

**Reto:** Spring Boot daba un error `IllegalStateException: Ambiguous handler methods` al coincidir las rutas por ID y por número de Pokédex.
**Prompt destacado:**

> "Me falla Java al intentar editar. Dice que hay métodos ambiguos para la misma URL. Tengo uno para buscar por ID y otro por número de Pokédex. ¿Cómo puedo renombrar las rutas en el Controller para que dejen de chocar?"

**Resultado:** Reestructuración de la API siguiendo estándares REST, diferenciando `/api/pokemon/{id}` de `/api/pokemon/numero/{numPokedex}`.

## 4. Lógica de Componentes de Edición

**Reto:** Crear un formulario que cargara datos previos y permitiera marcar/desmarcar tipos mediante checkboxes.
**Prompt destacado:**

> "¿Cómo puedo hacer que al entrar en Editar se carguen los datos del Pokémon y que los tipos que ya tiene aparezcan marcados en los checkboxes? Necesito que el estado de React guarde solo los IDs para luego mandarlos a Java."

**Resultado:** Creación del componente `EditPokemon.jsx` con carga en paralelo (Promise.all) y lógica de mapeo de IDs.

---

_Este proyecto demuestra que la IA es un copiloto potente, pero requiere de un desarrollador que entienda el flujo de datos y sepa diagnosticar el origen de los errores (400, 401, 500)._
