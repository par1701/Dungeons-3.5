# Creador de personajes de Dungeons &amp; Dragons 3.5

Aplicación web (React + TypeScript + Vite) para crear, guardar, exportar/importar
e imprimir personajes de D&amp;D 3.5 en español.

## Contenido de reglas

El contenido de juego (razas, clases, dotes, conjuros, equipo) vive en `src/data/`,
organizado por libro de origen. Actualmente está implementado el **SRD 3.5**
(contenido de juego abierto). Los libros Complete Warrior, Complete Arcane,
Complete Divine, Complete Adventurer, Complete Champion, Player's Handbook II
y Dungeon Master's Guide II están registrados como "próximamente" en
`src/data/sourcebooks.ts` y se pueden añadir siguiendo el mismo patrón que
`src/data/srd/*`.

Las reglas variantes (método de generación de características, penalización de
experiencia por multiclase, puntos de golpe promedio, etc.) se gestionan en
`src/data/variantRules.ts` y se activan/desactivan por personaje.

## Arquitectura

- `src/types`: tipos centrales del sistema de reglas.
- `src/data`: datos de reglas por libro + registro de libros/reglas variantes.
- `src/engine`: cálculos derivados (BAB, salvaciones, CA, puntos de golpe, conjuros por día, etc.).
- `src/store`: estado de personajes guardados (zustand + localStorage).
- `src/components/wizard`: pasos del asistente de creación de personajes.
- `src/pages`: páginas de la aplicación (inicio, listado, asistente, hoja de personaje).
- `src/pdf`: generación de la hoja de personaje en PDF (`@react-pdf/renderer`).

## Personajes: guardado, exportar e importar

Los personajes se guardan en el navegador (localStorage). Desde "Mis personajes"
se pueden exportar como archivo `.json` e importar de vuelta, para respaldo o
para compartir entre dispositivos.

## Desarrollo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run lint      # oxlint
```
