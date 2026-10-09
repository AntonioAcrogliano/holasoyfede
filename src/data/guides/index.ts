import type { Guide } from "../../types";
import { grupo } from "./grupo";
import { party } from "./party";
import { estrategia } from "./estrategia";
import { resto } from "./resto";
import { nuevos } from "./nuevos";

// Guías escritas con palabras propias. Lo que no pude verificar contra el
// reglamento oficial está marcado en el texto como "a confirmar".
export const guides: Record<string, Guide> = { ...grupo, ...party, ...estrategia, ...resto, ...nuevos };
