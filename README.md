# Vivienda unifamiliar de dos pisos — TP03

Presentación web del Trabajo Práctico 03 del curso **Expresión Gráfica** (Escuela de Ingeniería Civil, Universidad César Vallejo, sede Huaraz, 2026-II). Grupo A1.

**Ver en línea:** https://iamwillzero.github.io/ucv-tp03-vivienda/

## Contenido

- 19 diapositivas 16:9: portada, objetivos, características, metodología, las dos plantas, zonificación, circulaciones, criterios del RNE, escalera, cortes, elevaciones, cuadros técnicos, cubierta, modelo 3D, ambientes amoblados, video, resultados y cierre.
- Láminas A-01 a A-08 exportadas de los PDF finales (A-01 y A-02 desde la versión A2 1:50).
- Renders del modelo 3D con corrección de color suave y vistas cenitales para comparar cada lámina con el modelo.
- Recorrido en video (56 s, con audio y subtítulos). La escalera se muestra con la lámina A-01 vigente (barandas h = 1.00 m), porque el modelo 3D es anterior a esa corrección.

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
| Lámina ↔ modelo 3D (diapositivas 5–7) | C | Botones sobre la lámina |
| Cronómetro de exposición | T (clic en él para reiniciar) | — |
| Pantalla negra (pausa) | B | Clic para volver |
| Atajos de teclado | ? | Botón «Ayuda» |
| Reducir animaciones | — | Botón «Movimiento» (también respeta la preferencia del sistema) |

- Cada diapositiva tiene su propio enlace: `index.html#/7` abre la zonificación.
- Los botones Atrás y Adelante del navegador recorren las diapositivas.
- La presentación recuerda en este navegador la última diapositiva vista; «Inicio» vuelve a la portada.
- El video no se reproduce solo y se pausa al cambiar de diapositiva.

## Abrir sin internet

1. Descarga el repositorio (Code → Download ZIP) y descomprímelo.
2. Abre `index.html` con doble clic en Edge, Chrome o Firefox.

No requiere servidor, instalación ni conexión. No muevas archivos fuera de `assets/`.

## Estructura

```
index.html        diapositivas
css/styles.css    estilos
js/app.js         navegación, índice, estado, visor y video
assets/planos     láminas A-01 a A-08 (WebP)
assets/detalles   recortes de la escalera
assets/renders    vistas del modelo 3D
assets/video      recorrido y su portada
```

## Alcance

Trabajo académico. La verificación normativa (RNE A.010 y A.020) es de carácter formativo: los puntos marcados como «Pendiente» o «No conforme» se muestran tal cual y no equivale a una aprobación municipal.
