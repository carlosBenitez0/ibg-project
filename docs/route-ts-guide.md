# Guía de `route.ts`, CORS y por qué lo usamos en el versículo del día

## Qué problema teníamos

En el componente del versículo del día, el navegador intentaba hacer una petición directa a una API externa:

- `https://api.mymemory.translated.net`

La app se ejecuta en `http://localhost:3000`, así que el navegador detecta que la petición va a otro origen distinto. En ese momento entra en juego **CORS**.

El error aparecía porque el navegador esperaba que la API externa permitiera explícitamente peticiones desde `localhost:3000`, pero esa API no devolvía los headers necesarios. Entonces el navegador bloqueaba la respuesta.

## Qué es CORS

CORS significa **Cross-Origin Resource Sharing**.

Es una política de seguridad del navegador que controla si una página web puede leer respuestas que vienen de otro dominio, puerto o protocolo diferente.

Ejemplo de origen distinto:

- `http://localhost:3000`
- `https://api.mymemory.translated.net`

Aunque ambas URLs estén relacionadas con tu app, para el navegador son orígenes distintos.

### Idea importante

CORS no es un error de JavaScript como tal. Es una regla del navegador para proteger al usuario.

El servidor externo puede responder, pero si no incluye los headers correctos, el navegador no deja que tu código lea esa respuesta.

## Por qué `route.ts` soluciona el problema

La solución fue mover la llamada a la API externa a un **Route Handler** de Next.js.

En vez de hacer esto desde el navegador:

- navegador → MyMemory

ahora hacemos esto:

- navegador → tu propia ruta local en Next.js
- Next.js server → MyMemory
- Next.js server → navegador

### Por qué funciona

Porque el navegador solo ve una petición a tu propia aplicación, por ejemplo:

- `/api/translate`

Esa petición es same-origin, o al menos dentro del contexto de tu aplicación, así que no aplica el bloqueo de CORS hacia tu propio backend.

Después, el servidor de Next.js hace la petición externa. Esa petición ya no está limitada por la política CORS del navegador, porque se ejecuta del lado del servidor.

## Qué es exactamente `route.ts`

En Next.js App Router, un archivo llamado `route.ts` define un **endpoint HTTP**.

Es decir, no es un componente visual. No renderiza HTML. Su función es recibir solicitudes como:

- GET
- POST
- PUT
- DELETE

Y responder con datos.

En tu caso, `app/api/translate/route.ts` crea un endpoint en:

- `/api/translate`

## Cómo funciona `route.ts` en este proyecto

La lógica general es esta:

1. El hook `useDailyVerse` obtiene un versículo en inglés desde OurManna.
2. Luego llama a `/api/translate`.
3. El `route.ts` recibe el texto y la referencia.
4. El `route.ts` llama a MyMemory desde el servidor.
5. El `route.ts` traduce el verso y la referencia.
6. Devuelve un JSON al cliente.
7. El hook guarda ese resultado en el estado.

## Qué hace nuestro `route.ts` paso a paso

### 1. Lee los parámetros de la URL

El endpoint recibe algo como:

- `/api/translate?verse=...&reference=...`

Entonces el archivo toma esos valores con `searchParams`.

### 2. Traduce el verso

El verso sí se manda a MyMemory para traducirse al español.

### 3. Traduce la referencia por separado

La referencia no se manda a traducir como si fuera una frase normal, porque no es texto natural. Es una cita bíblica.

Por eso usamos un diccionario local para cambiar nombres como:

- `Proverbs` → `Proverbios`
- `Matthew` → `Mateo`
- `John` → `Juan`

Esto es más estable que depender de una API externa para algo tan estructurado.

### 4. Devuelve JSON

El `route.ts` responde con un objeto como este:

- `verse`
- `reference`

Ese JSON luego lo consume el hook.

## ¿Todas las `fetch` deberían ir en `route.ts`?

No.

Eso sería una mala práctica si se hace siempre sin criterio.

## Cuándo sí conviene usar `route.ts`

Usa `route.ts` cuando:

- necesitas ocultar una API key o credencial
- el navegador recibe un error de CORS
- quieres centralizar lógica de backend
- necesitas transformar o validar datos antes de enviarlos al cliente
- quieres evitar exponer una API externa directamente al frontend
- vas a combinar varias llamadas externas en un solo endpoint

## Cuándo no hace falta usar `route.ts`

No hace falta si:

- la API externa ya permite CORS
- no hay secretos que proteger
- la petición es simple y puede hacerse directamente desde el cliente
- no necesitas transformar la respuesta

## Buena práctica general

La regla más útil es esta:

- **Frontend**: usa `fetch` para datos que el navegador puede consumir directamente sin problemas.
- **Backend / `route.ts`**: usa `fetch` cuando necesites hacer una integración que el cliente no debería hacer por sí mismo.

En otras palabras, `route.ts` no reemplaza al frontend. Solo actúa como una capa intermedia cuando conviene.

## ¿Puede haber más de un `route.ts`?

Sí, totalmente.

De hecho, es normal tener muchos.

Cada carpeta dentro de `app/api/...` puede tener su propio `route.ts`.

Ejemplos:

- `app/api/translate/route.ts`
- `app/api/users/route.ts`
- `app/api/contact/route.ts`
- `app/api/auth/login/route.ts`

Cada uno representa una ruta distinta.

## Cómo se organizan

La estructura del archivo define la URL.

Por ejemplo:

- `app/api/translate/route.ts` → `/api/translate`
- `app/api/auth/login/route.ts` → `/api/auth/login`

Esto permite separar responsabilidades.

## ¿Es bueno tener muchos `route.ts`?

Sí, si están bien organizados.

Es una muy buena práctica cuando:

- cada route hace una tarea concreta
- el código queda fácil de mantener
- no metes demasiada lógica en un solo endpoint

Lo que no conviene es convertir un `route.ts` en un archivo gigante que hace de todo.

## Por qué este enfoque soluciona CORS

Porque el problema de CORS ocurre cuando el **navegador** intenta leer una respuesta de otro origen.

Al mover la petición a `route.ts`:

- el navegador ya no habla con la API externa
- el navegador solo habla con tu app
- tu servidor hace la llamada externa internamente

Entonces el bloqueo del navegador desaparece.

## Qué ganamos además de evitar CORS

### 1. Mejor seguridad

No expones directamente la API externa desde el cliente.

### 2. Más control

Puedes modificar la respuesta antes de enviarla.

### 3. Mejor mantenimiento

Toda la lógica de integración queda en un solo lugar.

### 4. Mejor manejo de fallos

Si la API externa falla, puedes devolver un valor de respaldo sin romper la UI.

## Qué hace el hook `useDailyVerse`

El hook quedó como una capa de consumo de datos.

Su trabajo es:

- pedir el versículo diario
- llamar a tu endpoint local
- guardar `verse`, `reference`, `loading` y `error`
- devolver esos valores al componente

El hook no debería preocuparse por los detalles de CORS o por cómo se traduce la referencia. Eso ya quedó encapsulado en `route.ts`.

## Flujo mental correcto

Piensa así:

- el componente muestra la UI
- el hook maneja el estado y llama datos
- `route.ts` actúa como backend ligero
- la API externa solo vive detrás de ese backend

## Regla práctica para recordar

Si una API externa te da problemas de CORS, o no quieres que el cliente la vea directamente, muévela a un `route.ts`.

Si la API ya funciona bien desde el navegador y no hay secretos, puedes llamarla directo desde el frontend.

## En este proyecto, por qué fue buena idea hacerlo así

Porque el versículo del día necesita:

- obtener datos de una API externa
- traducir contenido
- evitar CORS
- devolver una estructura simple al componente

Eso encaja muy bien con un `route.ts`.

## Resumen final

- CORS bloqueaba la llamada directa del navegador a MyMemory.
- `route.ts` permitió mover esa llamada al servidor.
- El navegador ahora habla con tu propia ruta `/api/translate`.
- El servidor hace la petición externa sin CORS del navegador.
- `route.ts` no es para poner todas las fetch siempre, sino para casos donde aporta valor.
- Sí, puedes tener muchos `route.ts`.
- Es buena práctica usarlo para integrar APIs externas cuando hay CORS, secretos o transformación de datos.

## Idea corta para quedarte con lo esencial

`route.ts` es un endpoint del servidor dentro de Next.js. Sirve como intermediario entre el frontend y servicios externos. En este caso se usó para evitar CORS y para traducir de forma controlada el verso y la referencia.
