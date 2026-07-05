# Sitio Web — Grupo Bracon

Sitio estático (HTML/CSS/JS puro, sin frameworks) para Grupo Bracon: construcción, carpintería, herrería/aluminio, mantenimiento y maquinaria/logística.

## Estructura

```
bracon/
├── index.html          Inicio
├── carpinteria.html     Carpintería exterior y acabados de madera
├── herreria.html         Herrería artística y aluminio
├── construccion.html     Construcción ligera y mantenimiento
├── maquinaria.html       Maquinaria pesada y logística
├── contacto.html         Contacto (formulario -> WhatsApp)
├── css/styles.css
├── js/main.js
└── assets/img/logo.png   Logo de Grupo Bracon
```

## Cómo verlo

Abre `index.html` directamente en el navegador, o corre un servidor local:

```
cd bracon
python3 -m http.server 5180
```

Luego visita `http://localhost:5180`.

## Antes de publicarlo, personaliza:

1. **Número de WhatsApp**: edita `js/main.js`, línea `whatsappNumber: "529999999999"` — pon tu número real con lada de país (52 + 10 dígitos, sin espacios ni signos).
2. **Fotos reales**: todas las imágenes usan `picsum.photos` como marcador de posición. Reemplaza los `src="https://picsum.photos/..."` por tus propias fotos (guárdalas en `assets/img/` y actualiza las rutas).
3. **Correo y dirección**: busca `contacto@grupobracon.com` y "Quintana Roo, México" en cada archivo `.html` y actualízalos.
4. **Redes sociales**: los íconos de Facebook/Instagram en el footer y en la página de contacto apuntan a `#` — reemplázalos con tus enlaces reales.
5. **Textos de "años de experiencia" / "proyectos entregados"**: ajusta las cifras en la sección de estadísticas de `index.html` a tus números reales.

## Publicarlo

Es un sitio 100% estático: puedes subirlo tal cual a Netlify, Vercel, GitHub Pages o cualquier hosting con cPanel, simplemente subiendo esta carpeta.
