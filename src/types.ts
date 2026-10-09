export type GameType =
  | "Cooperativo"
  | "Competitivo"
  | "Por equipos"
  | "Equipos ocultos"
  | "Uno contra todos";

export type Difficulty = "Fácil" | "Media" | "Difícil";

export type CustomScorerId =
  | "truco"
  | "avalon"
  | "catan"
  | "cartografos"
  | "toma6"
  | "sushigo"
  | "kingdomino"
  | "munchkin"
  | "carcassonne"
  | "flip7"
  | "justone"
  | "themind"
  | "clue"
  | "pictionary"
  | "lasvegasbaby"
  | "carreras"
  | "magicmaze";

export type ScorerConfig =
  | { kind: "counter" }
  | { kind: "rounds" }
  | { kind: "target"; target: number }
  | { kind: "teams" }
  | { kind: "custom"; id: CustomScorerId };

export type Theme = {
  bg: string;
  accent: string;
  ink: string;
  pattern?: string; // capas CSS para `background`, van arriba de `bg`
  icon: string;
  accentFont?: string;
};

export type HowToPlay = {
  goal: string;
  setup: string[];
  turn: string[];
  end: string;
  tips?: string[];
  variants?: string[];
};

export type CheatSheet = {
  yourTurn: string[];
  keyActions?: { name: string; text: string }[];
  scoring?: string[];
  commonMistakes?: string[];
};

export type Guide = { howToPlay?: HowToPlay; cheatSheet?: CheatSheet };

export type Game = {
  slug: string;
  name: string;
  players: { min: number | null; max: number | null };
  type: GameType | null;
  categories: string[];
  difficulty: Difficulty | null;
  minutes: number | null;
  description: string;
  status: "completo" | "falta-info"; // falta-info = ficha básica, sin guía
  notes?: string;
  requires?: string; // slug del juego base, para expansiones
  theme: Theme;
  howToPlay?: HowToPlay;
  cheatSheet?: CheatSheet;
  scorer?: ScorerConfig;
};
