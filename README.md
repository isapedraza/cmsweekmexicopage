# cmsweekmexicopage

Página estática para CMS Week México 2026.

## Publicación

El repositorio no incluye un workflow de deploy. Para que un cambio se vea en `https://cmsweekmexico.buap.mx/`, el cambio debe estar en la rama que usa el servidor y después el servidor debe actualizar sus archivos.

Si BUAP no tiene deploy automático conectado a GitHub, hacer `git push` no basta: hay que subir o sincronizar `index.html`, `cms_week_merida.css`, `cms_week_subpages.js`, las páginas HTML y la carpeta `Logos`.

## Traducciones

No hay traducción automática. Cada texto que cambie debe tener su versión en inglés.

En subpáginas, usa el patrón existente:

```html
<p data-en="English text">Texto en español</p>
```

En la portada, también se puede usar ese patrón. Si editas un texto que todavía no tiene `data-en`, agrega ese atributo o actualiza la tabla `translations` dentro de `index.html`.

Ejemplo:

```html
<div class="stat-label" data-en="Institutions represented">Instituciones representadas</div>
```
