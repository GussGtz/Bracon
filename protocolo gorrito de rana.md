# Protocolo Gorrito de Rana — Grupo Bracon

Bitácora de control del desarrollo del sitio web de Grupo Bracon. Cada entrada registra qué se hizo, en qué archivos y qué queda pendiente.

---

## 2026-07-03 — Creación inicial del sitio

**Hecho:**
- Se creó el proyecto en `~/Desktop/bracon`, separado del repositorio JugarLaPelota.
- Se copió el logo del usuario (`IMG_3871.PNG`) a `assets/img/logo.png`.
- Se investigó como referencia la estructura de [constructoramuyil.com](https://constructoramuyil.com/) (nav, hero, cards de servicios, galería, logos de clientes, formulario de contacto, footer con WhatsApp).
- Se definió la paleta de marca a partir del logo: navy/carbón oscuro + dorado + gris, tipografías Poppins (títulos) e Inter (texto).
- Se construyó el sitio estático completo (HTML + CSS + JS, sin frameworks):
  - [index.html](index.html) — Home con hero, barra de estadísticas, 4 tarjetas de servicios, galería de trabajos, sección "por qué elegirnos" y CTA a WhatsApp.
  - [carpinteria.html](carpinteria.html) — Carpintería Exterior y Acabados de Madera: palapas y muelles, pérgolas y escaleras, laminados y lambrines.
  - [herreria.html](herreria.html) — Herrería Artística y Aluminio: estructuras metálicas, herrería de diseño, cancelería y ventanas de aluminio.
  - [construccion.html](construccion.html) — Construcción Ligera y Mantenimiento: instalación de tablaroca, pintura residencial e industrial.
  - [maquinaria.html](maquinaria.html) — Maquinaria y Logística: flota de renta (retroexcavadoras, grúas, camiones de volteo, motoconformadoras, compactadores, plantas de luz) y transporte de carga.
  - [contacto.html](contacto.html) — Formulario que arma un mensaje y lo abre directo en WhatsApp (sin backend), más datos de contacto.
- Se creó [css/styles.css](css/styles.css) con: header sticky que se oscurece al hacer scroll, menú responsive con hamburguesa, hero a pantalla completa, tarjetas de servicio con hover, galería tipo mosaico, sección oscura para Maquinaria, banda CTA, formulario estilizado, footer y botón flotante de WhatsApp con animación de pulso.
- Se creó [js/main.js](js/main.js) con: detección de scroll del header, menú móvil, resaltado del link activo, animaciones "reveal" al hacer scroll (IntersectionObserver), generación automática de enlaces `wa.me` desde `data-wa-link`, y envío del formulario de contacto como mensaje de WhatsApp.
- Se usaron imágenes de relleno de `picsum.photos` (marcadas para reemplazo) porque no había fotografías reales de trabajos del cliente.
- Se creó [README.md](README.md) con instrucciones de personalización antes de publicar (número de WhatsApp, fotos reales, correo, dirección, redes sociales).
- Se verificó el sitio sirviéndolo con `python3 -m http.server` y comprobando por `curl` que las 6 páginas, el CSS, el JS y el logo responden 200, y que las imágenes externas de relleno cargan correctamente. No se pudo verificar visualmente en navegador por falta de conexión de la extensión Claude in Chrome en la sesión.

**Pendiente / a personalizar por el usuario:**
- [ ] Reemplazar el número de WhatsApp placeholder (`529999999999`) en `js/main.js` por el número real.
- [ ] Sustituir todas las imágenes de `picsum.photos` por fotografías reales de trabajos de Grupo Bracon.
- [ ] Actualizar correo, dirección y horario reales (actualmente placeholder: `contacto@grupobracon.com`, "Quintana Roo, México").
- [ ] Añadir enlaces reales de Facebook / Instagram (actualmente apuntan a `#`).
- [ ] Ajustar las cifras de la barra de estadísticas del Home (años de experiencia, proyectos entregados) a datos reales.
- [ ] Definir dónde se va a publicar (Netlify, GitHub Pages, hosting propio, etc.).

---

## 2026-07-03 — Hero convertido en galería/slider con texto fijo

**Motivo:** el usuario pidió que el hero de las 5 páginas principales (Inicio, Carpintería y Madera, Herrería y Aluminio, Construcción Ligera, Maquinaria y Logística) imitara el estilo de constructoramuyil.com: imagen de fondo tipo galería que va cambiando, con el texto superpuesto siempre fijo, y flechas de navegación.

**Hecho:**
- En [css/styles.css](css/styles.css) se rediseñó la sección `.hero`: se eliminó el fondo único con `::before` y se añadieron `.hero-slider` (contenedor absoluto), `.hero-slide` (cada imagen, con transición de opacidad y zoom lento tipo Ken Burns), `.hero-overlay` (el degradado oscuro que antes iba en `::before`), `.hero-arrow` (flechas circulares prev/next) y `.hero-dots` (indicadores de posición, el activo se alarga y se pinta dorado).
- En [js/main.js](js/main.js) se agregó `initHeroSliders()`: detecta cada `.hero-slider` de la página, hace rotación automática cada 5.5s, sincroniza los dots, y conecta las flechas prev/next (al hacer clic manual se reinicia el temporizador automático).
- Se actualizó el hero de las 5 páginas para usar la nueva estructura con 4 imágenes cada una (en vez de una sola imagen fija de fondo):
  - Inicio: hero general + 3 fotos variadas de trabajos.
  - Carpintería: hero + palapas, pérgolas, lambrines.
  - Herrería: hero + estructuras metálicas, herrería artística, cancelería.
  - Construcción Ligera: hero + tablaroca, pintura, otro trabajo general.
  - Maquinaria y Logística: hero + transporte de carga, maquinaria en obra (x2).
- El texto (título, párrafo, botones) permanece fijo dentro de `.hero-content`, por encima del slider y el overlay; solo la imagen de fondo rota.
- Se verificó con `curl` que todas las páginas y assets siguen respondiendo 200, y se validó por `grep` que cada hero tiene exactamente 4 `.hero-slide` (una con `active`), 4 dots, y que no quedó ningún `style="background-image"` suelto en el `<section class="hero">`. No se pudo confirmar visualmente en navegador por seguir sin conexión la extensión Claude in Chrome.

**Pendiente:**
- [ ] Verificar visualmente el slider en un navegador cuando esté disponible (Chrome extension o que el usuario confirme).
- [ ] Reemplazar las imágenes placeholder del slider por fotos reales una vez el usuario las proporcione (ver pendientes de la entrada anterior).

---

## 2026-07-03 — Eliminación de emojis, reemplazo por íconos Heroicons (Tailwind CSS)

**Motivo:** el usuario pidió eliminar todos los emojis del proyecto (💬 ✉ 📍 🕑 ★ ⚙ 🛡 ⏱ ✓ 🚜 🏗 🚛 🛣 🧱 ⚡ → ↓, y los textos "f"/"◎" para redes sociales) y sustituirlos por íconos de Tailwind CSS que combinaran con el diseño profesional del sitio.

**Hecho:**
- Se descargaron íconos reales de [Heroicons](https://heroicons.com) (la librería de íconos oficial del equipo de Tailwind CSS, outline 24x24, `stroke="currentColor"`) vía CDN (`cdn.jsdelivr.net/npm/heroicons@2.1.5`) y se guardaron localmente en el equipo (no en el proyecto) solo como referencia temporal para extraer el `path` SVG exacto de cada uno: `chat-bubble-left-right`, `envelope`, `map-pin`, `clock`, `star`, `cog-6-tooth`, `shield-check`, `check`, `chevron-left`, `chevron-right`, `chevron-down`, `arrow-right`, `truck`, `bolt`, `arrows-up-down`, `adjustments-horizontal`, `square-3-stack-3d`.
- Para Facebook e Instagram (que Heroicons no incluye por ser logos de marca) se dibujaron a mano dos íconos propios en el mismo estilo outline/`currentColor` para mantener consistencia visual.
- Se escribió un script en Python que reemplazó, de forma exacta y verificada, cada emoji por su `<svg class="icon">` correspondiente en las 6 páginas:
  - Checkmarks (✓) de todas las listas de características → ícono `check`.
  - Burbuja de WhatsApp (💬) en redes sociales, botón flotante y tarjeta de contacto → ícono `chat-bubble-left-right`.
  - Flechas del hero-slider (antes entidades `&#10094;`/`&#10095;`) → íconos `chevron-left`/`chevron-right`.
  - Flecha del scroll-cue del Home (↓) → ícono `chevron-down`; flechas de "Ver especialidad" (→) → ícono `arrow-right`.
  - Iconos de "por qué elegirnos" en el Home (★ ⚙ 🛡 ⏱) → `star`, `cog-6-tooth`, `shield-check`, `clock`.
  - Iconos de la flota en Maquinaria (🚜 🏗 🚛 🛣 🧱 ⚡) → `cog-6-tooth`, `arrows-up-down`, `truck`, `adjustments-horizontal`, `square-3-stack-3d`, `bolt`.
  - Iconos de contacto (💬 ✉ 📍 🕑) → `chat-bubble-left-right`, `envelope`, `map-pin`, `clock`.
  - Se añadió también un ícono de chat antes del texto en todos los botones `btn-wa` (WhatsApp) para reforzar la consistencia visual, aunque no tuvieran emoji previamente.
- En [css/styles.css](css/styles.css) se agregó la sección "Iconos (Heroicons)" con la clase base `.icon` (20x20 por defecto) y overrides de tamaño según el contenedor (`.dot`, `.why-icon`, `.fleet-icon`, `.info-row .ic`, `.social-row a`, `.wa-float`, `.hero-arrow`, `.card-link`, `.scroll-cue`, botones `btn-wa`). Los íconos heredan color vía `currentColor`, por lo que se adaptan automáticamente a fondo claro u oscuro sin CSS adicional.
- Se verificó con `grep` (rango Unicode de emojis/símbolos) que no queda ningún emoji en `.html`, `.css` ni `.js`, y se validó con un parser XML en Python que los 109 SVG insertados en las 6 páginas son XML bien formado (0 inválidos).

**Pendiente:**
- [ ] Confirmar visualmente en navegador que los íconos se ven alineados y del tamaño correcto en todos los contextos (pendiente por falta de conexión de la extensión Claude in Chrome en esta sesión).

---

## 2026-07-03 — Sección "Quiénes Somos" en el Home + limpieza del botón de Contacto duplicado

**Motivo:** el usuario pidió agregar al Home una sección "Quiénes Somos" con el estilo visual de referencia de constructoramuyil.com (foto grande a la izquierda con una tarjeta blanca de texto superpuesta a la derecha, eyebrow + título grande + párrafos + una línea destacada de cobertura al final), sin agregar ningún botón nuevo a la barra de navegación. También pidió eliminar el botón "Contacto" que estaba repetido en el header (aparecía tanto como link del menú como botón aparte).

**Hecho:**
- Se eliminó `<a href="contacto.html" class="btn btn-outline">Contacto</a>` de `.header-actions` en las 6 páginas — ese botón duplicaba el link "Contacto" que ya existe en `.main-nav`. Ahora el header solo tiene el nav con "Contacto" y el botón verde de WhatsApp.
- Se eliminó de [css/styles.css](css/styles.css) la regla `.header-actions .btn-outline { display: none; }` dentro del media query móvil, que ya no aplicaba a nada.
- Se agregó la sección "Quiénes Somos" únicamente en [index.html](index.html), justo después del hero y antes de la barra de estadísticas. **No se añadió ningún enlace nuevo al `.main-nav`**, tal como se pidió.
- Estructura de la sección: `.about-grid` con dos columnas — `.about-img` (foto de portada) y `.about-card` (tarjeta blanca con sombra fuerte que se monta sobre la imagen mediante `margin-left: -72px`, replicando el efecto de "tarjeta superpuesta" de la referencia). Contenido: eyebrow "Quiénes somos", título "Grupo Bracon", tres párrafos de presentación de la empresa, y una línea final en negritas con borde superior ("Damos servicio en Quintana Roo y toda la Península de Yucatán.") imitando el renglón de cobertura geográfica de la imagen de referencia.
- En móvil (`max-width: 860px`) la tarjeta pasa a `margin-top: -48px` en vez de `margin-left` negativo, manteniendo el efecto de superposición apilado en una sola columna.
- Se verificó sirviendo el sitio localmente: las 6 páginas y assets responden 200, no quedó ningún botón "Contacto" duplicado en el header de ninguna página (el único "Contacto" restante en el nav y el de pie de página se mantienen, ya que no eran parte de la duplicación reportada), el nav de Inicio no tiene ningún link nuevo, y el CSS tiene las llaves balanceadas (207 aperturas / 207 cierres).

**Pendiente:**
- [ ] Confirmar visualmente en navegador el efecto de superposición de la tarjeta "Quiénes Somos" y ajustar el offset si no luce como se espera (sigue sin conexión la extensión Claude in Chrome).
- [ ] Reemplazar la foto placeholder de la sección "Quiénes Somos" (`bracon-nosotros`) por una fotografía real del equipo o de un proyecto representativo.

---

## 2026-07-03 — Estadísticas sobre foto + sección "Empresas que Confían en Nosotros"

**Motivo:** el usuario compartió dos referencias visuales de constructoramuyil.com: (1) una franja de estadísticas grandes sobre una foto de fondo (con divisores verticales finos entre cada cifra) y (2) una sección oscura de "Marcas que respaldan" con logos de clientes en un carrusel con flechas. Pidió agregar ambas al Home, "donde mejor vaya", sin añadir ningún botón nuevo a la barra de navegación.

**Hecho:**
- Se rediseñó la franja de estadísticas del Home (antes `.stats-bar` sólida en navy) para convertirse en `.stats-photo`: mismo contenido (Años de experiencia, Proyectos entregados, Líneas de servicio, Equipo y maquinaria propia) pero ahora sobre una foto de fondo con degradado oscuro encima para contraste, números más grandes y divisores verticales finos entre cada estadística (igual que la referencia). Se mantiene en la misma posición: justo después de "Quiénes Somos" y antes de "Servicios".
- Se agregó una nueva sección **"Empresas que Confían en Nuestro Trabajo"** en [index.html](index.html), ubicada después de "Por qué Grupo Bracon" y antes de la banda de CTA final (funciona como prueba social justo antes de pedir el contacto). Incluye: fondo de foto oscurecido, título, subtítulo, y un carrusel horizontal de 5 tarjetas con flechas prev/next (mismo lenguaje visual que las flechas del hero-slider).
- **Importante — decisión de diseño:** la referencia del usuario mostraba logos reales de hoteles (Fairmont, Hard Rock, Secrets, etc.) que son clientes de Constructora Muyil, no de Grupo Bracon. Para no fabricar una asociación falsa con marcas reales que Bracon no puede respaldar, las 5 tarjetas del carrusel se dejaron como **placeholders explícitos** ("Logo de cliente" + ícono genérico de edificio) en vez de inventar nombres de empresas. Están listas para que el usuario las reemplace por los logos reales de sus clientes/socios cuando los tenga.
- Se implementó `initBrandsCarousel()` en [js/main.js](js/main.js): calcula cuántas tarjetas caben visibles según el ancho del contenedor y desplaza el riel (`translateX`) al hacer clic en las flechas, con vuelta cíclica al llegar al final/inicio, y recalcula en `resize`.
- Se agregaron a [css/styles.css](css/styles.css) las reglas `.stats-photo`/`.stats-photo-bg`/`.stats-photo-overlay` y `.brands`/`.brands-bg`/`.brands-overlay`/`.brands-carousel`/`.brand-card`/`.brands-arrow`.
- **No se agregó ningún link nuevo a `.main-nav`**, tal como se pidió.
- Se verificó sirviendo el sitio localmente: `index.html`, `css/styles.css` y `js/main.js` responden 200; el nav no tiene enlaces nuevos; el CSS quedó con llaves balanceadas (232/232); y los 25 SVG insertados en `index.html` son XML válido.

**Pendiente:**
- [ ] Reemplazar las 5 tarjetas placeholder de "Empresas que Confían" por los logos reales de clientes o socios de Grupo Bracon (si aún no tiene, puede dejarse oculta esta sección hasta tenerlos).
- [ ] Reemplazar la foto de fondo placeholder de la franja de estadísticas (`bracon-stats`) y de la sección de empresas (`bracon-brands`) por fotografías reales de obra.
- [ ] Confirmar visualmente en navegador el carrusel de "Empresas que Confían" (flechas, desplazamiento) cuando la extensión Claude in Chrome esté disponible.

---

## 2026-07-03 — Fix: hero de Contacto sin overlay oscuro (imagen ilegible)

**Motivo:** el usuario mandó una captura del hero de [contacto.html](contacto.html) donde la foto de fondo (una imagen aleatoria de picsum.photos con un primer plano de alto contraste) dominaba la sección y no dejaba leer bien el texto ni el breadcrumb.

**Causa raíz:** al convertir el hero de las otras 5 páginas al carrusel (`.hero-slider` + `.hero-overlay`), se eliminó la regla antigua `.hero::before` que ponía el degradado oscuro automáticamente sobre cualquier imagen de fondo. Contacto nunca se migró a ese carrusel (correctamente, porque el usuario solo pidió el carrusel para Inicio/Carpintería/Herrería/Construcción/Maquinaria) pero se quedó con el `style="background-image"` inline **sin** el div `.hero-overlay`, así que perdió el oscurecido y la imagen quedó sin contraste para el texto.

**Hecho:**
- En [contacto.html](contacto.html) se agregó `<div class="hero-overlay"></div>` justo dentro de la sección `.hero`, usando la misma clase de degradado oscuro que ya tienen las demás páginas (sin convertirla en carrusel, solo se restaura el oscurecido).
- Se cambió el seed de la imagen placeholder de `bracon-contacto-hero` a `bracon-contacto-v2` para dejar atrás la foto que salió inapropiada para un sitio de construcción.
- Se verificó con `curl` que la página y la nueva imagen responden 200, y por `grep` que ninguna otra página del sitio tiene el mismo problema (todas las demás ya usan `.hero-slider`/`.hero-overlay` o, en el caso de Contacto, ahora también tiene su overlay).

**Pendiente:**
- [ ] Reemplazar la imagen placeholder del hero de Contacto por una fotografía real (oficina, equipo o proyecto de Grupo Bracon) quedará más profesional que cualquier placeholder aleatorio.

---

## 2026-07-03 — Efecto parallax en las fotos de fondo de Estadísticas y "Empresas que Confían"

**Motivo:** el usuario preguntó cómo se llama el efecto de "hacer scroll y que la imagen dentro de la card se mueva" (se le explicó que es **efecto parallax**) y pidió agregarlo a esas dos secciones del Home: la franja de estadísticas (`.stats-photo`) y "Empresas que Confían en Nuestro Trabajo" (`.brands`).

**Hecho:**
- Se implementó parallax por JavaScript (no `background-attachment: fixed`, que da problemas en Safari/iOS) en [js/main.js](js/main.js): nueva función `initParallax()` que busca todos los elementos con atributo `data-parallax="velocidad"`, y en cada scroll (usando `requestAnimationFrame` para no saturar el hilo principal) calcula qué tan lejos está el centro de su sección respecto al centro de la ventana y desplaza la imagen de fondo con `transform: translateY()` proporcional a esa distancia. Se agregó también un listener de `resize` para recalcular.
- En [index.html](index.html) se añadió el atributo `data-parallax="0.25"` a `.stats-photo-bg` y a `.brands-bg` (las dos imágenes de fondo señaladas por el usuario).
- En [css/styles.css](css/styles.css) se ajustaron `.stats-photo-bg` y `.brands-bg`: en vez de `inset:0` ahora tienen `top:-18%` y `height:136%` (más grandes que su contenedor) para que al desplazarse con el parallax nunca se revele un hueco vacío en los bordes; sus secciones padre (`.stats-photo`, `.brands`) ya tenían `overflow:hidden`, así que el exceso de imagen queda recortado correctamente.
- Se verificó sirviendo el sitio localmente (200 en `index.html`, `css/styles.css` y `js/main.js`), se validó la sintaxis de `main.js` con `node --check` (sin errores), se confirmó que el CSS quedó con llaves balanceadas (232/232) y que los atributos `data-parallax` quedaron en ambos elementos.

**Pendiente:**
- [ ] Confirmar visualmente en navegador que el parallax se siente suave y en la dirección correcta (sigue sin conexión la extensión Claude in Chrome en esta sesión); si se quiere más o menos intensidad, ajustar el valor `0.25` en el atributo `data-parallax`.

---

## 2026-07-03 — Fix: imagen de fondo de "Empresas que Confían" no era adecuada

**Motivo:** el usuario mandó captura mostrando que la sección "Empresas que Confían en Nuestro Trabajo" ya tenía el parallax de la entrada anterior, pero señaló que "faltó" — la imagen de fondo (seed `bracon-brands`) resultó ser una foto de círculos de luz bokeh estilo fiesta/nocturna, que no combina en absoluto con un sitio de construcción profesional y competía visualmente con el texto incluso con el overlay oscuro encima.

**Causa raíz:** picsum.photos no filtra por contenido — el "seed" del URL solo sirve para que la imagen aleatoria sea consistente cada vez que se carga esa URL, pero no tiene ninguna relación con el texto del seed (`bracon-brands` no busca fotos de "marcas" ni de construcción, es una foto de stock aleatoria cualquiera). Ya había pasado lo mismo con el hero de Contacto en una entrada anterior.

**Hecho:**
- Se probaron varias imágenes candidatas antes de decidir (visualizándolas directamente, no solo cambiando el seed a ciegas): una resultó ser un cruce de avenidas con taxis de Nueva York, otra una montaña nevada, otra un primer plano de musgo — ninguna apropiada.
- Se encontró una foto de skyline urbano con rascacielos (seed `bracon-corp1`) que sí transmite una estética corporativa/profesional adecuada para la sección de "confianza empresarial", y se usó para reemplazar `bracon-brands` en el atributo `background-image` de `.brands-bg` en [index.html](index.html). El atributo `data-parallax="0.25"` se mantuvo intacto.
- Se verificó que la nueva imagen responde 200 y que `index.html` sigue sirviéndose correctamente.

**Pendiente:**
- [ ] Esta es la segunda vez que una imagen aleatoria de picsum.photos resulta inapropiada para el tono del sitio (la primera fue el hero de Contacto). Si sigue pasando, considerar cambiar de estrategia de placeholder: por ejemplo usar un fondo con gradiente/patrón de marca en vez de fotos aleatorias en las secciones donde el contenido de la imagen importa mucho, hasta que el usuario aporte fotos reales.
- [ ] Confirmar visualmente en navegador cómo se ve la nueva imagen de skyline con el overlay oscuro aplicado.

---

## 2026-07-03 — Fix: el logo se perdía sobre el header oscuro (scroll) y el footer

**Motivo:** el usuario mandó capturas del header al hacer scroll y del footer, ambos con fondo navy muy oscuro (`--navy-950`), señalando que ese color "no le favorece" al logo — se nota en las capturas que el logo casi desaparece (solo se distinguen los trazos dorados) porque los tonos oscuros del propio logo (carbón/navy) son muy parecidos al fondo navy del sitio.

**Causa raíz:** la paleta de colores del sitio se definió tomando muestras del propio logo (navy + dorado + gris), así que cualquier fondo navy del sitio —sin importar qué tan oscuro o claro— siempre iba a tener bajo contraste con las partes oscuras del logo. Cambiar el tono de navy del header/footer no resolvía el problema de raíz.

**Hecho:**
- En vez de cambiar el color de fondo de todo el header/footer (lo que rompería la coherencia con el resto del sitio, que usa navy oscuro en el hero, CTA, stats y "empresas que confían"), se agregó una solución dirigida: un **"logo-badge"** — una píldora/tarjeta blanca compacta con sombra suave, colocada directamente detrás del logo, tanto en el header (`.brand`) como en el footer (`.footer-brand`). Así el logo siempre se ve sobre fondo blanco, sin importar si el header está transparente, con scroll (navy oscuro) o en el footer (navy oscuro).
- Se agregaron las reglas `.logo-badge` en [css/styles.css](css/styles.css): fondo blanco, padding, `border-radius: 100px` (header) o `14px` (footer), con una versión más compacta (`.site-header.scrolled .logo-badge`) para cuando el header se encoge al hacer scroll.
- Se envolvió la etiqueta `<img>` del logo con `<span class="logo-badge">` en el header y el footer de las 6 páginas (usando un script para hacerlo de forma exacta y consistente, ya que el marcado del header difiere ligeramente entre `index.html` y las otras 5 páginas).
- Se verificó que las 6 páginas y el CSS siguen respondiendo 200, que las 6 páginas tienen exactamente 2 `logo-badge` cada una (header + footer), y que el CSS quedó con llaves balanceadas (235/235).

**Pendiente:**
- [ ] Confirmar visualmente en navegador que el logo ahora se lee bien tanto en el header (transparente y con scroll) como en el footer (sigue sin conexión la extensión Claude in Chrome en esta sesión).

---

## 2026-07-03 — Animación de conteo (0 → número) en la franja de estadísticas

**Motivo:** el usuario pidió que los números de la franja de estadísticas del Home (+12, +300, 5, 100%) animen contando desde 0 hasta su valor final, en vez de aparecer estáticos.

**Hecho:**
- En [index.html](index.html) se agregaron atributos `data-count-to` (valor numérico objetivo), `data-prefix` (para el "+" de +12 y +300) y `data-suffix` (para el "%" de 100%) a cada `.stat-num`, manteniendo el texto final visible como contenido de respaldo por si JS estuviera deshabilitado.
- En [js/main.js](js/main.js) se agregó `initCounters()`: usa un `IntersectionObserver` para detectar cuándo cada número entra en pantalla (se dispara una sola vez por elemento) y anima el conteo de 0 al valor objetivo en 1.6s con una curva de aceleración `ease-out cubic` (arranca rápido y frena suave al llegar al número final), recomponiendo el texto en cada frame con `requestAnimationFrame` respetando el prefijo/sufijo de cada estadística. Si el navegador no soporta `IntersectionObserver`, cae a mostrar los números directamente sin animar.
- Se validó la sintaxis de `main.js` con `node --check` (sin errores) y se simuló en Node la lógica de easing/formateo para los 4 casos (`+12`, `+300`, `5`, `100%`), confirmando que el valor final coincide exactamente con el original en cada uno.
- Se verificó sirviendo el sitio localmente que `index.html` sigue respondiendo 200 y que los 4 `data-count-to` quedaron correctamente en el HTML.

**Pendiente:**
- [ ] Confirmar visualmente en navegador que la animación de conteo se ve fluida al hacer scroll hasta esa sección (sigue sin conexión la extensión Claude in Chrome en esta sesión).

---

## 2026-07-03 — Portafolio filtrable por categoría (reemplaza la galería estática del Home)

**Motivo:** el usuario mandó un video (`IMG_3878.mov`, grabación de otro sitio de referencia) mostrando una sección "Portafolio" con pestañas de filtro (Todos / Proyectos / Obras / Instalaciones) que reordenan una cuadrícula de fotos con una animación de aparición/desaparición, y pidió agregar algo así al Home, dejando a criterio dónde ubicarla.

**Decisión de ubicación:** en vez de agregar una segunda galería de fotos separada (lo que hubiera duplicado contenido con la sección "Nuestros trabajos" que ya existía), se **mejoró esa misma sección**: se reemplazó la cuadrícula estática de 6 fotos por un portafolio filtrable, en la misma posición (después de "Servicios", antes de "Por qué elegirnos").

**Hecho:**
- En [index.html](index.html) se reemplazó la sección `<!-- GALERÍA -->` (con `.gallery-grid` estático) por `<!-- PORTAFOLIO -->` (`id="portafolio"`): título "Portafolio de Proyectos", pestañas de filtro con las 4 especialidades del negocio (Todos, Carpintería, Herrería, Construcción, Maquinaria — en vez de las categorías genéricas del video de referencia, para que coincida con la estructura real del sitio) y una cuadrícula de 8 tarjetas (`.portfolio-item`), cada una con `data-category` y una etiqueta (`.portfolio-tag`) que aparece al hacer hover indicando la especialidad.
- En [css/styles.css](css/styles.css) se agregaron las reglas `.portfolio-filters`, `.filter-btn` (con estado `.active` en navy sólido), `.portfolio-grid`, `.portfolio-item` (con overlay oscuro y tag al hacer hover, igual que el resto de las tarjetas del sitio) y `.is-hidden` (para la transición de salida al filtrar: se encoge y se desvanece).
- En [js/main.js](js/main.js) se agregó `initPortfolioFilter()`: al hacer clic en una pestaña, marca cuáles tarjetas coinciden con `data-category`, hace fade-out/scale-down de las que no coinciden (quitándolas del flujo con `display:none` después de la transición) y fade-in de las que sí coinciden — reproduciendo el efecto de reacomodo suave del video de referencia sin necesitar una librería externa de masonry.
- Se verificó: sintaxis de `main.js` válida (`node --check`), CSS con llaves balanceadas (250/250), `index.html` responde 200, y las categorías de las 8 tarjetas coinciden exactamente con los 4 filtros disponibles (2 tarjetas por categoría). Se confirmó que no quedó ninguna referencia residual a la clase `.gallery-grid` en `index.html` (esa clase se sigue usando sin cambios en las páginas de servicio individuales).

**Pendiente:**
- [ ] Confirmar visualmente en navegador que el filtrado se ve fluido y que las pestañas responden bien en móvil (sigue sin conexión la extensión Claude in Chrome en esta sesión).
- [ ] Reemplazar las 8 fotos placeholder del portafolio por fotografías reales de proyectos, ya categorizadas correctamente por especialidad.

---

## 2026-07-03 — Fotos reales del negocio integradas (reemplazan placeholders de picsum)

**Motivo:** el usuario compartió 6 carpetas en Descargas ("WhatsApp Unknown...") con 309 fotos reales de proyectos, pidiendo revisar todas, quedarse con las de mejor calidad, descartar las feas, y colocarlas en las páginas de su departamento correspondiente y en el portafolio.

**Hallazgo importante:** se revisaron las 309 fotos (usando hojas de contacto generadas con Python/Pillow para verlas en bloque). **Las 6 carpetas son, en su totalidad, fotos de Carpintería** (palapas, muelles, andadores de madera costeros, pérgolas, lambrines/laminados de madera). No había ninguna foto de Herrería, Construcción Ligera ni Maquinaria. Esas 3 páginas quedan pendientes de fotos reales.

**Control de calidad aplicado:**
- Se detectó que las hojas de contacto iniciales no corregían la rotación EXIF de las fotos de celular, lo que llevó a una primera selección con varias fotos mal evaluadas; se regeneraron las hojas con orientación corregida antes de decidir.
- Al revisar a tamaño completo, se detectaron **al menos 5 fotos que en realidad eran fotografías de marketing/estilo de vida de otro negocio** (una con la marca "KANNA" visible en un letrero, otra con una modelo en bikini caminando hacia el mar) mezcladas en la carpeta F5 junto con las fotos reales de obra. Se descartaron todas y se reemplazaron por fotos verificadas como documentación real de trabajo (con trabajadores, herramientas o materiales visibles en sitio), para no atribuirle a Grupo Bracon un proyecto o marca que no es suyo.

**Hecho:**
- Se seleccionaron 22 fotos reales, se corrigió su rotación EXIF, se redimensionaron (máx. 1800px para heroes/fondos, ~900-1100px para secciones y galería) y se optimizaron a JPEG, guardadas en `assets/img/gallery/` (3.1 MB en total).
- Se actualizó **[index.html](index.html)**: las 4 imágenes del hero-slider, la foto de "Quiénes Somos", el fondo de la franja de estadísticas, el fondo de "Empresas que Confían", 2 de las 8 tarjetas del portafolio (categoría Carpintería) y la miniatura de la tarjeta de servicio "Carpintería Exterior".
- Se actualizó **[carpinteria.html](carpinteria.html)** por completo: las 4 imágenes del hero-slider, las 3 imágenes de sección (Palapas y muelles, Pérgolas y escaleras, Laminados y lambrines) y las 6 fotos de la galería.
- Las páginas de Herrería, Construcción Ligera y Maquinaria **no se tocaron** — siguen con imágenes de picsum.photos hasta que el usuario proporcione fotos reales de esos departamentos, igual que las categorías "herrería", "construcción" y "maquinaria" del portafolio en el Home.
- Se verificó sirviendo el sitio localmente que las 6 páginas y las 22 imágenes nuevas responden 200, y que no quedó ninguna referencia a picsum.photos en `index.html` ni `carpinteria.html` salvo las de los 3 departamentos sin fotos reales (confirmado explícitamente por `grep`).

**Pendiente:**
- [ ] Herrería, Construcción Ligera y Maquinaria siguen sin fotos reales — pendiente de que el usuario las proporcione cuando las tenga.
- [ ] Confirmar visualmente en navegador cómo se ven los recortes de las fotos que quedaron en orientación vertical dentro de contenedores horizontales (fondo de stats y algunas del hero), por si conviene ajustar el encuadre.
- [ ] Si el usuario reconoce alguna otra carpeta/foto de las 309 como perteneciente a otro departamento (no solo carpintería), avisar para reclasificarla.

---

## 2026-07-03 — Ajustes de fotos reales: hero sin personas/oscuridad, stats más atractivo, CTA con parallax, portafolio ampliado a 10 fotos

**Motivo:** el usuario revisó el resultado de la entrada anterior y pidió 5 correcciones puntuales: (1) la foto de "Quiénes Somos" se veía demasiado recortada/ampliada; (2) evitar fotos oscuras o con personas en el hero del Home, prefiriendo imágenes tipo paisaje; (3) el fondo de la franja de estadísticas debía ser más atractivo; (4) la sección "¿Tienes un proyecto en mente?" necesitaba una imagen de fondo con animación de scroll (parallax) igual que las otras secciones; (5) el portafolio solo mostraba 2 fotos de Carpintería siendo que hay más de 300 disponibles — pidió revisar bien y ampliar con fotos atractivas y profesionales.

**Hecho:**
- Se extrajeron y verificaron ~10 candidatas adicionales de las carpetas de Descargas (a tamaño completo, no solo miniatura) antes de decidir, para evitar repetir el error de la entrada anterior.
- **Quiénes Somos**: se reemplazó la foto (antes un recorte muy cerrado de un enrejado de madera contra el cielo) por una foto de una cuadrilla completa techando una palapa en pleno día — mejor representa "quiénes somos" como equipo.
- **Hero del Home**: se mantienen las 2 fotos ya buenas (muelle con palapa, palapa terminada) y se reemplazaron las 2 fotos oscuras/con persona por dos paisajes en pleno día sin gente en primer plano: un techo de palapa en construcción a cielo abierto y un andador de madera frente al mar.
- **Franja de estadísticas**: se cambió el fondo (antes una estructura blanca a media luz, algo apagada) por una foto vívida de un techo de palapa terminándose contra un cielo azul intenso, mucho más atractiva bajo el degradado oscuro.
- **CTA "¿Tienes un proyecto en mente?"**: se agregó una nueva clase modificadora `.cta-band-photo` en [css/styles.css](css/styles.css) (imagen de fondo + degradado + parallax, sin afectar la banda CTA de las demás páginas que no la usan) y se le puso como fondo una foto muy vistosa de una cuadrilla de 4 personas techando una palapa grande contra un cielo dramático con nubes, con el mismo `data-parallax` que ya usan Stats y Empresas que Confían.
- **Portafolio**: se amplió la categoría "Carpintería" de 2 a **10 fotos reales** distintas (detalle de ensamble, cuadrilla puliendo andador, andador curvo entre vegetación, carpintero barnizando puerta, carpintero lijando en taller, pérgola blanca frente al mar, carpintero cortando viga en altura, plafón de madera en construcción, vista interior de estructura de palapa, más la que ya existía). Herrería/Construcción/Maquinaria se mantienen en 2 cada una (siguen sin fotos reales disponibles).
- Se verificó: CSS con llaves balanceadas (254/254), `main.js` con sintaxis válida, las 19 imágenes reales referenciadas en `index.html` existen y responden 200 al servir el sitio localmente, y el conteo por categoría del portafolio quedó en 10/2/2/2.

**Pendiente:**
- [ ] Confirmar visualmente en navegador el resultado de todos estos cambios (sigue sin conexión la extensión Claude in Chrome en esta sesión).
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Nuevas fotos para CTA y Quiénes Somos (carpeta "WhatsApp Unknown 2026-07-03 at 11.56.14 PM")

**Motivo:** el usuario pidió cambiar las fotos del CTA "¿Tienes un proyecto en mente?" y de "Quiénes Somos" por cualquier foto de una carpeta nueva en Descargas: `WhatsApp Unknown 2026-07-03 at 11.56.14 PM` (26 fotos).

**Hecho:**
- Se generó una hoja de contacto (con orientación EXIF corregida) para revisar las 26 fotos antes de elegir.
- **CTA "¿Tienes un proyecto en mente?"**: se usó una foto de camas de playa (cabana beds) de madera terminadas frente al mar turquesa de Cancún — imagen vistosa y a la vez coherente con el tipo de estructuras de madera exterior que hace Grupo Bracon.
- **Quiénes Somos**: se usó una foto de un trabajador activo en una obra de pérgola/deck en construcción (con alberca cubierta, cerca de madera, palapas de fondo) — muestra trabajo real en sitio en vez de una foto de acabado final, más acorde con la sección "quiénes somos".
- Ambos archivos se guardaron sobreescribiendo los mismos nombres (`home-cta-bg.jpg`, `home-about-equipo.jpg`), por lo que no fue necesario tocar el HTML — las referencias ya existentes apuntan a estos archivos.
- Se verificó sirviendo el sitio localmente que `index.html` y las 2 imágenes nuevas responden 200.

**Nota:** esta carpeta nueva tiene el mismo estilo de fotografía muy pulida (tipo editorial/resort) que las 5 imágenes descartadas en una entrada anterior por parecer de otro negocio ("KANNA", modelo en bikini). Aquí el usuario señaló explícitamente esta carpeta como fuente autorizada, así que se usó con confianza, pero no se detectó ningún logo o marca de terceros visible en las fotos seleccionadas.

**Pendiente:**
- [ ] Confirmar visualmente en navegador cómo se ven estas dos fotos nuevas en su sección.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Asignación exacta de fotos + las 24 restantes repartidas en portafolio y página de Carpintería

**Motivo:** el usuario especificó por nombre de archivo exacto qué foto va en cada lugar: `WhatsApp Image 2026-07-03 at 11.56.04 PM (2).jpeg` para el CTA "¿Tienes un proyecto en mente?" y `WhatsApp Image 2026-07-03 at 11.56.05 PM (4).jpeg` para "Quiénes Somos"; y pidió que las 24 fotos restantes de esa misma carpeta (26 en total) se repartieran en la categoría Carpintería del portafolio del Home **y** en la página de Carpintería.

**Hecho:**
- Se identificaron los archivos exactos en el manifiesto (índice 1 y 7 de 26) y se usaron para reemplazar `home-cta-bg.jpg` (ahora una vista de embarcadero/deck de madera frente al mar) y `home-about-equipo.jpg` (ahora un trabajador caminando por una pérgola/deck en construcción, con alberca cubierta de fondo).
- Las 24 imágenes restantes se procesaron (rotación EXIF corregida, redimensionadas a 1000px, optimizadas) y se guardaron como `assets/img/gallery/carp-nuevo-1.jpg` a `carp-nuevo-24.jpg`.
- Se agregaron las 24 al **portafolio del Home** (categoría Carpintería), que pasó de 10 a **34 fotos** en esa categoría.
- Se agregaron las mismas 24 a la **galería de [carpinteria.html](carpinteria.html)**, que pasó de 6 a **30 fotos** en total.
- Se generaron textos `alt` descriptivos variados (camas de playa, palapas, pérgolas en construcción, plafones de madera, bares de palapa, etc.) en vez de repetir el mismo texto genérico.
- Se verificó: CSS con llaves balanceadas (254/254), `main.js` con sintaxis válida, las 24 imágenes nuevas existen y responden 200 al servir el sitio localmente, igual que `index.html` y `carpinteria.html`. El conteo del portafolio quedó en 34 Carpintería / 2 Herrería / 2 Construcción / 2 Maquinaria.

**Pendiente:**
- [ ] Confirmar visualmente en navegador que la galería ampliada de Carpintería (30 fotos) y el portafolio (34 en esa categoría) se ven bien y cargan con buen rendimiento.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Fotos exactas para las 3 secciones de especialidad en Carpintería

**Motivo:** el usuario especificó por nombre de archivo exacto qué foto va en cada una de las 3 secciones de [carpinteria.html](carpinteria.html): `...11.56.07 PM.jpeg` para "Palapas y muelles", `...11.56.04 PM (3).jpeg` para "Pérgolas y escaleras", y `...11.56.06 PM (3).jpeg` para "Laminados de madera y lambrines".

**Hecho:**
- Se identificaron los 3 archivos exactos en el manifiesto de la carpeta `WhatsApp Unknown 2026-07-03 at 11.56.14 PM` y se procesaron directamente (rotación EXIF corregida, redimensionadas a 1100px, optimizadas), sobrescribiendo `carp-palapas.jpg`, `carp-pergolas.jpg` y `carp-lambrines.jpg` — no fue necesario tocar el `src` en el HTML.
- Se actualizó el texto `alt` de cada una para describir con precisión el contenido real: "Bar de palapa con vista al mar al atardecer", "Escalera de madera con acabado artístico en caseta de playa", "Plafón de laminado de madera en pasillo interior".
- **Nota para el usuario:** la foto de "Pérgolas y escaleras" (la caseta de playa pintada con escalera) incluye a una persona sin camisa posando en la estructura — el mueble/escalera de madera es lo relevante y se ve bien, pero si prefieres una imagen más corporativa/sin personas para esa sección específica, avísame y la cambio por otra de las que ya tienes disponibles.
- Se verificó sirviendo el sitio localmente que `carpinteria.html` y las 3 imágenes responden 200.

**Pendiente:**
- [ ] Confirmar si la foto de "Pérgolas y escaleras" (con persona) es aceptable para el tono del sitio o si se prefiere reemplazarla.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Fondo de la franja de estadísticas actualizado con foto exacta

**Motivo:** el usuario pidió usar `WhatsApp Image 2026-07-03 at 11.56.05 PM.jpeg` (de la misma carpeta) como fondo de la franja de estadísticas del Home (+12, +300, 5, 100%).

**Hecho:**
- Se procesó el archivo exacto (rotación EXIF corregida, redimensionada a 1800px) y se guardó sobrescribiendo `home-stats-bg.jpg` — no fue necesario tocar el HTML.
- La foto muestra camas de playa de madera bajo palmeras frente a un mar turquesa vívido, mucho más atractiva que la anterior.
- Se verificó sirviendo el sitio localmente que `index.html` y la imagen responden 200.

**Pendiente:**
- [ ] Confirmar si la foto de "Pérgolas y escaleras" (con persona) es aceptable para el tono del sitio o si se prefiere reemplazarla.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Portafolio del Home limitado a 4 fotos por especialidad

**Motivo:** el usuario mandó captura mostrando que la vista "Todos" del portafolio se veía saturada, con las 34 fotos de Carpintería (más placeholders random de picsum.photos para Herrería/Construcción/Maquinaria — olas, ejotes, un lago con montaña, tornillos). Pidió que se muestren máximo 4 por área.

**Hecho:**
- Se redujo la categoría Carpintería del portafolio de **34 a 4 fotos**, eligiendo las más atractivas y representativas: el andador de madera a contraluz (`home-portfolio-carp-1.jpg`), la pérgola blanca frente al mar (`portfolio-carp-8.jpg`), la vista interior simétrica de una estructura de palapa (`portfolio-carp-11.jpg`) y las camas de playa bajo palmeras (`carp-nuevo-4.jpg`).
- Herrería, Construcción y Maquinaria ya tenían 2 cada una (dentro del límite de 4), así que no se tocaron.
- El portafolio del Home quedó en **10 tarjetas totales** (4 Carpintería + 2 + 2 + 2). La galería completa de 30 fotos sigue disponible en [carpinteria.html](carpinteria.html) para quien quiera ver más.
- Se verificó: el bloque `portfolio-grid` quedó con las etiquetas `<a>` balanceadas (10/10), CSS con llaves balanceadas (254/254), `main.js` con sintaxis válida, y las 4 imágenes de Carpintería seleccionadas responden 200 al servir el sitio localmente.

**Nota:** las imágenes "raras" que se ven en Herrería/Construcción/Maquinaria (olas, vegetales, paisaje de montaña, tornillos) son placeholders aleatorios de picsum.photos — el mismo problema de imágenes irrelevantes de entradas anteriores. Seguirán así hasta que el usuario proporcione fotos reales de esos departamentos, o hasta que pida cambiar la estrategia de placeholder.

**Pendiente:**
- [ ] Confirmar si la foto de "Pérgolas y escaleras" (con persona) es aceptable para el tono del sitio o si se prefiere reemplazarla.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria — sus placeholders de picsum siguen mostrando contenido irrelevante.

---

## 2026-07-04 — Eliminadas 11 fotos marcadas con X de la galería de Carpintería

**Motivo:** el usuario mandó una captura de la sección "Trabajos en madera" de [carpinteria.html](carpinteria.html) con 11 fotos marcadas manualmente con una X verde, pidiendo eliminarlas.

**Hecho:**
- Se generó una hoja de contacto numerada con las 30 fotos exactamente en el orden en que aparecen en el HTML (respetando que la primera es la imagen grande destacada) para mapear con precisión la posición de cada X en la cuadrícula de 4 columnas contra el archivo real.
- Se eliminaron del `gallery-grid` las siguientes 11 imágenes: `carp-gallery-2.jpg`, `carp-gallery-3.jpg`, `carp-gallery-4.jpg`, `carp-gallery-5.jpg`, `carp-nuevo-2.jpg`, `carp-nuevo-11.jpg`, `carp-nuevo-12.jpg`, `carp-nuevo-15.jpg`, `carp-nuevo-17.jpg`, `carp-nuevo-19.jpg`, `carp-nuevo-20.jpg`.
- La galería de Carpintería quedó con **19 fotos** (antes 30). Los archivos de imagen no se borraron del disco (siguen en `assets/img/gallery/`), solo se quitó su referencia del HTML, por si se quieren reutilizar en otro lado.
- Se verificó: `carpinteria.html` responde 200, el conteo de items coincide (18 regulares + 1 grande = 19), CSS con llaves balanceadas (254/254), `main.js` con sintaxis válida, y ninguna de las 11 imágenes eliminadas quedó referenciada en el archivo.

**Nota:** el mapeo de posición-a-archivo se hizo con cuidado dada la cantidad de fotos similares (varias del mismo "sombrilla/tripié de madera" y varias de "cabañas de playa" que se ven parecidas entre sí). Si alguna de las 11 eliminadas no era la que querías, o si falta quitar alguna, avisa con el nombre visible en la miniatura y se corrige.

**Pendiente:**
- [ ] Confirmar que las 11 fotos correctas fueron las eliminadas (hay varias imágenes similares entre sí que podrían confundirse).
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Quitada la imagen grande destacada y una foto duplicada de la galería

**Motivo:** el usuario señaló que la primera foto (grande, destacada) debía quitarse, y que había una foto duplicada (dos veces la misma palapa de noche) en la galería de Carpintería.

**Hecho:**
- Se eliminó `carp-gallery-1.jpg` (la foto grande destacada, vigas de madera de un plafón) y `carp-nuevo-3.jpg` (duplicado exacto de la palapa iluminada de noche que también aparece en `carp-gallery-6.jpg`).
- La foto `carp-gallery-6.jpg` (la palapa de noche que quedó única) se promovió automáticamente a la posición destacada ("grande") que dejó vacante la imagen eliminada.
- La galería de Carpintería quedó en **17 fotos** (antes 19).
- Se verificó: `carpinteria.html` responde 200, CSS con llaves balanceadas (254/254), `main.js` con sintaxis válida, y el conteo de items coincide (16 regulares + 1 grande = 17).

**Pendiente:**
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — 4 fotos nuevas + tarjeta "Ver más" en el portafolio (Carpintería)

**Motivo:** el usuario pidió reemplazar las 4 fotos de Carpintería del portafolio del Home por 4 de la carpeta nueva ("carp-nuevo"), y agregar una tarjeta que al pasar el cursor muestre un botón "Ver más" que redirija a la página de Carpintería.

**Hecho:**
- Se reemplazaron las 4 fotos de Carpintería del portafolio por: cama de playa terminada (`carp-nuevo-1.jpg`), andador de bambú hacia palapas (`carp-nuevo-6.jpg`), plafón de madera en pasillo (`carp-nuevo-10.jpg`) y bar de palapa terminado (`carp-nuevo-24.jpg`).
- Se agregó una 5ª tarjeta en la categoría Carpintería: un enlace directo a [carpinteria.html](carpinteria.html) con una foto de fondo y un overlay oscuro con botón "Ver más" (con ícono de flecha) que se resalta en dorado al pasar el cursor — mismo comportamiento de "aparecer más" que ya tenían las etiquetas de categoría en las demás tarjetas.
- Se agregaron las reglas `.portfolio-more-overlay` y `.portfolio-more-btn` en [css/styles.css](css/styles.css).
- Se verificó: el portafolio quedó con 5 tarjetas de Carpintería (4 fotos + 1 "Ver más") y 2 cada una de las demás categorías, CSS con llaves balanceadas (259/259), `main.js` con sintaxis válida (no requirió cambios, el filtrado ya funciona por `data-category`), y las 5 imágenes nuevas responden 200 al servir el sitio localmente.

**Pendiente:**
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Fondo con parallax en el CTA de Carpintería

**Motivo:** el usuario pidió poner `WhatsApp Image 2026-07-03 at 11.56.05 PM.jpeg` (la misma foto de camas de playa bajo palmeras usada como fondo de estadísticas del Home) como fondo del CTA "¿Listo para tu proyecto en madera?" en [carpinteria.html](carpinteria.html), con la misma animación de scroll (parallax) que ya tienen las demás secciones.

**Hecho:**
- Se procesó el archivo exacto en una copia dedicada (`carp-cta-bg.jpg`, 1800px, rotación EXIF corregida) para mantener organizado el nombre por página.
- Se aplicó la clase `.cta-band-photo` (ya existente en el CSS desde que se implementó en el CTA del Home) al `cta-band` de esta página, agregando el div de fondo con `data-parallax="0.2"` y el overlay oscuro — no fue necesario tocar el CSS ni el JS, ambos ya soportan este patrón de forma genérica.
- Se verificó: CSS con llaves balanceadas (259/259), `main.js` con sintaxis válida, y `carpinteria.html` junto con la nueva imagen responden 200 al servir el sitio localmente.

**Pendiente:**
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Segunda ronda: 8 fotos más eliminadas de la galería de Carpintería

**Motivo:** el usuario mandó otra captura de "Trabajos en madera" con 8 fotos más marcadas con X para eliminar.

**Hecho:**
- Se generó una nueva hoja de contacto numerada con el orden exacto de las 17 fotos que quedaban, para mapear cada X con precisión antes de tocar el HTML.
- Se eliminaron: `carp-gallery-6.jpg` (la palapa de noche, que era la imagen grande destacada), `carp-nuevo-6.jpg`, `carp-nuevo-8.jpg`, `carp-nuevo-9.jpg`, `carp-nuevo-14.jpg`, `carp-nuevo-16.jpg`, `carp-nuevo-21.jpg` y `carp-nuevo-22.jpg`.
- Como se eliminó la imagen grande, `carp-nuevo-1.jpg` (cama de playa) se promovió automáticamente a la posición destacada.
- La galería de Carpintería quedó en **9 fotos** (antes 17).
- Se verificó: `carpinteria.html` responde 200, CSS con llaves balanceadas (259/259), `main.js` con sintaxis válida, y el conteo de items coincide (8 regulares + 1 grande = 9).

**Pendiente:**
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Portafolio: "Ver más" ahora aparece al pasar el cursor sobre cualquiera de las 4 fotos

**Motivo:** el usuario señaló que en la categoría Carpintería del portafolio aparecían 5 tarjetas (4 fotos + 1 tarjeta separada de "Ver más" con el botón siempre visible). Pidió que solo aparezcan las 4 fotos, y que el botón "Ver más" se muestre únicamente al pasar el cursor sobre cualquiera de esas 4, no como una tarjeta aparte.

**Hecho:**
- Se eliminó la 5ª tarjeta dedicada de "Ver más".
- Las 4 fotos de Carpintería ahora tienen individualmente el overlay "Ver más" (enlazando a [carpinteria.html](carpinteria.html)): el botón permanece oculto por defecto y solo aparece con una transición suave cuando el cursor pasa sobre la foto correspondiente.
- En [css/styles.css](css/styles.css) se ajustó `.portfolio-more-overlay` (ahora `opacity:0` y `pointer-events:none` por defecto, visible solo en `:hover`) y `.portfolio-more-btn` (ahora dorado desde el inicio, ya no cambia de blanco a dorado, ya que solo se ve al hacer hover).
- Se verificó: el portafolio quedó con exactamente 4 tarjetas de Carpintería (todas con la clase `portfolio-more`), CSS con llaves balanceadas (259/259), `main.js` con sintaxis válida, e `index.html` responde 200 al servir el sitio localmente.

**Pendiente:**
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — El hero de Carpintería ahora solo usa fotos de su propia galería

**Motivo:** el usuario señaló que el carrusel del hero de [carpinteria.html](carpinteria.html) mostraba 4 fotos que no pertenecían a la galería "Trabajos en madera" de esa misma página. Pidió que el hero solo muestre imágenes que sí estén disponibles en su galería.

**Hecho:**
- Se identificaron las 9 fotos actuales de la galería de esta página (`carp-nuevo-1` [destacada], `4, 5, 7, 10, 13, 18, 23, 24`).
- Se reprocesaron 4 de esas mismas fotos a mayor resolución (1800px, para calidad de fondo de hero) y se sobrescribieron los archivos del carrusel: `carp-hero-1-estructura.jpg` (= cama de playa, misma foto que `carp-nuevo-1`), `carp-hero-2-cabanas.jpg` (= `carp-nuevo-5`, arco de bambú), `carp-hero-3-pergola.jpg` (= `carp-nuevo-18`, también usada en la sección "Palapas y muelles"), `carp-hero-4-andamio.jpg` (= `carp-nuevo-24`, bar de palapa terminado).
- No fue necesario tocar el HTML del hero (los `<div class="hero-slide">` ya apuntaban a esos nombres de archivo, solo se reemplazó el contenido).
- Se verificó viendo las imágenes resultantes que su contenido coincide con las fotos correspondientes de la galería, y sirviendo el sitio localmente que `carpinteria.html` y las 4 imágenes responden 200.

**Pendiente:**
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Portafolio del Home: Herrería/Construcción/Maquinaria ahora coinciden con la galería de cada página

**Motivo:** el usuario notó que en la vista "Todos" del portafolio del Home aparecían fotos random irrelevantes (olas, una roca en el mar, una ventana oscura, ejotes, un lago con montaña, clavijas de guitarra) para Herrería, Construcción y Maquinaria, que no coincidían con las imágenes que esas mismas páginas usan en su propia galería.

**Causa raíz:** el portafolio del Home usaba seeds de picsum.photos genéricos (`bracon-g2`, `bracon-g3`, `bracon-g4`, `bracon-g6`) que nunca se usan en ninguna otra parte del sitio, mientras que [herreria.html](herreria.html), [construccion.html](construccion.html) y [maquinaria.html](maquinaria.html) tienen su propia galería con seeds distintos (`bracon-hg1-6`, `bracon-cg-1-6`, `bracon-mg1-6`).

**Hecho:**
- Se reemplazaron los 6 seeds del portafolio para que coincidan exactamente con imágenes que sí existen en la galería de cada página respectiva:
  - Herrería: `bracon-g2`→`bracon-hg1`, `bracon-g6`→`bracon-hg2`
  - Construcción: `bracon-g3`→`bracon-cg-2` (se dejó `bracon-cg-1` igual, ya coincidía)
  - Maquinaria: `bracon-g4`→`bracon-mg2` (se dejó `bracon-mg1` igual, ya coincidía)
- Ahora, igual que con Carpintería, cada categoría del portafolio del Home muestra fotos que sí están disponibles en la galería de su página correspondiente — sigue siendo contenido de relleno de picsum.photos (no hay fotos reales de esos 3 departamentos), pero al menos es consistente entre el portafolio y la página de cada especialidad.
- Se verificó: CSS con llaves balanceadas (259/259), `main.js` con sintaxis válida, e `index.html` responde 200 al servir el sitio localmente.

**Pendiente:**
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Hero del Home: 2 fotos por cada área, tomadas de su galería actual

**Motivo:** el usuario pidió que el carrusel del hero del Home muestre 2 fotos de cada especialidad (Carpintería, Herrería, Construcción, Maquinaria), y que sean imágenes que sí estén en la galería actual de cada página respectiva — mismo criterio de consistencia que se aplicó antes al portafolio.

**Hecho:**
- El hero pasó de 4 a **8 slides** (2 por cada una de las 4 especialidades):
  - Carpintería: `carp-nuevo-1.jpg` y `carp-nuevo-18.jpg` (fotos reales, ambas están en la galería de [carpinteria.html](carpinteria.html)).
  - Herrería: seeds `bracon-hg1` y `bracon-hg4` (coinciden con la galería de [herreria.html](herreria.html)).
  - Construcción: seeds `bracon-cg-1` y `bracon-cg-4` (coinciden con la galería de [construccion.html](construccion.html)).
  - Maquinaria: seeds `bracon-mg1` y `bracon-mg4` (coinciden con la galería de [maquinaria.html](maquinaria.html)).
- Se ajustaron los `.hero-dots` de 4 a 8 botones para que coincidan uno a uno con los slides.
- Se eliminaron los 4 archivos de imagen del hero anterior (`home-hero-1-muelle.jpg`, `home-hero-2-palapa.jpg`, `home-hero-3-techo.jpg`, `home-hero-4-andador.jpg`) ya que quedaron huérfanos (ninguna página los sigue referenciando).
- Se verificó: CSS con llaves balanceadas (259/259), `main.js` con sintaxis válida (el carrusel ya soporta cualquier número de slides de forma genérica), conteo de slides (8) y dots (8) coincide, e `index.html` junto con las fotos reales de carpintería responden 200 al servir el sitio localmente.

**Pendiente:**
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria (sus 2 slides del hero siguen siendo picsum, consistentes con su propia galería).

---

## 2026-07-04 — Auditoría del portafolio: encontrada y corregida una imagen desactualizada

**Motivo:** el usuario pidió revisar bien que el portafolio del Home use exclusivamente imágenes que sí estén disponibles actualmente en la galería de cada especialidad, no imágenes viejas que ya se hayan quitado.

**Hecho:**
- Se hizo una auditoría automática comparando cada una de las 10 imágenes del portafolio contra la lista actual y real de la galería de su página correspondiente (`carp-nuevo-1/4/5/7/10/13/18/23/24` para Carpintería; `bracon-hg1-6`, `bracon-cg-1..6`, `bracon-mg1-6` para las otras 3).
- Se encontró **1 imagen desactualizada**: la tarjeta de Carpintería usaba `carp-nuevo-6.jpg` ("Andador de bambú hacia zona de palapas"), que ya se había quitado de la galería de [carpinteria.html](carpinteria.html) en una ronda de limpieza anterior (cuando se eliminaron las fotos marcadas con X). Se reemplazó por `carp-nuevo-5.jpg` ("Arco de bambú decorativo entre palmeras"), que sí está presente en la galería actual.
- Se reconfirmó que las 6 tarjetas de Herrería/Construcción/Maquinaria y las 2 fotos reales del hero de Carpintería seguían correctas (ya se habían corregido en entradas previas).
- Se verificó con un script de auditoría que las **10 imágenes del portafolio dan "OK"** contra la galería real de su departamento (0 desactualizadas), y que CSS (259/259), `main.js` e `index.html` siguen respondiendo correctamente al servir el sitio localmente.

**Pendiente:**
- [ ] Cada vez que se agregue o quite una foto de la galería de alguna página, recordar auditar también el portafolio del Home para mantener la consistencia.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Etiqueta de especialidad agregada a las tarjetas "Ver más" del portafolio

**Motivo:** el usuario mostró una captura de una tarjeta del portafolio (Herrería) donde la etiqueta con el nombre de la especialidad aparece en la esquina inferior izquierda al hacer hover, y pidió que las tarjetas de Carpintería (que solo mostraban el botón "Ver más" centrado) también tuvieran esa etiqueta.

**Hecho:**
- Se agregó `<span class="portfolio-tag">Carpintería</span>` a las 4 tarjetas de Carpintería del portafolio, además del botón "Ver más" que ya tenían — ahora al pasar el cursor se ven ambos: el botón centrado y la etiqueta "Carpintería" en la esquina inferior izquierda, igual que en Herrería/Construcción/Maquinaria.
- Se subió el `z-index` de `.portfolio-tag` de 1 a 3 en [css/styles.css](css/styles.css) para que quede por encima del overlay oscuro semitransparente del botón "Ver más" y no se vea opacada/atenuada por él.
- Se verificó: las 4 tarjetas de Carpintería tienen tanto el botón como la etiqueta (confirmado por script), CSS con llaves balanceadas (259/259), `main.js` con sintaxis válida, e `index.html` responde 200 al servir el sitio localmente.

**Pendiente:**
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Diseño "Ver más" + etiqueta sincronizado en TODAS las tarjetas del portafolio

**Motivo:** el usuario pidió que el mismo diseño que ya tenía Carpintería (botón "Ver más" centrado + etiqueta de especialidad en la esquina) se aplique de forma sincronizada a las 10 tarjetas del portafolio, cada una enlazando a su departamento correspondiente.

**Hecho:**
- Se convirtieron las 6 tarjetas restantes (2 de Herrería, 2 de Construcción, 2 de Maquinaria) al mismo patrón que ya tenían las 4 de Carpintería:
  - `href="#"` → `href="herreria.html"` / `"construccion.html"` / `"maquinaria.html"` según corresponda.
  - Se agregó la clase `portfolio-more` y el overlay con el botón dorado "Ver más" (oculto por defecto, visible solo al pasar el cursor).
  - Se conservó la etiqueta de especialidad ("Herrería", "Construcción", "Maquinaria") en la esquina inferior izquierda.
- Ahora las **10 tarjetas del portafolio** tienen el mismo comportamiento: al pasar el cursor sobre cualquiera, aparecen el botón "Ver más" y la etiqueta de su especialidad, y al hacer clic llevan a la página de ese departamento.
- Se verificó: los 10 enlaces (`href`) apuntan correctamente a `carpinteria.html`, `herreria.html`, `construccion.html` o `maquinaria.html` según su categoría; las 10 tarjetas tienen tanto el botón como la etiqueta; CSS con llaves balanceadas (259/259); `main.js` con sintaxis válida; e `index.html` responde 200 al servir el sitio localmente.

**Pendiente:**
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Lightbox (visor de fotos tipo álbum) en todas las galerías del sitio

**Motivo:** el usuario pidió que al hacer clic en cualquier foto de la galería "Trabajos en madera" se abra una animación tipo álbum/libro de fotos que permita hacer scroll o arrastrar entre las imágenes para verlas más de cerca, con opción de cerrar.

**Hecho:**
- Se implementó `initLightbox()` en [js/main.js](js/main.js): busca todos los enlaces dentro de `.gallery-grid` en la página (sin necesidad de tocar el HTML de cada página), construye dinámicamente un visor de pantalla completa con todas las fotos de esa galería en orden, y engancha el clic de cada miniatura para abrirlo en la foto correspondiente.
- El visor incluye: botón de cerrar (✕), flechas prev/next, contador "X / Y", cierre con tecla `Escape`, navegación con flechas del teclado, **arrastre con mouse o dedo** (swipe) para pasar de foto, y **scroll del mouse/trackpad** para avanzar o retroceder. También se cierra haciendo clic fuera de la foto.
- Como la función busca genéricamente `.gallery-grid a`, **funciona automáticamente en las 4 páginas** que tienen galería: [carpinteria.html](carpinteria.html), [herreria.html](herreria.html), [construccion.html](construccion.html) y [maquinaria.html](maquinaria.html) — no fue necesario duplicar código por página.
- Se agregaron los estilos del lightbox en [css/styles.css](css/styles.css) (fondo oscuro a pantalla completa, transición de apertura/cierre, controles circulares con el mismo lenguaje visual del resto del sitio) y se cambió el cursor de las miniaturas de la galería a `zoom-in` para indicar que son clicables.
- Se verificó: CSS con llaves balanceadas (279/279), `main.js` con sintaxis válida, y las 4 páginas con galería responden 200 al servir el sitio localmente. No se pudo probar la interacción (clic, arrastre) en un navegador real porque la extensión Claude in Chrome sigue sin conectar en esta sesión.

**Pendiente:**
- [ ] Probar en un navegador real que el lightbox abre, cierra, arrastra y responde al scroll correctamente en las 4 páginas.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — El lightbox ahora pasa las páginas como una hoja real (efecto libro 3D)

**Motivo:** el usuario pidió que la transición entre fotos del visor no fuera un simple deslizamiento, sino literalmente una animación de "pasar página" — como si cada foto fuera una hoja física girando sobre una bisagra, de forma detallada y profesional.

**Hecho:**
- Se reescribió por completo el mecanismo del lightbox en [js/main.js](js/main.js): ya no usa un riel deslizante (`translateX`), ahora usa dos capas apiladas (`lightbox-page-under` y `lightbox-page-over`) dentro de un contenedor con `perspective` 3D (`lightbox-book`).
- La foto de encima (`page-over`) gira en el eje Y sobre una bisagra real (`transform-origin: left` o `right`, según la dirección) de 0° a 180°, con `backface-visibility: hidden` para que, al pasar de los 90°, la hoja "desaparezca" y deje ver la siguiente foto que ya estaba fija debajo — el mismo truco que usan los efectos de "flipbook" reales.
- Se agregó una sombra de degradado en el borde de la hoja que se intensifica mientras gira, simulando cómo la luz incide sobre el papel al doblarse.
- **Arrastrar ahora controla el ángulo de giro en tiempo real**: mientras se arrastra, la hoja gira proporcionalmente a la distancia arrastrada; si se suelta habiendo girado más de 60°, la página termina de girar sola (con animación); si se suelta antes, la hoja regresa a su posición.
- El scroll del mouse/trackpad y las flechas siguen funcionando igual, ahora disparando el mismo giro de hoja en vez de un deslizamiento.
- Se actualizó [css/styles.css](css/styles.css): se reemplazaron las reglas del riel/slides por `.lightbox-book`, `.lightbox-page`, `.lightbox-page-under/over` y la sombra dinámica basada en una variable CSS (`--shadow-opacity`).
- Se verificó: CSS con llaves balanceadas (285/285), `main.js` con sintaxis válida, y las 4 páginas con galería responden 200 al servir el sitio localmente. No se pudo probar la animación real (el giro 3D, el arrastre) en navegador porque la extensión Claude in Chrome sigue sin conectar en esta sesión.

**Pendiente:**
- [ ] Probar en un navegador real el efecto de pasar página: que el giro se vea con volumen/perspectiva convincente, que el arrastre se sienta natural, y que no haya parpadeos al completar el giro.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Fix: tamaño estándar fijo en el visor de fotos (lightbox)

**Motivo:** el usuario mandó capturas mostrando que el visor de fotos se veía inconsistente: al mostrar fotos horizontales y verticales mezcladas, cada una ocupaba un tamaño distinto dentro del recuadro, dejando huecos donde se alcanzaba a ver el contenido de la página detrás (el menú de navegación, otras miniaturas de la galería), en vez de un marco oscuro limpio y uniforme.

**Causa raíz:** las imágenes usaban `object-fit: contain` (ajustar sin recortar) dentro de un contenedor flexible — como las fotos reales tienen orientaciones mixtas (algunas verticales, otras horizontales), cada una terminaba ocupando un área distinta, y el fondo del visor no se sentía como un marco sólido y consistente.

**Hecho:**
- Se rediseñó `.lightbox-book` en [css/styles.css](css/styles.css) como un **marco de tamaño fijo y estándar** (`880px × 620px`, o `84vw × 72vh` en pantallas chicas — el que sea menor), en vez de un tamaño que dependía del contenido.
- Las fotos ahora usan `object-fit: cover` en vez de `contain`: cada imagen se recorta automáticamente para llenar por completo ese mismo marco estándar, sin importar si es vertical u horizontal — mismo tamaño y forma siempre, como una ventana fija por la que se ve cada foto.
- Se le dio al marco (`.lightbox-page`) su propio `border-radius`, `overflow:hidden` y sombra, en vez de aplicarlo a la imagen suelta, para que el recorte se vea limpio y con esquinas redondeadas consistentes.
- Se cambió el fondo del visor de un negro semitransparente (`rgba(...,0.95)`) a un color sólido (`var(--navy-950)`) y se subió su `z-index` a 9999, para eliminar cualquier sensación de "transparencia" o contenido de la página asomándose detrás.
- Se limpió una regla de `padding` en `.lightbox-page` que ya no aplicaba (el recorte por `cover` no necesita ese espaciado) y se ajustó el tamaño del marco para móvil.
- Se verificó: CSS con llaves balanceadas (284/284), `main.js` con sintaxis válida, y las 4 páginas con galería responden 200 al servir el sitio localmente.

**Pendiente:**
- [ ] Confirmar en navegador que ahora todas las fotos del visor se ven del mismo tamaño y sin que se asome contenido de la página detrás, sin importar si la foto original es vertical u horizontal.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-04 — Diseño de Carpintería sincronizado con Herrería, Construcción y Maquinaria

**Motivo:** el usuario pidió que todo lo implementado en la página de Carpintería (la animación de pasar página tipo libro en la galería, el CTA con foto de fondo y parallax, y demás cambios nuevos) esté igual en las otras 3 páginas de especialidad.

**Revisión hecha:**
- **Lightbox tipo libro**: ya estaba compartido automáticamente — `initLightbox()` en [js/main.js](js/main.js) busca `.gallery-grid a` en cualquier página, así que ya funcionaba en Herrería, Construcción y Maquinaria sin necesidad de cambios (las 4 páginas cargan `js/main.js` y las 4 tienen su propia `.gallery-grid`).
- **CTA con foto de fondo + parallax**: esto sí solo estaba en Carpintería. Se agregó la misma estructura (`cta-band-photo`, `cta-band-bg` con `data-parallax="0.2"`, `cta-band-overlay`) a las 3 páginas restantes, cada una con una imagen de fondo tomada de su propia galería (consistente con el criterio ya aplicado antes):
  - [herreria.html](herreria.html): seed `bracon-hg3`.
  - [construccion.html](construccion.html): seed `bracon-cg-3`.
  - [maquinaria.html](maquinaria.html): seed `bracon-mg3`.
- Se comparó la lista completa de clases CSS usadas en `carpinteria.html` contra las otras 3 páginas: **coinciden exactamente** (la única diferencia, `reverse`, es solo una variante de diseño de sección alterna que no tiene relación con lo pedido).
- Se verificó: CSS con llaves balanceadas (284/284, sin cambios ya que las clases usadas ya existían), `main.js` con sintaxis válida, y las 3 páginas responden 200 al servir el sitio localmente.

**Pendiente:**
- [ ] Confirmar en navegador que el CTA con parallax se ve y se siente igual en las 4 páginas.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria (sus CTAs nuevos siguen usando picsum, consistente con el resto de cada página).

---

## 2026-07-04 — Sección "Opiniones de Nuestros Clientes" agregada al Home

**Motivo:** el usuario pidió una sección profesional de testimonios/reseñas de clientes, con estrellas y comentarios, dejando contenido ficticio por ahora (a reemplazar cuando el usuario tenga reseñas reales).

**Hecho:**
- Se agregó la sección en [index.html](index.html), ubicada después de "Empresas que Confían en Nuestro Trabajo" y antes del CTA final — funciona como el último empujón de confianza (reseñas de clientes reales) justo antes de pedir el contacto.
- 4 tarjetas de testimonio, una por cada especialidad (Carpintería, Herrería, Construcción Ligera, Maquinaria), cada una con: 5 estrellas doradas (ícono de Heroicons relleno, no emoji), una cita entre comillas mencionando el servicio contratado, un avatar circular con iniciales, nombre y ciudad/especialidad. Nombres y comentarios son **completamente ficticios**, marcados así en este registro para que se reemplacen por reseñas reales de clientes cuando el usuario las tenga.
- Se agregaron las reglas `.testimonials-grid`, `.testimonial-card`, `.testimonial-stars`, `.testimonial-quote`, `.testimonial-author`, `.testimonial-avatar` en [css/styles.css](css/styles.css), con el mismo lenguaje visual del resto del sitio (tarjetas blancas, sombra suave, hover con elevación, avatar en degradado navy/dorado).
- Se verificó: CSS con llaves balanceadas (294/294), `main.js` sin cambios y con sintaxis válida, 4 tarjetas de testimonio presentes, los 20 SVG de estrellas (5 por tarjeta × 4) son XML válido, e `index.html` responde 200 al servir el sitio localmente.

**Pendiente:**
- [ ] Reemplazar los 4 testimonios ficticios (Roberto Chan, Mariana Itzá, Lucía Domínguez, Ing. Fernando Poot) por reseñas reales de clientes cuando el usuario las tenga — nombres, fotos/avatares y comentarios.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-05 — Portafolio del Home: mínimo 4 tarjetas por categoría

**Motivo:** el usuario pidió que, igual que en las galerías de cada página, el portafolio del Home tenga como mínimo 4 tarjetas por especialidad (aunque sean de relleno), sin tocar las categorías que ya cumplieran el mínimo.

**Hecho:**
- Se verificó el conteo exacto por categoría: Carpintería ya tenía 4 (no se tocó). Herrería, Construcción y Maquinaria tenían solo 2 cada una.
- Se agregaron 2 tarjetas más a cada una de esas 3 categorías, usando imágenes de sus propias galerías (mismo criterio de consistencia ya establecido): Herrería (`bracon-hg3`, `bracon-hg4`), Construcción (`bracon-cg-3`, `bracon-cg-4`), Maquinaria (`bracon-mg3`, `bracon-mg4`) — todas con el mismo diseño sincronizado (botón "Ver más" + etiqueta + enlace a su página).
- El portafolio quedó con **4 tarjetas exactas por cada una de las 4 categorías** (16 en total).
- Se verificó: CSS con llaves balanceadas (294/294, sin cambios), `main.js` con sintaxis válida, e `index.html` responde 200 al servir el sitio localmente.

**Pendiente:**
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.

---

## 2026-07-05 — Auditoría de responsividad 100% (todas las páginas, todos los tamaños de pantalla)

**Motivo:** el usuario pidió hacer el sitio 100% responsivo en cada detalle, "cada esquina cada rincón", con UX profesional y funcional — cubriendo desde teléfonos pequeños hasta escritorio.

**Hecho:**
- Se instaló Playwright + Chromium (`npx playwright install chromium --with-deps`) para poder probar el sitio en un navegador real (headless), en lugar de depender solo de revisión estática de código.
- Se revisaron y corrigieron en [css/styles.css](css/styles.css) varios problemas reales de UX/responsividad:
  - `.nav-toggle` (botón de menú hamburguesa) tenía un área táctil de apenas ~26×17px; se amplió a 44×44px (mínimo recomendado de accesibilidad) sin cambiar el ícono visual.
  - Los puntos del carrusel del hero (`.hero-dots button`, de solo 9px) tenían un área de toque diminuta; se agregó un `::before` invisible que amplía la zona táctil a ~37×37px.
  - `.stats-photo` y `.brands` nunca reducían su padding en móvil por un bug de especificidad CSS: la regla de clase (`padding:80px 0`) siempre le ganaba a la regla genérica `section{padding:60px 0}` dentro del media query, sin importar el ancho de pantalla. Se corrigió agregando overrides explícitos para ambas clases dentro de su propio media query.
  - El menú, CTA final, tarjetas de contacto y formulario, y la cuadrícula de galería/portafolio recibieron ajustes finos de padding, gap y columnas en breakpoints de 480px y 420px que antes no existían.
  - Etiquetas y botón "Ver más" del portafolio, que solo aparecían con `:hover`, quedaban invisibles en pantallas táctiles (no existe hover real). Se agregó un bloque `@media (hover: none)` que los muestra siempre, de forma discreta, en dispositivos táctiles.
  - `.wa-float` (botón flotante de WhatsApp) se redujo ligeramente en pantallas muy pequeñas para no tapar contenido.
- **Bug real encontrado y corregido con pruebas en navegador (no visible con solo revisión de código):** en [contacto.html](contacto.html), a 320–375px de ancho, la página tenía scroll horizontal de hasta 116px. La causa: el correo `contacto@grupobracon.com` es una sola palabra sin espacios, y por el comportamiento por defecto de CSS Grid/Flexbox (`min-width: auto`), esto forzaba que `.info-card` y `.form-card` crecieran más allá de su columna. Un segundo caso idéntico apareció en el `<select>` del formulario por la opción larga "Carpintería exterior y acabados de madera", que empujaba el ancho del campo. Se corrigió con `min-width: 0` en `.contact-wrap > *`, `.info-card`, `.form-card`, `.field` y `.field input/select/textarea` (más `width:100%` explícito en los controles), y con `overflow-wrap: anywhere` en `.info-row span` y `.footer-col a` para que cualquier texto largo se parta en vez de forzar overflow.
- **Verificación con Playwright real (no solo estática):**
  - Script de auditoría de overflow horizontal en las 6 páginas × 5 anchos de pantalla (320, 375, 768, 1024, 1440px): **30/30 sin overflow horizontal y sin errores de consola**, tras la corrección.
  - Menú móvil: se probó abrir y cerrar el menú hamburguesa (clase `.open`, transform, enlaces visibles) — funciona correctamente.
  - Filtro de portafolio (Home): clic en filtro reduce correctamente los elementos visibles (16 totales → 4 visibles al filtrar).
  - Lightbox (páginas de departamento): se abre al hacer clic en una foto de galería, se cierra con `Escape`, y se confirmó que **no bloquea clics** en el contenido de abajo una vez cerrado (aunque queda con `pointer-events:auto`, el `visibility:hidden` ya excluye el elemento del hit-testing del navegador).
  - Formulario de contacto a 375px: los 4 campos se apilan correctamente a una sola columna, con ancho idéntico (273px) y sin desbordar.
  - Se tomaron capturas de pantalla reales (mobile y tablet) como evidencia visual final.
- Verificación final: CSS con llaves balanceadas (335/335), `main.js` con sintaxis válida.
- **Cambios sin subir a GitHub todavía** — pendiente decidir si se hace commit + push de esta sesión.

**Pendiente:**
- [ ] Confirmar con el usuario si se hace commit + push de los cambios de responsividad a `https://github.com/GussGtz/Bracon.git`.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.
- [ ] Número de WhatsApp, correo, dirección y testimonios siguen siendo datos de relleno (placeholders) pendientes de reemplazar por los reales del cliente.

---

## 2026-07-05 — Corrección de 3 reportes del usuario tras la auditoría de responsividad

**Motivo:** el usuario probó el sitio y reportó 3 problemas con capturas de pantalla: (1) las fotos del portafolio no se veían en la vista "Todos", (2) la etiqueta y el botón "Ver más" del portafolio aparecían encimados y de forma permanente en vez de solo al pasar el cursor, y (3) el menú se veía descuadrado en medio del footer al hacer scroll.

**Hecho:**
- **Bug real (portafolio en blanco):** en [js/main.js](js/main.js), la función `initReveal()` (animación de aparición al hacer scroll) usaba `threshold: 0.15`, es decir, el elemento necesitaba tener 15% de su propia altura visible en pantalla para activarse. El contenedor `.portfolio-grid` mide ~5500px de alto en móvil, así que ese 15% (~825px) nunca cabe dentro de una pantalla de ~800px de alto — la animación **nunca se disparaba** y la sección quedaba en opacidad 0 (blanco) para siempre. Se cambió a `threshold: 0` (se activa con solo 1px visible), que funciona igual de bien para elementos pequeños y ahora también para los grandes. Se verificó con Playwright real haciendo scroll completo por la página: los 27 elementos con animación de aparición (incluyendo el portafolio) ahora se activan correctamente.
- **Encimado de etiqueta/botón:** el bloque `@media (hover: none)` que se había agregado en la sesión anterior (para mostrar la etiqueta y el botón "Ver más" siempre en pantallas táctiles) posicionaba el botón pegado abajo (`align-items:flex-end`), chocando visualmente con la etiqueta de categoría que también está abajo (`bottom:14px`). El usuario pidió explícitamente que ambos elementos solo se vean al pasar el cursor (comportamiento original de escritorio), así que se eliminó ese bloque completo. Esto restaura el comportamiento hover-only y de paso elimina el encimado (el botón vuelve a estar centrado verticalmente, sin chocar con la etiqueta de abajo). **Nota para el usuario:** esto significa que en dispositivos táctiles (celular/tablet) la etiqueta de categoría y el botón no se ven nunca, ya que no existe "cursor" en pantallas táctiles — solo se verían brevemente si el navegador simula el hover al tocar. Se deja así por ser una decisión explícita del cliente.
- **Menú descuadrado al hacer scroll:** se verificó con Playwright haciendo scroll real (no una captura de pantalla completa) por las 9800px+ de la página, comprobando la posición del header en cada tramo — el header se mantiene perfectamente fijo (`position:fixed; top:0`) en el 100% de las posiciones probadas. Todo indica que la captura enviada por el usuario proviene de una herramienta de "captura de página completa" (similar a la que usa este mismo asistente) que toma varias capturas de la pantalla y las une, y que **no excluye los elementos de posición fija**, haciendo que el header fijo aparezca repetido/incrustado a mitad de la imagen final. No se encontró ningún bug real de posicionamiento del menú durante scroll normal e interactivo.
- Se verificó: CSS con llaves balanceadas (330/330), `main.js` con sintaxis válida, auditoría completa de overflow horizontal en las 6 páginas × 5 anchos de pantalla sigue en 30/30 sin problemas.

**Pendiente:**
- [ ] Confirmar con el usuario si se hace commit + push de todos los cambios de responsividad (de esta sesión y la anterior) a `https://github.com/GussGtz/Bracon.git`.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.
- [ ] Número de WhatsApp, correo, dirección y testimonios siguen siendo datos de relleno (placeholders) pendientes de reemplazar por los reales del cliente.

---

## 2026-07-05 — Corrección de 3 reportes adicionales (menú tras scroll, portafolio en móvil, tag/botón táctil)

**Motivo:** el usuario probó de nuevo el sitio en modo móvil y reportó: (1) el menú de navegación no cubre bien la pantalla al abrirse después de hacer scroll (se ve la foto de fondo detrás de los enlaces), (2) en la vista "Todos" del portafolio, en móvil deben verse solo 2 fotos por departamento en vez de 4, y (3) la etiqueta y el botón "Ver más" deben poder activarse también en móvil al tocar (no solo con cursor de escritorio).

**Hecho:**
- **Bug real del menú tras scroll:** `.site-header.scrolled` usa `backdrop-filter: blur(10px)` para el efecto de desenfoque al hacer scroll. Cualquier `transform`, `filter` o `backdrop-filter` en un elemento ancestro convierte a ese ancestro en el "contenedor de referencia" de sus descendientes con `position:fixed` (en vez del viewport completo) — y `.main-nav` vive dentro de `.site-header`. Por eso, en cuanto se activaba `.scrolled` (al bajar más de 40px), el menú móvil dejaba de cubrir toda la pantalla y solo ocupaba la altura del header (~68px), dejando ver el contenido de atrás. Se corrigió en [css/styles.css](css/styles.css) cambiando `inset:0` por `top:0; left:0; width:100vw; height:100vh` (con `100svh` de respaldo) — las unidades `vw`/`vh` siempre se calculan sobre el viewport real, sin importar el contenedor de referencia roto por el `backdrop-filter`. Verificado con Playwright: se hizo scroll a 1200px y se abrió el menú en 3 páginas distintas — ahora cubre los 812px completos de alto en las 3.
- **2 fotos por departamento en "Todos" (móvil):** se reescribió `initPortfolioFilter()` en [js/main.js](js/main.js) para que, solo cuando el filtro activo es "Todos" (`all`) Y el ancho de pantalla es de escritorio angosto/móvil (≤768px), limite a las primeras 2 tarjetas de cada categoría y oculte el resto — en escritorio o al seleccionar una categoría específica, se siguen mostrando las 4 completas. También se aplica correctamente desde la primera carga de la página (antes solo se recalculaba al hacer clic en un botón de filtro) y se recalcula si el usuario cambia el tamaño de la ventana. Verificado: móvil + "Todos" = 8 fotos visibles (2 por cada una de las 4 categorías); escritorio + "Todos" = 16; móvil + filtro "Carpintería" = 4 (sin límite).
- **Etiqueta/botón activables al tocar en móvil:** se agregó `initPortfolioTouch()` en [js/main.js](js/main.js), que solo actúa en dispositivos táctiles (`hover:none`). El primer toque sobre una tarjeta de portafolio revela la etiqueta y el botón "Ver más" (sin navegar todavía); un segundo toque en la misma tarjeta, o tocar el botón, sí navega a la página de esa categoría. Tocar en cualquier otro lugar de la página oculta la revelación. Se agregó la clase `.touched` en [css/styles.css](css/styles.css) junto a los selectores `:hover` existentes para reutilizar la misma animación. Verificado con Playwright simulando toques reales: primer toque revela (no navega), segundo toque navega correctamente a `carpinteria.html`.
- Verificación final: CSS con llaves balanceadas (330/330), `main.js` con sintaxis válida, auditoría de overflow horizontal (30/30 sin problemas) y auditoría de animaciones de aparición (27/27 se activan) sin regresiones.

**Pendiente:**
- [ ] Confirmar con el usuario si se hace commit + push de todos los cambios de responsividad acumulados a `https://github.com/GussGtz/Bracon.git`.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.
- [ ] Número de WhatsApp, correo, dirección y testimonios siguen siendo datos de relleno (placeholders) pendientes de reemplazar por los reales del cliente.

---

## 2026-07-05 — Corrección: carrusel del hero no funcionaba en modo móvil

**Motivo:** el usuario reportó que los botones para cambiar de foto en el carrusel del hero (en móvil) no funcionaban.

**Hecho — se encontraron y corrigieron 3 bugs reales distintos, todos relacionados con el carrusel:**
- **Flechas (prev/next) bloqueadas:** `.hero-arrow` y el `<h1>` del hero (dentro de `.hero .container`) compartían el mismo `z-index:3`. Como `.container` aparece después en el HTML, ganaba el empate de apilamiento y su texto quedaba pintado *encima* de las flechas, interceptando los toques. Se subió el `z-index` de `.hero-arrow` y `.hero-dots` a `4` en [css/styles.css](css/styles.css). Verificado con Playwright: las flechas ahora cambian de foto correctamente en las 5 páginas con carrusel (Inicio, Carpintería, Herrería, Construcción, Maquinaria).
- **Puntos (dots) fuera de la pantalla:** el contenido del hero en móvil (encabezado, texto, botones) necesita más alto que el viewport, así que `.hero` (que usa `min-height`, no `height` fija) crece más allá de la pantalla (medido: 852px de alto contra 812px de viewport). Los puntos estaban posicionados con `bottom:30px` relativo a ese contenedor más alto, quedando literalmente debajo de la pantalla visible e imposibles de tocar sin hacer scroll. Se cambió su posicionamiento para anclarse a `calc(100svh - 48px)` desde arriba — así siempre quedan dentro de la pantalla visible sin importar cuánto crezca el contenido del hero.
- **Clics en un punto activaban el punto vecino:** al ampliar antes el área táctil de los puntos (`::before{inset:-14px}`, para accesibilidad), el "área invisible" de cada punto se volvió tan grande que se encimaba con la del punto de al lado — al tocar un punto inactivo (9px) junto a uno activo (22px, más ancho), el toque se registraba en el vecino en vez del punto tocado. Se redujo el inset horizontal a `-4px` (se mantiene `-14px` verticalmente, donde no hay vecinos), eliminando el traslape sin perder el área táctil ampliada.
- Verificado con Playwright real: en las 5 páginas, los puntos ahora están dentro del viewport visible, las flechas cambian de foto correctamente, y tocar cualquier punto activa exactamente esa foto (se probó la secuencia flecha → punto(0) → punto(3), llegando exactamente al índice esperado en cada paso).
- Verificación final: CSS con llaves balanceadas (330/330), auditoría de overflow horizontal (30/30 sin problemas) y auditoría de animaciones de aparición (27/27 se activan), sin regresiones.

**Pendiente:**
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.
- [ ] Número de WhatsApp, correo, dirección y testimonios siguen siendo datos de relleno (placeholders) pendientes de reemplazar por los reales del cliente.

---

## 2026-07-05 — Espacio del scroll-cue, botones sociales reales y auditoría general de botones

**Motivo:** el usuario reportó que el texto "Desplázate" se sobreponía al botón "Ver nuestros servicios" del hero en móvil, pidió que los botones de Facebook/Instagram lleven a su red social real (sin tener aún un perfil específico), y pidió una revisión general para dejar una demo 100% funcional.

**Hecho:**
- **"Desplázate" sobrepuesto:** confirmado con Playwright — en `index.html` (única página con este indicador), a 375px de ancho el botón "Ver nuestros servicios" y el texto `.scroll-cue` se solapaban (`overlap:true`). En vez de solo ajustar el espaciado (frágil ante cambios futuros de longitud de texto), se ocultó `.scroll-cue` en `@media (max-width:768px)` en [css/styles.css](css/styles.css) — es un indicador puramente decorativo pensado para pantallas grandes (en móvil el usuario ya sabe deslizar el dedo), patrón común en sitios profesionales. Verificado: `display:none` en móvil, `display:flex` sin cambios en escritorio.
- **Botones de redes sociales:** los 7 botones de Facebook y 7 de Instagram (repartidos entre las 6 páginas) tenían `href="#"` sin destino real. Se reemplazaron en todas las páginas por `https://www.facebook.com` y `https://www.instagram.com` respectivamente, con `target="_blank" rel="noopener"` — funcionan de inmediato aunque el cliente aún no tenga perfiles específicos creados; solo hay que reemplazar la URL genérica por el perfil real cuando exista.
- **Auditoría general de todos los botones:** se recorrieron programáticamente las 6 páginas verificando: enlaces rotos (`href="#"` sin manejo de JS), botones sociales con destino y `target` correctos, menú móvil (abrir/cerrar), errores de consola. **0 problemas encontrados.** Se confirmó además que los enlaces `href="#"` restantes (galería/lightbox y "Ver más" del portafolio) son intencionales — el JS les hace `preventDefault()` y abre el lightbox o navega mediante lógica propia, no son enlaces rotos.
- **Formulario de contacto:** probado de extremo a extremo (llenar los 4 campos, enviar) — arma correctamente el mensaje de WhatsApp con nombre, teléfono, servicio y mensaje, y abre `api.whatsapp.com` en pestaña nueva.
- Verificación final: CSS con llaves balanceadas (332/332), `main.js` con sintaxis válida, auditoría de overflow horizontal (30/30), auditoría de animaciones de aparición (27/27) y carrusel del hero (flechas y puntos funcionando en las 5 páginas), sin regresiones.

**Pendiente:**
- [ ] Reemplazar `https://www.facebook.com` y `https://www.instagram.com` por los perfiles reales de Grupo Bracon cuando existan.
- [ ] Seguir sin fotos reales: Herrería, Construcción Ligera y Maquinaria.
- [ ] Número de WhatsApp, correo, dirección y testimonios siguen siendo datos de relleno (placeholders) pendientes de reemplazar por los reales del cliente.
