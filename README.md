# Hola, soy la Ludoteca de Fede

Catálogo, guías y anotadores para la colección de juegos de mesa de Fede. Pensado para el celu, en la mesa.

## Correrlo

```bash
npm install
npm run dev
```

Para publicar: `npm run build` y subí la carpeta `dist/` a GitHub Pages, Netlify o Vercel. Usa rutas por hash y base relativa, así que no hay que configurar nada.

## Dónde está cada cosa

- `src/data/games.ts`: la lista de juegos (datos, tema visual, tipo de anotador).
- `src/data/guides/`: "Cómo se juega" y cheat sheet de cada juego, por slug.
- `src/scorers/`: anotadores. `generic.tsx` tiene los genéricos (contador y rondas), `custom.tsx` los específicos, `frame.tsx` lo común (nombres, guardado, deshacer, ganador).
- `src/components/`: catálogo, ficha de juego y herramientas.

## Cargar un juego que hoy dice "Falta info"

1. En `games.ts`, pasalo de `basic(...)` a `g(...)` con jugadores, tipo, dificultad, minutos y tema.
2. Agregá su guía en `src/data/guides/` con el mismo slug.

## Pendientes de verificar

Lo que no se pudo confirmar contra el reglamento oficial está marcado en el texto como **"a confirmar"** (buscá esa frase en `src/data/`). Quedan 18 juegos como "Falta info" (los `basic(...)` de `games.ts`) porque no apareció un reglamento confiable.
