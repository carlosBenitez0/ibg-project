# Guía rápida: `localStorage` + fechas en JavaScript moderno

Este documento te muestra:

- Cómo **guardar** y **leer** datos en `localStorage`
- Cómo trabajar con objetos usando `JSON`
- Buenas prácticas en **Next.js** (evitar errores en SSR)
- Cómo manejar fechas con APIs modernas (`Date`, `Intl`, y `Temporal`)

---

## 1) `localStorage`: guardar y traer datos

> `localStorage` solo existe en el navegador (cliente), no en el servidor.

### Guardar un valor simple

```js
localStorage.setItem('theme', 'dark');
```

### Traer un valor simple

```js
const theme = localStorage.getItem('theme'); // 'dark' o null
```

### Eliminar una clave

```js
localStorage.removeItem('theme');
```

### Limpiar todo

```js
localStorage.clear();
```

---

## 2) Guardar/leer objetos con `JSON`

`localStorage` guarda strings. Para objetos/arrays usa `JSON.stringify` y `JSON.parse`.

### Guardar objeto

```js
const userPrefs = {
  language: 'es',
  fontSize: 16,
  notifications: true,
};

localStorage.setItem('userPrefs', JSON.stringify(userPrefs));
```

### Leer objeto (seguro)

```js
function getFromStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

const userPrefs = getFromStorage('userPrefs', {
  language: 'es',
  fontSize: 14,
  notifications: false,
});
```

---

## 3) Patrón recomendado en Next.js (App Router)

En Next.js, si usas `localStorage`, el componente debe ser cliente (`'use client'`).

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function Example() {
  const [name, setName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('name');
    if (saved) setName(saved);
  }, []);

  const saveName = () => {
    localStorage.setItem('name', name);
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={saveName}>Guardar</button>
    </div>
  );
}
```

Tip: evita leer `localStorage` directamente durante el render inicial para prevenir problemas de hidratación.

---

## 4) Fechas en JavaScript moderno

## 4.1 Crear y manipular fechas (`Date`)

```js
const now = new Date();
const specific = new Date('2026-05-01T10:30:00Z');

// Sumar 7 días
const nextWeek = new Date(now);
nextWeek.setDate(nextWeek.getDate() + 7);
```

### Comparar fechas

```js
const isFuture = specific.getTime() > Date.now();
```

### Formato estándar para guardar

```js
const iso = now.toISOString(); // Recomendado para persistencia
```

---

## 4.2 Mostrar fechas al usuario con `Intl.DateTimeFormat`

`Intl` es la forma moderna y recomendada para formatear según idioma/zona horaria.

```js
const date = new Date();

const formatted = new Intl.DateTimeFormat('es-ES', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'America/Bogota',
}).format(date);

// Ejemplo: "viernes, 1 de mayo de 2026, 10:30"
```

---

## 4.3 Guardar fecha en `localStorage` (buena práctica)

Guarda en ISO, recupera y vuelve a `Date`:

```js
// Guardar
localStorage.setItem('lastVisit', new Date().toISOString());

// Leer
const raw = localStorage.getItem('lastVisit');
const lastVisit = raw ? new Date(raw) : null;
```

---

## 4.4 Temporal: la API moderna de fechas

`Temporal` es la nueva API estándar para fechas/tiempo (prevención de errores de zona horaria, cálculos precisos).

### Instalación

```bash
pnpm add @js-temporal/polyfill
```

### Importarlo en tu proyecto (Next.js)

En tu `app/layout.tsx` o en el archivo que inicia la app (lado cliente):

```tsx
'use client';

// Importar al inicio para que esté disponible globalmente
import '@js-temporal/polyfill';
import { useEffect, useState } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### Ejemplos prácticos con Temporal

#### Obtener hora actual con zona horaria

```js
import '@js-temporal/polyfill';

// Hora actual en Colombia
const now = Temporal.Now.zonedDateTimeISO('America/Bogota');
console.log(now.toString()); // 2026-05-01T10:30:45.123-05:00[America/Bogota]
```

#### Sumar/restar tiempo

```js
const now = Temporal.Now.zonedDateTimeISO('America/Bogota');

// Sumar 7 días
const nextWeek = now.add({ days: 7 });

// Sumar 2 horas y 30 minutos
const later = now.add({ hours: 2, minutes: 30 });

// Restar 1 mes
const lastMonth = now.subtract({ months: 1 });
```

#### Parsear un string ISO

```js
const iso = '2026-05-15T14:30:00Z';
const date = Temporal.Instant.from(iso).toZonedDateTime({
  timeZone: 'America/Bogota',
});

console.log(date.day); // 15
```

#### Comparar fechas

```js
const date1 = Temporal.Now.plainDateISO();
const date2 = date1.add({ days: 5 });

const isEarlier = Temporal.PlainDate.compare(date1, date2) < 0; // true
```

#### Obtener solo la fecha (sin hora)

```js
const plainDate = Temporal.Now.plainDateISO(); // 2026-05-01
console.log(plainDate.toString()); // "2026-05-01"
```

#### Obtener solo la hora (sin fecha)

```js
const plainTime = Temporal.Now.plainTimeISO(); // 10:30:45
```

### Guardar Temporal en localStorage

`Temporal` se serializa a ISO, perfecto para persistencia:

```js
// Guardar un ZonedDateTime
const now = Temporal.Now.zonedDateTimeISO('America/Bogota');
localStorage.setItem('lastCheck', now.toString());

// Recuperar y convertir de vuelta
const raw = localStorage.getItem('lastCheck');
const restored = Temporal.ZonedDateTime.from(raw);
console.log(restored.day); // acceso a propiedades
```

### Diferencia entre tipos de Temporal

| Tipo            | Ejemplo                                     | Uso                                   |
| --------------- | ------------------------------------------- | ------------------------------------- |
| `PlainDate`     | `2026-05-01`                                | Solo fecha, sin hora ni zona          |
| `PlainTime`     | `10:30:45`                                  | Solo hora                             |
| `PlainDateTime` | `2026-05-01T10:30:45`                       | Fecha + hora, sin zona                |
| `ZonedDateTime` | `2026-05-01T10:30:45-05:00[America/Bogota]` | Fecha + hora + zona (el más completo) |
| `Instant`       | `2026-05-01T15:30:45Z`                      | Momento exacto en UTC                 |

### Ventajas de Temporal vs Date

- ✅ Manejo **automático** de zonas horarias
- ✅ Cálculos más **precisos** (no hay ambigüedad)
- ✅ Métodos intuitivos: `.add()`, `.subtract()`, `.with()`
- ✅ Parsing robusto desde ISO
- ❌ `Date` : propenso a errores, confuso con timezones

---

## 5) Mini utilidades reutilizables

### Con `Date` e `Intl` (tradicional)

```js
export function setJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function setDateISO(key, date = new Date()) {
  localStorage.setItem(key, date.toISOString());
}

export function getDateISO(key) {
  const raw = localStorage.getItem(key);
  return raw ? new Date(raw) : null;
}
```

### Con Temporal (moderno)

```js
import '@js-temporal/polyfill';

export function setTemporalDate(key, date = Temporal.Now.plainDateISO()) {
  localStorage.setItem(key, date.toString());
}

export function getTemporalDate(key) {
  const raw = localStorage.getItem(key);
  return raw ? Temporal.PlainDate.from(raw) : null;
}

export function setTemporalZonedDateTime(
  key,
  timeZone = 'America/Bogota',
  date = Temporal.Now.zonedDateTimeISO(timeZone)
) {
  localStorage.setItem(key, date.toString());
}

export function getTemporalZonedDateTime(key) {
  const raw = localStorage.getItem(key);
  return raw ? Temporal.ZonedDateTime.from(raw) : null;
}

// Ejemplo de uso
function saveLastVisit() {
  setTemporalZonedDateTime('lastVisit');
}

function checkLastVisit() {
  const lastVisit = getTemporalZonedDateTime('lastVisit');
  if (lastVisit) {
    const now = Temporal.Now.zonedDateTimeISO('America/Bogota');
    const diff = now.until(lastVisit);
    console.log(`Visitaste hace ${diff.hours} horas y ${diff.minutes} minutos`);
  }
}
```

---

## 6) Checklist rápido

- Guarda objetos con `JSON.stringify`
- Lee objetos con `JSON.parse` dentro de `try/catch`
- En Next.js usa `'use client'` para `localStorage`
- Guarda fechas en formato ISO (`toISOString()`)
- Formatea para UI con `Intl.DateTimeFormat`
- **Para Temporal**: instala `pnpm add @js-temporal/polyfill` e importa al inicio
- **Temporal es ideal para**: zonas horarias, cálculos complejos, diffs entre fechas
- Serializa Temporal con `.toString()` y recupera con `Temporal.PlainDate.from()` o `.ZonedDateTime.from()`
