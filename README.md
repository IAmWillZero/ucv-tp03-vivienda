# Vivienda unifamiliar de dos pisos

Presentación de Expresión Gráfica, Escuela de Ingeniería Civil, Universidad César Vallejo, Huaraz. Grupo A1, 2026-II.

**Ver en línea:** https://iamwillzero.github.io/ucv-tp03-vivienda/

## Contenido

- 17 diapositivas 16:9. El cierre reúne las conclusiones arquitectónicas y el recorrido final.
- Láminas A-01 a A-08 exportadas de los PDF finales (A-01 y A-02 desde la versión A2 1:50).
- Renders del modelo 3D con corrección de color suave y vistas cenitales para comparar cada lámina con el modelo.
- Recorrido de 56 segundos con música instrumental original y subtítulos en español. El botón CC permite ver el video con o sin subtítulos.

## Uso

| Acción | Teclado | Ratón / táctil |
|---|---|---|
| Siguiente / anterior | → / ← · Espacio · RePág / AvPág | Flechas laterales · deslizar |
| Sección siguiente / anterior | ↓ / ↑ | — |
| Primera / última | Inicio / Fin | Botón «Inicio» |
| Índice | I (o M) | Botón «Índice» |
| Pantalla completa | F | Botón «Pantalla completa» |
| Cerrar índice o visor | Esc | ✕ |
| Ampliar plano | Clic o Enter sobre la imagen; + / − / 0 | Rueda, doble clic, pellizco, arrastrar |
| Lámina ↔ modelo 3D (diapositivas 4–6) | C | Botones sobre la lámina |
| Cronómetro de exposición | T (clic en él para reiniciar) | — |
| Pantalla negra (pausa) | B | Clic para volver |
| Atajos de teclado | ? | Botón «Ayuda» |
| Modelo 3D (diapositiva 14) | Con el visor enfocado, flechas para girar | Arrastrar para girar · rueda o pellizco para acercar · botones Exterior / Vista superior / Restablecer |
| Reducir animaciones | — | Botón «Movimiento» (también respeta la preferencia del sistema) |

- Cada diapositiva tiene su propio enlace: `index.html#/6` abre la zonificación.
- Los botones Atrás y Adelante del navegador recorren las diapositivas.
- La presentación recuerda en este navegador la última diapositiva vista; «Inicio» vuelve a la portada.
- El video se inicia manualmente, se pausa al cambiar de diapositiva y conserva el fotograma final al terminar.
- Transición sugerida para el expositor: «Para finalizar, les presentamos un recorrido visual por nuestra propuesta de vivienda unifamiliar de dos pisos».

## Modelo 3D

El visor usa [`model-viewer`](https://github.com/google/model-viewer) 4.0.0 (Apache-2.0), incluido en `assets/vendor/` para no depender de un CDN. El modelo (`assets/modelo/vivienda.glb`, 10,8 MB) se carga solo al llegar a la diapositiva 14.

- Es una exportación del modelo Blender del proyecto, simplificada para la web: unos 95 000 triángulos (el mobiliario y la vegetación se aligeraron) y texturas de 1K.
- Es anterior a la corrección de barandas, que sí está en los planos.
- Si el navegador no tiene WebGL, o si la presentación se abre como archivo local, se muestra el render del corte fugado.

## Abrir sin internet

1. Descarga el repositorio (Code → Download ZIP) y descomprímelo.
2. Abre `index.html` con doble clic en Edge, Chrome o Firefox.

No requiere servidor, instalación ni conexión. No muevas archivos fuera de `assets/`. El visor 3D interactivo necesita la versión en línea o un servidor local (`python -m http.server`); sin él se muestra un render fijo.

## Estructura

```
index.html        diapositivas
css/styles.css    estilos
js/app.js         navegación, índice, estado, visor y video
assets/planos     láminas A-01 a A-08 (WebP)
assets/detalles   recortes de la escalera
assets/renders    vistas del modelo 3D
assets/video      recorrido, portada y subtítulos (WebVTT)
assets/modelo     modelo 3D (GLB)
assets/vendor     model-viewer 4.0.0 (Apache-2.0)
```

## Alcance

Trabajo académico. La verificación normativa (RNE A.010 y A.020) es de carácter formativo: las observaciones de la tabla requieren la revisión correspondiente. La presentación académica no constituye aprobación municipal.
