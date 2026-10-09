// Ilustraciones propias de la ludoteca: un solo estilo (trazo grueso redondeado, dos tintas)
// para que las tapas se vean iguales en cualquier celular. Nada de arte ni logos de las cajas.
//
// Cada dibujo es una lista de piezas [clase, path, transform?] sobre una grilla de 48×48:
//   a = relleno con el acento del juego · w = relleno papel · n = solo línea
//   k = punto de tinta (sin borde) · d = punto de papel (sin borde)

type Piece = [cls: "a" | "w" | "n" | "k" | "d", d: string, transform?: string];

const C = (cx: number, cy: number, r: number) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0z`;
const R = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1 ${-r} ${r}h${-(w - 2 * r)}a${r} ${r} 0 0 1 ${-r} ${-r}v${-(h - 2 * r)}a${r} ${r} 0 0 1 ${r} ${-r}z`;

const GLYPHS: Record<string, Piece[]> = {
  shield: [["a", "M24 6l14 5v11c0 9-6 16-14 20-8-4-14-11-14-20V11z"], ["n", "M24 15v18M17 23h14"]],
  fist: [["w", "M17 27h14v13H17z"], ["a", R(13, 11, 22, 17, 5)], ["n", "M20 11v9M26 11v9M13 21h13"]],
  compass: [["w", C(24, 24, 17)], ["a", "M24 11l5 13-5 13-5-13z"], ["k", C(24, 24, 2)]],
  swords: [["n", "M11 9l20 20M37 9L17 29M27 33l8-8M21 33l-8-8M31 29l6 7M17 29l-6 7"], ["k", C(38, 37, 2.4)], ["k", C(10, 37, 2.4)]],
  sword: [["w", "M24 5l4 6v17h-8V11z"], ["a", R(15, 28, 18, 5, 2)], ["n", "M24 33v7"], ["k", C(24, 42, 2.4)]],
  pencil: [["a", "M12 30L30 12l6 6-18 18z"], ["w", "M12 30l-3 9 9-3z"], ["n", "M27 15l6 6"]],
  chip: [["a", C(24, 24, 17)], ["w", C(24, 24, 8.5)], ["n", "M24 7v6M24 35v6M7 24h6M35 24h6M12 12l4.300 4.300M31.700 31.700L36 36M36 12l-4.300 4.300M12 36l4.300-4.300"]],
  horseshoe: [["a", "M12 9v17a12 12 0 0024 0V9h-7v17a5 5 0 01-10 0V9z"], ["k", C(15.5, 15, 1.2)], ["k", C(32.5, 15, 1.2)], ["k", C(16, 27, 1.2)], ["k", C(32, 27, 1.2)]],
  book: [["a", "M7 12c6-3 12-2 17 1v25c-5-3-11-4-17-1z"], ["w", "M41 12c-6-3-12-2-17 1v25c5-3 11-4 17-1z"], ["n", "M29 20c2-1 4-1.500 7-1M29 26c2-1 4-1.500 7-1"]],
  bull: [["w", "M14 18c-5 0-8-4-8-10 3 4 6 5 9 5zM34 18c5 0 8-4 8-10-3 4-6 5-9 5z"], ["a", "M14 18c2-3 5-4 10-4s8 1 10 4v8c0 8-4 14-10 14s-10-6-10-14z"], ["k", C(19, 24, 1.7)], ["k", C(29, 24, 1.7)], ["n", "M20 33h8"]],
  tent: [["a", "M7 39L24 11l17 28z"], ["w", "M24 11l-5 28h10z"], ["n", "M24 11V5l6 2.500-6 2.500"]],
  bomb: [["a", C(21, 28, 13)], ["n", "M30 19l4-4c2-2 5-1 6 2M15 26c1-3 3-5 6-6"], ["k", C(41, 19, 1.8)]],
  frame: [["a", R(7, 9, 34, 30, 4)], ["w", R(13, 15, 22, 18, 1)], ["n", "M13 30l7-8 5 6 4-4 6 7"], ["k", C(29, 20, 1.8)]],
  yogi: [["w", "M8 37c0-4 6-6 16-6s16 2 16 6-6 4-16 4-16 0-16-4z"], ["a", "M24 19c-5 0-8 4-8 12h16c0-8-3-12-8-12z"], ["a", C(24, 11, 5)]],
  cards: [["w", R(9, 12, 18, 26, 3), "rotate(-12 18 25)"], ["a", R(21, 10, 18, 26, 3), "rotate(10 30 23)"], ["d", C(30, 23, 3.4)]],
  bulb: [["a", "M24 6a11 11 0 00-7 19.500c1.500 1.500 2 3 2 5.500h10c0-2.500.5-4 2-5.500A11 11 0 0024 6z"], ["w", R(19, 31, 10, 7, 2)], ["n", "M21 42h6"]],
  hourglass: [["w", "M15 7c0 9 9 12 9 17s-9 8-9 17h18c0-9-9-12-9-17s9-8 9-17z"], ["a", "M17 41c0-5 4-8 7-10 3 2 7 5 7 10z"], ["a", "M19 13h10c-1 4-3 6-5 8-2-2-4-4-5-8z"], ["n", "M12 7h24M12 41h24"]],
  gift: [["a", R(9, 20, 30, 20, 3)], ["w", R(7, 13, 34, 8, 2)], ["n", "M24 13v27"], ["w", "M24 13c-3-8-12-6-8 0zM24 13c3-8 12-6 8 0z"]],
  taco: [["a", "M5 33a19 19 0 0138 0z"], ["w", "M11 33a13 13 0 0126 0z"], ["k", C(19, 28, 1.5)], ["k", C(25, 25, 1.5)], ["k", C(30, 29, 1.5)]],
  ghost: [["w", "M11 40V22a13 13 0 0126 0v18l-4.500-4-4.500 4-4-4-4 4-4.500-4z"], ["k", C(19, 22, 2.2)], ["k", C(29, 22, 2.2)], ["a", C(24, 30, 2.6)]],
  tophat: [["a", R(15, 8, 18, 24, 2)], ["w", "M15 24h18v7H15z"], ["a", R(6, 31, 36, 7, 3)]],
  magnifier: [["w", C(21, 21, 12)], ["n", "M30 30l11 11M15 19a7 7 0 016-5"]],
  crossword: [["w", R(8, 8, 32, 32, 4)], ["a", "M18.700 18.700h10.600v10.600H18.700z"], ["a", "M29.300 8H36a4 4 0 014 4v6.700H29.300z"], ["n", "M18.700 8v32M29.300 8v32M8 18.700h32M8 29.300h32"]],
  kite: [["a", "M24 5l12 14-12 17L12 19z"], ["n", "M12 19h24M24 5v31M24 36c-4 3 3 4 0 8"]],
  axe: [["n", "M15 43L27 9"], ["a", "M24 8c7-3 14 1 17 7-2 6-6 10-11 12l-9-7c2-4 3-8 3-12z"], ["n", "M33 12c2 2 3 4 3 7"]],
  amphora: [["a", "M18 7h12v6c6 4 8 10 8 15 0 7-6 13-14 13s-14-6-14-13c0-5 2-11 8-15z"], ["n", "M18 14c-6 0-8 6-5 10M30 14c6 0 8 6 5 10M11 28h26"]],
  anchor: [["n", "M24 14v26M12 28c0 8 6 12 12 12s12-4 12-12M17 21h14"], ["a", C(24, 10, 4)]],
  medcross: [["a", R(7, 7, 34, 34, 9)], ["w", "M20 14h8v6h6v8h-6v6h-8v-6h-6v-8h6z"]],
  moth: [["a", "M24 23C20 11 8 7 7 15c-1 6 6 9 17 8zM24 23c4-12 16-16 17-8 1 6-6 9-17 8z"], ["w", "M24 23c-8 0-13 5-11 10 2 4 9 2 11-10zM24 23c8 0 13 5 11 10-2 4-9 2-11-10z"], ["n", "M24 15v21M24 15l-3-6M24 15l3-6"]],
  phone: [["a", R(13, 5, 22, 38, 5)], ["w", R(17, 11, 14, 22, 1)], ["k", C(24, 38, 1.6)], ["n", "M20 17h8M20 22h5"]],
  candle: [["w", R(18, 20, 12, 22, 2)], ["a", "M24 5c4 4 6 7 6 10a6 6 0 01-12 0c0-3 2-6 6-10z"], ["n", "M12 42h24"]],
  sailboat: [["a", "M24 6v24H10z"], ["w", "M28 12v18h11z"], ["a", "M6 34h36l-5 8H11z"]],
  palette: [["a", "M24 6C13 6 6 14 6 24s8 18 17 18c4 0 5-3 3.500-5.500C25 34 26 31 30 31h4c5 0 8-3 8-8C42 13 34 6 24 6z"], ["w", C(15, 22, 2.8)], ["w", C(22, 14, 2.8)], ["w", C(31, 16, 2.8)], ["k", C(15, 31, 2)]],
  sushi: [["w", R(8, 24, 32, 15, 7)], ["a", "M7 25c2-9 9-13 17-13s15 4 17 13c-5 3-11 4-17 4s-12-1-17-4z"], ["n", "M17 14l-3 12M25 12.500l-1 15M33 15l1 11"]],
  castle: [["a", "M10 40V18h6v-6h4v6h8v-6h4v6h6v22z"], ["w", "M20 40v-8a4 4 0 018 0v8z"], ["n", "M24 12V5l6 2.500-6 2.500"]],
  hexwheat: [["a", "M24 5l16.500 9.500v19L24 43 7.500 33.500v-19z"], ["n", "M24 35V15M24 20l-5-4M24 20l5-4M24 27l-5-4M24 27l5-4"]],
  gem: [["a", "M14 8h20l8 11-18 22L6 19z"], ["n", "M6 19h36M14 8l5 11 5 22M34 8l-5 11-5 22M19 19l5-11 5 11"]],
  bone: [["w", "M14 19a5 5 0 10-4 8 5 5 0 104 2h20a5 5 0 104-2 5 5 0 10-4-8z", "rotate(-35 24 24)"]],
  mosaic: [["a", R(11, 11, 12, 12, 2), "rotate(45 24 24)"], ["w", R(25, 11, 12, 12, 2), "rotate(45 24 24)"], ["w", R(11, 25, 12, 12, 2), "rotate(45 24 24)"], ["a", R(25, 25, 12, 12, 2), "rotate(45 24 24)"]],
  crown: [["a", "M8 37V14l8 9 8-13 8 13 8-9v23z"], ["w", R(8, 32, 32, 7, 2)], ["k", C(24, 35.5, 1.6)]],
  volcano: [["a", "M5 41l13-25h12l13 25z"], ["w", "M18 16h12l-2 6-3-3-3 4-2-3z"], ["n", "M22 11c-3-2 0-4-2-6M28 10c2-2 0-3 1-5"]],
  egg: [["w", "M24 5c8 0 13 13 13 22a13 13 0 01-26 0C11 18 16 5 24 5z"], ["a", C(19, 19, 3)], ["a", C(30, 25, 3.5)], ["n", "M12 32l5-3 4 4 4-4 4 3 6-3"]],
  crystal: [["a", C(24, 21, 14)], ["w", "M13 41l3-7h16l3 7z"], ["n", "M16 18a9 9 0 017-6"], ["d", C(29, 25, 2)]],
  snowflake: [["n", "M24 6v36M8.400 15l31.200 18M8.400 33l31.200-18M24 12l-4-4M24 12l4-4M24 36l-4 4M24 36l4 4"], ["a", C(24, 24, 4.5)]],
  bricks: [["a", R(7, 10, 34, 28, 4)], ["n", "M7 19.300h34M7 28.700h34M19 10v9.300M31 10v9.300M13 19.300v9.400M25 19.300v9.400M37 19.300v9.400M19 28.700V38M31 28.700V38"]],
  skull: [["w", "M10 22a14 14 0 0128 0c0 5-2 8-5 10v7H15v-7c-3-2-5-5-5-10z"], ["k", C(18, 23, 3.3)], ["k", C(30, 23, 3.3)], ["n", "M20 39v-5M24 39v-5M28 39v-5"]],
  rabbit: [["w", "M18 22C14 12 15 4 19 4s4 8 3 18zM30 22c4-10 3-18-1-18s-4 8-3 18z"], ["a", C(24, 30, 11.5)], ["k", C(20, 28, 1.7)], ["k", C(28, 28, 1.7)], ["n", "M22 33c1 1 3 1 4 0"]],
  lighthouse: [["w", "M18 41l2-23h8l2 23z"], ["a", "M19.300 26h9.400l.600 7H18.700z"], ["a", R(17, 11, 14, 7, 2)], ["n", "M18 11l6-6 6 6M12 14l-6-2M36 14l6-2M12 41h24"]],
  lantern: [["a", R(15, 16, 18, 23, 4)], ["w", R(19, 21, 10, 13, 2)], ["n", "M17 16c0-11 14-11 14 0M13 41h22"], ["k", C(24, 28, 2.2)]],
  paw: [["a", "M24 24c6 0 11 5 11 10 0 4-4 6-11 6s-11-2-11-6c0-5 5-10 11-10z"], ["a", C(11, 21, 4)], ["a", C(19.5, 12, 4)], ["a", C(28.5, 12, 4)], ["a", C(37, 21, 4)]],
  bee: [["w", "M19 18c-7-9 3-14 6-3zM29 18c7-9-3-14-6-3z"], ["a", "M11 28a13 10 0 1026 0 13 10 0 10-26 0z"], ["n", "M19 19.500v17M29 19.500v17"]],
  flag: [["a", "M12 8h25l-6 8 6 8H12z"], ["n", "M12 5v38"]],
  mask: [["a", "M6 15c6-2 12 0 18 2 6-2 12-4 18-2 0 10-4 19-10 19-4 0-6-4-8-4s-4 4-8 4C10 34 6 25 6 15z"], ["w", "M12 21c3-2 6-1 8 2-3 2-6 1-8-2zM36 21c-3-2-6-1-8 2 3 2 6 1 8-2z"]],
  puzzle: [["a", "M9 14h10a4.500 4.500 0 119 0h10v10a4.500 4.500 0 110 9v8H9v-8a4.500 4.500 0 100-9z"]],
  bell: [["a", "M10 34c0-11 5-18 14-18s14 7 14 18z"], ["w", R(6, 34, 36, 6, 3)], ["a", C(24, 12, 3.2)]],
  gradcap: [["w", "M13 23v9c0 3 5 6 11 6s11-3 11-6v-9l-11 5z"], ["a", "M4 18l20-9 20 9-20 9z"], ["n", "M40 19v10"], ["k", C(40, 32, 2.2)]],
  nib: [["a", "M24 4l10 14-6 22h-8l-6-22z"], ["w", C(24, 21, 3.6)], ["n", "M24 25v15"]],
  bamboo: [["a", R(11, 6, 10, 37, 3)], ["a", R(27, 13, 10, 30, 3)], ["n", "M11 18h10M11 31h10M27 24h10M27 34h10M21 12c5-4 9-3 11-1"]],
  bubble: [["a", "M6 10a4 4 0 014-4h28a4 4 0 014 4v18a4 4 0 01-4 4H22l-9 9v-9h-3a4 4 0 01-4-4z"], ["d", C(16, 19, 2.3)], ["d", C(24, 19, 2.3)], ["d", C(32, 19, 2.3)]],
  clapper: [["a", R(7, 19, 34, 22, 3)], ["w", "M7 11l33-5 1 7-33 6z"], ["n", "M15 10l3 7M24 8.500l3 7M33 7.200l3 7"]],
  speaker: [["a", "M8 18h8l10-9v30l-10-9H8z"], ["n", "M32 17c3 3 3 11 0 14M37 12c6 6 6 18 0 24"]],
  flame: [["a", "M24 4c2 8 12 12 12 24a12 12 0 01-24 0c0-5 2-8 5-11 0 4 2 6 4 6 1-6-1-12 3-19z"], ["w", "M24 26c3 3 5 5 5 9a5 5 0 01-10 0c0-4 2-6 5-9z"]],
  wizard: [["a", "M22 5c6 4 9 14 12 27H14c2-10 4-20 8-27z"], ["w", "M4 36c0-3 9-5 20-5s20 2 20 5-9 5-20 5-20-2-20-5z"], ["d", C(24, 21, 2.3)]],
  pickaxe: [["n", "M14 42L31 15"], ["a", "M8 17c8-9 24-11 34-3-9-2-15 0-19 3l-5-3c-3 0-6 1-10 3z"]],
  beer: [["a", R(12, 14, 20, 28, 3)], ["w", "M10 14a5 5 0 015-6 6 6 0 0110-2 6 6 0 019 3 4 4 0 010 8H12a3 3 0 01-2-3z"], ["n", "M32 21h4a4 4 0 014 4v5a4 4 0 01-4 4h-4M18 23v13M26 23v13"]],
  cocktail: [["a", "M8 10h32L24 28z"], ["n", "M24 28v13M16 42h16M31 4l-8 17"], ["w", C(29, 15, 2.6)]],
  dice: [["a", R(8, 8, 32, 32, 9)], ["d", C(16.5, 16.5, 2.7)], ["d", C(31.5, 31.5, 2.7)], ["d", C(24, 24, 2.7)], ["d", C(31.5, 16.5, 2.7)], ["d", C(16.5, 31.5, 2.7)]],
  meeple: [["a", "M24 5a6 6 0 016 6c0 2-1 4-2 5 7 2 12 5 12 9 0 2-3 3-7 2l6 15H29l-5-9-5 9H9l6-15c-4 1-7 0-7-2 0-4 5-7 12-9-1-1-2-3-2-5a6 6 0 016-6z"]],
  question: [["a", C(24, 24, 18)], ["n", "M18 19a6 6 0 1110 4c-2 2-4 3-4 6"], ["k", C(24, 35, 1.9)]],
  fish: [["a", "M6 24c6-9 16-11 26-5l8-7v24l-8-7c-10 6-20 4-26-5z"], ["k", C(15, 22, 2)]],
  snitch: [["w", "M17 22C10 13 5 15 4 22c4-2 8 0 13 3zM31 22c7-9 12-7 13 0-4-2-8 0-13 3z"], ["a", C(24, 25, 8)]],
  bolt: [["a", "M27 4L10 27h11l-3 17 19-25H26z"]],
  door: [["a", R(11, 5, 26, 38, 3)], ["w", R(16, 10, 16, 12, 1)], ["k", C(32, 27, 1.9)]],
  box: [["a", "M6 16l18-9 18 9v18l-18 9-18-9z"], ["n", "M6 16l18 9 18-9M24 25v18"]],
  marbles: [["a", C(24, 13, 7)], ["w", C(14, 31, 7)], ["a", C(34, 31, 7)]],
  siren: [["a", "M12 34V24a12 12 0 0124 0v10z"], ["w", R(8, 34, 32, 7, 2)], ["n", "M24 5v4M9 11l3 3M39 11l-3 3"]],
  plusminus: [["a", C(24, 24, 18)], ["n", "M13 19h8M17 15v8M27 30h8"]],
};

const BY_SLUG: Record<string, keyof typeof GLYPHS> = {
  avalon: "shield", "la-resistencia": "fist", cartografos: "compass", "cartografos-heroes": "swords", pictionary: "pencil",
  "las-vegas-baby": "chip", "un-dia-en-las-carreras": "horseshoe", bleff: "book", "toma-6": "bull", "flip-7": "tent",
  "exploding-kittens-party-pack": "bomb", muse: "frame", yogi: "yogi", truco: "cards", "just-one": "bulb", "magic-maze": "hourglass",
  "eso-no-es-un-sombrero": "gift", "taco-gato-cabra-queso-pizza": "taco", "fantasma-blitz": "ghost", "sombras-sobre-londres": "tophat",
  clue: "magnifier", "pistas-cruzadas": "crossword", cometas: "kite", odin: "axe", nessos: "amphora", munchkin: "sword", plunder: "anchor",
  "medical-mysteries-nueva-york": "medcross", "medical-mysteries-miami": "medcross", "polilla-tramposa": "moth", "alice-ha-desaparecido": "phone",
  "the-night-cage": "candle", tranquilidad: "sailboat", canvas: "palette", "canvas-reflexiones": "palette", "sushi-go": "sushi",
  carcassonne: "castle", catan: "hexwheat", "catan-ampliacion-5-6": "hexwheat", clank: "gem", "stone-age": "flame", "mille-fiori": "mosaic",
  fossilis: "bone", kingdomino: "crown", "the-island": "volcano", "happy-little-dinosaurs": "egg", "casting-shadows": "crystal",
  "casting-shadows-ice-storm": "snowflake", quoridor: "bricks", "bienvenido-al-dungeon": "skull", "the-mind": "rabbit", "beacon-patrol": "lighthouse",
  bandido: "lantern", "gloomhaven-fauces-del-leon": "paw", "hive-pocket": "bee", "stratego-clasico": "flag", "little-secret": "mask",
  "rompecabezas-500": "puzzle", "el-camarero": "bell", "el-erudito": "gradcap", "el-ilustrado": "nib", "jardin-japones": "bamboo",
  "unanimo-party": "bubble", "sound-box": "speaker", barbecubes: "flame", "say-my-name": "clapper", yro: "wizard", "jurassic-park-digger": "pickaxe",
  "tenka-meidou": "castle", "dungeons-and-drinks": "beer", "hdp-dibujame": "pencil", equipazos: "meeple", kienparake: "question",
  "crimen-en-la-ciudad": "siren", "ha-sido-un-carnivoro": "paw", "golden-snitch": "snitch", masomenos: "plusminus", pescadores: "fish",
  derby: "horseshoe", "dominio-de-los-elementos": "flame", "mai-trago": "cocktail", "reino-dragon": "castle", "locos-de-euforia": "mask",
  "la-campana": "box", "pokemon-master-quest-2": "bolt", "llegue-juguemos": "door", "damas-chinas": "marbles",
};

export function Art({ slug, glyph, className = "" }: { slug?: string; glyph?: string; className?: string }) {
  const pieces = GLYPHS[glyph ?? (slug ? BY_SLUG[slug] : "") ?? "dice"] ?? GLYPHS.dice;
  return (
    <svg className={`artg ${className}`} viewBox="0 0 48 48" aria-hidden="true">
      {pieces.map(([cls, d, transform], i) => (
        <path key={i} className={cls} d={d} transform={transform} />
      ))}
    </svg>
  );
}

export const allGlyphs = Object.keys(GLYPHS);
