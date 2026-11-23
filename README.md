# Practica-Avanzada-Bootstrap

# StockLab

Panel administrativo de inventario construido con **Bootstrap 5.3 compilado desde su código fuente SCSS**, con sistema de diseño propio (tokens), modo claro/oscuro y componentes reutilizables. Proyecto de la materia Desarrollo de Software Frontend II.

🔗 **URL pública:** https://localhost:5173

## Tecnologías

- Bootstrap 5.3 (SCSS) + Popper
- Sass (Dart Sass)
- Vite
- Stylelint (`stylelint-config-standard-scss`)
- JavaScript ES Modules

## Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (http://localhost:5173)
npm run dev

# Build de producción
npm run build

# Previsualizar el build
npm run preview

# Revisar el SCSS con Stylelint
npm run lint:css
```

## Estructura

```
src/
├── main.js
├── js/            # theme.js, product-form.js, search.js
└── scss/
    ├── main.scss
    ├── abstracts/ # tokens, funciones y mixins
    ├── vendor/    # Bootstrap personalizado
    ├── base/
    ├── layout/
    └── components/
```

## Tamaño del CSS (Reto 2)

| Importación | Tamaño sin comprimir | Tamaño gzip |
|---|---|---|
| Bootstrap completo (`bootstrap/scss/bootstrap`) | 308.30 kB | 42.53 kB |
| Importación selectiva (solo lo que usa StockLab) | 186.41 kB | 26.19 kB |
| **Ahorro** | 121.89 kB (39.5 %) | 16.34 kB (38.4 %) |

La importación selectiva excluye componentes que el panel no usa (accordion, carousel, dropdown, navbar, pagination, etc.), por lo que el CSS final es menor que el de Bootstrap completo.

## Retos resueltos

- [x] Reto 1: función `z($layer)` con `@error`
- [x] Reto 2: medición del CSS completo vs. selectivo
- [ ] Reto 3: sidebar compacta
- [x] Reto 4: estado "descontinuado" solo desde `_tokens.scss`
- [ ] Reto 5: tema de contraste
- [x] Reto 6: buscador y KPI de stock bajo

## Preguntas de reflexión

**1. ¿Por qué las variables de Bootstrap deben sobrescribirse antes de importar `variables.scss`? ¿Qué papel cumple `!default`?**
Bootstrap declara sus variables con `!default`, que significa "asigna este valor solo si la variable aún no tiene uno". Por eso mis valores (`$primary`, `$border-radius`, etc.) deben declararse antes: si los declaro después, Bootstrap ya habría fijado los suyos y los míos llegarían tarde para influir en los mapas y componentes que se calculan con ellos.

**2. ¿Qué diferencia hay entre `@use` y `@import` en cuanto a alcance de nombres y número de veces que se carga un archivo?**
`@import` vuelca todo en el ámbito global, así que los nombres pueden chocar, y cada import vuelve a cargar y emitir el archivo. `@use` crea un espacio de nombres (`t.$brand`, `f.rem()`) y carga cada módulo una sola vez aunque se use desde varios archivos. Por eso mi código usa `@use` y solo `vendor/_bootstrap.scss` usa `@import`.

**3. Da un ejemplo de tu proyecto donde una variable CSS fue indispensable y otro donde una variable de Sass fue la mejor opción.**
Variable CSS: los colores de `var(--bs-*)` en badges y KPIs, porque cambian en tiempo de ejecución al alternar `data-bs-theme` sin recompilar. Variable de Sass: `$stock-states` (y `$breakpoints`), porque se usan en tiempo de compilación para generar clases con `@each` y media queries, y el navegador no necesita conocerlas.

**4. ¿Qué problema de mantenimiento resuelve `@extend %pill` y qué riesgo tiene usar `@extend` con clases normales?**
El placeholder `%pill` centraliza los estilos base de las "píldoras" en un solo lugar y no genera CSS por sí mismo, solo agrupa selectores cuando se extiende. Con clases normales, `@extend` reescribe todos los selectores donde aparece esa clase, lo que puede generar selectores enormes, acoplar componentes y producir CSS inesperado difícil de depurar.

**5. Según tu tabla del Reto 2, ¿cuánto CSS ahorraste? ¿Qué riesgo introduce quitar componentes de Bootstrap en un equipo grande?**
Ahorré 121.89 kB sin comprimir (39.5 %) y 16.34 kB en gzip (38.4 %). El riesgo es que otra persona del equipo use una clase de un componente que quité (por ejemplo `dropdown` o `navbar`) y no vea estilos ni error alguno. Por eso hay que documentar qué componentes están incluidos y revisarlo en code review.

## Autor

Gerardo Ramírez Martín del campo · Ingeniería en Desarrollo de Software

<img width="553" height="246" alt="image" src="https://github.com/user-attachments/assets/4d0f0e42-4692-417e-a645-1b9ca93eda3f" />

<img width="1919" height="910" alt="image" src="https://github.com/user-attachments/assets/dbd18685-5892-4253-8c1c-22d463780ee7" />

<img width="553" height="268" alt="image" src="https://github.com/user-attachments/assets/e3777aa3-dc87-45e5-9a9a-b72fb087d37b" />
