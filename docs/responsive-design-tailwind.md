# Responsive Design con Tailwind CSS

## Qué significa que una interfaz sea responsive

Un diseño responsive se adapta al tamaño de pantalla del usuario sin romper la experiencia.

````markdown
# Responsive Design con Tailwind CSS

## Qué significa que una interfaz sea responsive

Un diseño responsive se adapta al tamaño de pantalla del usuario sin romper la experiencia.

En la práctica, eso significa que una misma interfaz debe poder verse bien en:

- móvil
- tablet
- laptop
- escritorio grande

Tailwind CSS facilita esto porque trabaja con un enfoque **mobile-first**.

---

## 1. Enfoque mobile-first

Tailwind parte de una idea simple:

- primero escribes los estilos base para pantallas pequeñas
- luego agregas variantes para pantallas más grandes

Ejemplo:

```tsx
<div className="w-full px-4 text-sm md:px-6 lg:px-10 lg:text-base">
  Contenido
</div>
```

Aquí:

- `w-full`, `px-4` y `text-sm` aplican por defecto
- `md:px-6` se activa desde tablet
- `lg:px-10` se activa desde desktop
- `lg:text-base` cambia el tamaño de texto en pantallas grandes

Esto es importante: lo que no lleva prefijo se aplica a todos los tamaños.

---

## 2. Breakpoints principales de Tailwind

Tailwind usa prefijos para indicar desde qué ancho se activa una regla.

Los más comunes son:

- `sm` → pantallas pequeñas
- `md` → tablet
- `lg` → laptop / desktop
- `xl` → monitores grandes
- `2xl` → pantallas muy grandes

Ejemplo mental:

- sin prefijo = móvil primero
- `md:` = desde tablet en adelante
- `lg:` = desde desktop en adelante

---

## 3. Cómo se leen las clases responsive

Una clase como esta:

```tsx
className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
```

significa:

- en móvil: 1 columna
- en tablet: 2 columnas
- en desktop: 4 columnas

Tailwind no reemplaza todo el estilo; solo sobreescribe la parte necesaria en cada breakpoint.

---

## 4. Mostrar y ocultar elementos por tamaño de pantalla

Esto es muy útil en navegación, sidebars y headers.

Ejemplo:

```tsx
<nav className="hidden lg:flex">
  Menú desktop
</nav>

<button className="lg:hidden">
  Menú hamburguesa
</button>
```

Interpretación:

- `hidden lg:flex` = oculto en móvil/tablet, visible desde desktop
- `lg:hidden` = visible en móvil/tablet, oculto desde desktop

En tu navbar, esta es la idea correcta para dejar:

- logo visible siempre
- hamburguesa visible en móvil y tablet
- menú completo visible solo en desktop

---

## 5. Layouts adaptables

Tailwind permite cambiar dirección, separación y alineación según pantalla.

Ejemplo:

```tsx
<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
  <span>Logo</span>
  <span>Links</span>
</div>
```

Comportamiento:

- en móvil: elementos en columna
- en tablet: pasan a fila
- en desktop: quedan alineados horizontalmente

Esto evita que el layout se vea apretado en pantallas pequeñas.

---

## 6. Tamaños fluidos y medidas responsivas

Siempre que puedas, usa medidas flexibles:

- `w-full`
- `max-w-*`
- `min-h-*`
- `px-*` responsivo
- `gap-*` responsivo

Ejemplo:

```tsx
<div className="w-full max-w-7xl px-4 sm:px-6 lg:px-10">Contenido</div>
```

Esto hace que el contenedor:

- ocupe todo el ancho disponible
- pero no crezca infinito
- y tenga padding distinto según el tamaño de pantalla

---

## 7. Typography responsive

También puedes adaptar texto:

```tsx
<h1 className="text-3xl md:text-5xl lg:text-7xl">Título</h1>
```

Eso permite que:

- en móvil el texto no se desborde
- en tablet se lea mejor
- en desktop tenga presencia visual

---

## 8. Responsive design en el navbar

En un navbar moderno, lo normal es hacer esto:

### Móvil y tablet

- mostrar solo logo
- mostrar botón hamburguesa
- abrir un panel lateral o menú desplegable

### Desktop

- mostrar logo
- mostrar links horizontales
- mostrar botones de acción

Ejemplo de lógica visual:

```tsx
<div className="flex items-center justify-between">
  <Logo />

  <nav className="hidden lg:flex">Links desktop</nav>

  <button className="lg:hidden">Hamburguesa</button>
</div>
```

Esto evita que el header se rompa en pantallas chicas.

---

## 9. Menú hamburguesa: patrón recomendado

Un menú hamburguesa normalmente necesita:

- estado abierto/cerrado
- fondo oscuro o overlay
- panel lateral o modal
- cierre al tocar afuera
- cierre al tocar un link

Ejemplo conceptual:

```tsx
{
  isOpen && <div className="fixed inset-0 bg-black/50" />;
}
{
  isOpen && <aside className="fixed right-0 top-0 h-full w-80 bg-white" />;
}
```

En Tailwind, lo más importante es combinar:

- `fixed`
- `inset-0`
- `translate-x-full` / `translate-x-0`
- `transition-transform`
- `duration-300`

Eso crea una sensación de panel deslizante limpia y profesional.

---

## 10. Buenas prácticas para responsive design

### Haz esto

- piensa primero en móvil
- usa `hidden`, `flex`, `grid`, `block` con breakpoints
- usa `max-w-*` para no estirar demasiado el contenido
- ajusta `padding`, `gap`, `font-size` y `width` por pantalla
- prueba siempre en mobile, tablet y desktop

### Evita esto

- fijar anchos enormes sin usar `max-w-*` en contenedores principales
- depender solo de `position: absolute` para todo
- meter demasiados elementos en el header móvil
- usar textos muy grandes sin breakpoints

---

## 11. Qué se aplicó en tu navbar (resumen técnico)

Aquí agrego detalles técnicos concretos (clases y razones) sobre los cambios que hicimos en el proyecto. Esto te ayudará a estudiar y entender exactamente qué y por qué se modificó.

- **Contenedor desktop ancho máximo**: Para que el navbar se extienda hasta ~1200px en pantallas grandes y los elementos (logo, links y botón) se distribuyan con `space-between`, usamos:

```tsx
<div className="flex w-full max-w-[1200px] items-center justify-between">
  {/* logo */}
  {/* links */}
  {/* donar */}
</div>
```

Esto evita que el menú se vea comprimido y garantiza separación entre elementos.

- **Dropdown (ancho y iconos)**: Los dropdowns perdían sus iconos o la flecha porque los elementos se comprimían. Cambios aplicados:
  - `className="absolute top-full left-0 pt-4 w-56 opacity-0 z-50 min-w-max"` (ancho mayor y `min-w-max` para que no se reduzca)
  - Los iconos se envuelven en un contenedor `shrink-0` y tamaño fijo: `className="flex w-5 shrink-0 items-center justify-center text-[16px] text-gray-700"`
  - La flecha se dejó como `inline-block shrink-0` para que no desaparezca por culpa del `flex`

  Ejemplo (extracto de `NavbarDrodown.tsx`):

```tsx
<div
  ref={dropdownRef}
  className="absolute top-full left-0 pt-4 w-56 opacity-0 z-50 min-w-max"
  style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
>
  <div className="bg-white rounded-2xl py-4 flex flex-col shadow-lg shadow-black/20">
    <Link className="relative px-5 sm:px-8 py-3 text-gray-700 hover:bg-gray-100 flex items-center justify-start gap-4">
      <span className="flex w-5 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="text-gray-700 font-medium whitespace-nowrap">
        Etiqueta
      </span>
    </Link>
  </div>
</div>
```

Esto mantiene los íconos visibles y los textos sin envolverse de forma inesperada.

- **Mobile: panel full‑width con padding para alinear con logo/hamburguer**

  Para que el panel de móvil ocupe el 100% horizontal y al mismo tiempo deje padding de 10–20px (alineado visualmente con el logo y el botón hamburguesa) recomendamos usar clases como:

```tsx
<aside
  id="mobile-navigation"
  className="absolute right-0 top-0 flex h-full w-full sm:w-[min(88vw,34rem)] flex-col bg-white text-slate-800"
>
  <div className="p-4 sm:p-6">{/* contenido del panel */}</div>
</aside>
```

- `p-4` ≈ 16px (alineado con `px-4` usado en el header)
- `p-5` sería ≈ 20px si prefieres un mayor margen horizontal

Con esto la distancia lateral coincide con la de la barra superior y el icono/hamburguesa (ej.: el botón hamburguesa suele usar `p-3`, por eso `px-4` o `p-4` queda estéticamente centrado).

- **Hero (tablet y móvil: texto más grande y alineado)**

  Ajustes realizados en `HeroVH.tsx`:
  - Contenedor centrado con `max-w-[1200px]` para alinear con el navbar.
  - Titular con tamaños más grandes en tablet/móvil: `text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]`.
  - Contenedor horizontal padding: `px-4 sm:px-6` para mantener alineación con el navbar y con el panel mobile.

  Ejemplo (extracto de `HeroVH.tsx`):

```tsx
<div className="z-50 flex w-full max-w-[1200px] flex-col items-center justify-center gap-8 px-4 sm:px-6 text-center">
  <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]">Título</h1>
</div>
```

Estas combinaciones hacen que en tablet el texto gane presencia y en móvil siga siendo legible sin salirse del layout.

---

## 12. Ajuste profesional del header en mobile

En la implementación actual se corrigió un problema común: el contenido del hero se montaba sobre el navbar.

La solución aplicada fue combinar tres ideas:

- subir el z-index del navbar para que quede por encima del hero
- reducir/ajustar tamaños tipográficos en pantallas pequeñas
- añadir espacio superior y padding horizontal en mobile (`px-4 pt-24 sm:px-6 sm:pt-28`)

### Qué cambia en mobile (resumen práctico)

- el título usa tamaños progresivos: `text-6xl sm:text-7xl md:text-8xl`
- el subtítulo usa `text-xl sm:text-2xl md:text-3xl`
- el botón principal se adapta y mantiene `px-6` / `sm:px-8` según tamaño
- el contenedor principal usa `px-4` (16px) en móvil y `sm:px-6` (24px) en tablet para alinear visualmente con el navbar

---

## 13. Regla mental rápida

Si quieres recordar cómo pensar en Tailwind responsive, usa esta fórmula:

Base móvil + ajustes progresivos para pantallas más grandes

Ejemplo:

```tsx
className = 'px-4 md:px-6 lg:px-10';
```

Significa:

- móvil: `px-4` (~16px)
- tablet: `px-6` (~24px)
- desktop: `px-10` (~40px)

---

## 14. Resumen final y archivos cambiados

Resumen técnico de los cambios y archivos donde se aplicaron:

- `app/components/shared/Navbar.tsx`
  - `max-w-[1200px]` en el contenedor principal
  - mobile panel: `w-full sm:w-[min(88vw,34rem)]` y uso de `p-4`/`p-6` para padding

- `app/components/shared/navbarDropdown/NavbarDrodown.tsx`
  - dropdown: `w-56 min-w-max z-50`
  - iconos: `shrink-0` y contenedores `w-5` para evitar compresión
  - flecha: `inline-block shrink-0` para mantener visibilidad

- `app/components/shared/HeroVH.tsx`
  - contenedor `max-w-[1200px]` y `px-4 sm:px-6`
  - `h1` aumentado (`text-6xl sm:text-7xl md:text-8xl lg:text-[7rem]`)

### Cómo probar localmente

1. Levantar el proyecto:

```bash
npm run dev
```

2. Revisar en:

- móvil: emulación o dispositivo físico (asegúrate de que el panel mobile use `p-4` para ver el padding)
- tablet: activa `sm`/`md` en el inspector
- desktop: verifica que el navbar se extienda hasta `max-w-[1200px]` y que los dropdowns muestren íconos

Si quieres, puedo agregar un pequeño paso a paso con capturas (o clases concretas a cambiar) para que puedas experimentar variaciones de `p-4` vs `p-5` y elegir si prefieres 16px o 20px.
````
