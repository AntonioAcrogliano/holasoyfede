import type { Guide } from "../../types";

// Juegos que estaban como "Falta info" y se completaron con el reglamento encontrado online.
export const nuevos: Record<string, Guide> = {
  "el-camarero": {
    howToPlay: {
      goal: "Ser el mejor mozo de la mesa: acordarte de lo que pidió cada uno, servir bien los platos y juntar más puntos que el resto.",
      setup: [
        "Cada jugador recibe 5 cartas de pedido, una de cada tipo: entrada, principal, guarnición, bebida y postre. Cada carta trae dos variedades.",
        "Ronda de pedidos: por turno, cada uno canta en voz alta sus cinco pedidos, eligiendo una variedad por carta, y deja la carta boca abajo con esa variedad apuntando hacia él. Todos tratan de memorizar los pedidos de toda la mesa.",
        "Armen la cocina: una carta de comida boca arriba por jugador en el centro. Al lado van el timbre, las fichas de queja y el mazo de comidas.",
        "Arranca el que fue a un restaurante más recientemente.",
      ],
      turn: [
        "En tu turno anunciás una de dos acciones: SERVIR un plato o DEVOLVER platos.",
        "Servir: agarrás una comida de la cocina, decís quién la pidió y con qué variedad, y la apoyás sobre esa carta de pedido. El comensal mira su carta (es el único momento en que se puede).",
        "Si acertaste plato y variedad, te quedás con esa carta de pedido. Si el plato no era de esa persona, te llevás una queja y la comida se descarta. Si era el plato pero erraste la variedad, te llevás una queja y el pedido se descarta.",
        "Devolver: señalás platos de la cocina que nadie pidió y te los quedás. Tenés que devolver 3 platos si son 2 a 4 jugadores, 2 si son 5 a 7, y 1 si son 8 o 9. De a 10 no se devuelve.",
        "Después se repone la cocina y sigue el siguiente.",
      ],
      end: "Termina cuando se sirvieron todos los pedidos o cuando la cocina se queda sin cartas. Cada pedido tuyo que quedó sin servir te da una queja. Gana el que más puntos suma.",
      tips: [
        "No intentes acordarte de todo: elegí dos o tres personas y sabete bien sus pedidos.",
        "El timbre es la mitad del juego: si ves que el mozo se equivoca, tocalo antes que los demás y servís vos.",
        "No podés servirte a vos mismo… salvo que otro esté sirviendo mal TU plato: ahí tocás el timbre y lo reclamás.",
      ],
      variants: [
        "Cualquier error de etiqueta (tocar el timbre y no decir nada, espiar una carta, mostrarla sin querer) también cuesta una queja.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Elegí: servir un plato o devolver platos.",
        "Servir: decí a quién y con qué variedad. El comensal chequea.",
        "Devolver: señalá los que nadie pidió (3 / 2 / 1 según cuántos son).",
        "Reponer la cocina y pasa el turno.",
      ],
      keyActions: [
        { name: "Timbre", text: "Cualquiera lo toca si cree que el mozo se equivocó. El primero dice el error y sirve bien: si tiene razón, el mozo se lleva la queja y él la carta. Si no, la queja es para el que tocó." },
        { name: "Reclamar", text: "Si están sirviendo mal tu propio plato, tocás el timbre y te lo servís vos." },
        { name: "Devolver mal", text: "Si señalás un plato que alguien sí pidió: queja, se corta tu turno y te quedás solo con los que venías acertando." },
      ],
      scoring: ["Carta de pedido: +3.", "Carta de comida (devuelta bien): +1.", "Ficha de queja: −2."],
      commonMistakes: [
        "Se sirve un solo plato por turno.",
        "Si el comensal ya dijo que la variedad está mal, para ese plato ya no se puede tocar el timbre.",
      ],
    },
  },

  "el-erudito": {
    howToPlay: {
      goal: "Ser el primer equipo en juntar 4 monedas «El Erudito». Se consiguen apostando plata en preguntas de cultura general.",
      setup: [
        "Armen hasta 4 equipos de la cantidad de gente que quieran (también se puede jugar solo, de 2 a 4).",
        "Cada equipo pone su ficha en la Salida y recibe $2000.",
        "Arranca el equipo de quien propuso jugar.",
      ],
      turn: [
        "Tirá los dos dados y avanzá en el sentido de la flecha.",
        "Elegí un equipo rival y cuánto apostar: como máximo, el número que marca la casilla. Los dos ponen esa plata en el pozo.",
        "El rival saca una tarjeta de la categoría de la casilla y te lee la pregunta.",
        "Si acertás, te llevás el pozo y volvés a tirar. Si errás, el pozo es del rival y pasa el turno.",
        "Podés encadenar hasta 3 preguntas seguidas; después de la tercera el turno pasa aunque hayas acertado.",
      ],
      end: "En el instante en que un equipo consigue su cuarta moneda, gana.",
      tips: [
        "Las monedas se compran a $1000 cayendo en una casilla E, hayas acertado o no la pregunta. También ganás una cada vez que pasás por la Salida (y cobrás $500 de cada rival).",
        "Elegí como rival al que menos plata tiene: no puede cubrir apuestas altas.",
        "Si te quedás sin plata podés vender una moneda al banco por $1000. Sin plata y sin monedas, quedás afuera.",
      ],
      variants: [
        "Versión familiar: los dos equipos responden por escrito a la vez y gana el que tiene más respuestas bien (o el más rápido).",
        "Los pasadizos del tablero te hacen saltar si acertás en la entrada… y retroceder si errás en la salida.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Dados y mover.",
        "Elegir rival y apuesta (tope: el número de la casilla).",
        "Responder la pregunta que te lee el rival.",
        "Bien: cobrás y seguís (máximo 3 seguidas). Mal: cobra el rival y pasa el turno.",
      ],
      keyActions: [
        { name: "Secuencia", text: "Ordenar cinco cosas." },
        { name: "Asociación", text: "Unir cinco elementos de una columna con cinco de otra." },
        { name: "En común", text: "Decir qué tienen en común cinco cosas." },
        { name: "Aproximación (amarilla)", text: "Todos los equipos apuestan y escriben un número. Gana el pozo el que más se acerca." },
        { name: "Suerte (S)", text: "Sacás una carta de suerte antes de la pregunta. Algunas se guardan." },
        { name: "Compra (E)", text: "Podés comprar UNA moneda por $1000." },
      ],
      scoring: ["Se juega a 4 monedas. El anotador sirve para llevarlas."],
      commonMistakes: [
        "Si errás la pregunta en una casilla E, en tu próximo turno no podés comprar ahí antes de tirar.",
        "Las monedas solo se compran al CAER en la casilla, no al pasar.",
      ],
    },
  },

  "el-ilustrado": {
    howToPlay: {
      goal: "Ser el equipo que más avanza en el tablero de puntos después de 4 rondas de preguntas.",
      setup: [
        "Armen equipos de 2 o 3 (con más de 3 equipos se hace largo). También se puede jugar individual.",
        "Llenen los tres sobres de cada color (azul y rosa) con 7 tarjetas cada uno, con la pista hacia arriba.",
        "Cada equipo pone su ficha en el inicio y agarra un tapatarjetas, lápiz y papel. Preparen un timer de 2 minutos.",
      ],
      turn: [
        "Elegir tarjeta: el primer equipo lee en voz alta las pistas visibles de los tres sobres del color de la ronda, elige una tarjeta y la pone bajo su tapatarjetas sin mirar el dorso. Pasa los sobres al equipo de la derecha.",
        "Ronda 1 — Equipo (azul): todos los equipos responden su tarjeta a la vez, con el timer corriendo. Corrige el equipo de la derecha.",
        "Ronda 2 — 1 vs 1 (rosa): duelos de a un jugador por equipo, respondiendo en silencio la misma tarjeta. No se puede repetir duelista.",
        "Ronda 3 — Último elige (azul): igual que la 1, pero el equipo que va último elige tarjeta primero.",
        "Ronda 4 — Todos todas (azul): cada equipo responde su tarjeta, la pasa a la derecha y responde la siguiente, hasta que todos contestaron todas.",
      ],
      end: "Siempre son 4 rondas. Gana el equipo que llegó más lejos en el tablero de puntos.",
      tips: [
        "La pista del sobre te dice el tema, no la dificultad: elijan por lo que saben, no por lo que suena fácil.",
        "En la ronda 2, quien responde menos de 4 bien no suma nada: mejor asegurar cuatro que arriesgar seis.",
      ],
      variants: [
        "El timer de 2 minutos es una sugerencia: pueden acortarlo o alargarlo.",
        "Para corregir, se usa el sentido común: si la respuesta es razonable, vale.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Leer las pistas de los tres sobres y elegir una tarjeta.",
        "Timer: 2 minutos para escribir las respuestas.",
        "Corrige otro equipo.",
        "Avanzar un casillero por respuesta correcta.",
      ],
      keyActions: [
        { name: "Ronda 1 · Equipo", text: "Azul. Todos a la vez, cada uno su tarjeta." },
        { name: "Ronda 2 · 1 vs 1", text: "Rosa. Duelos individuales en silencio. Menos de 4 bien = 0 puntos." },
        { name: "Ronda 3 · Último elige", text: "Azul. El que va último elige primero." },
        { name: "Ronda 4 · Todos todas", text: "Azul. Todos responden todas las tarjetas, rotándolas." },
      ],
      scoring: ["1 casillero por cada respuesta correcta."],
      commonMistakes: ["No se puede mirar el dorso de la tarjeta al elegirla: va directo bajo el tapatarjetas."],
    },
  },

  "jardin-japones": {
    howToPlay: {
      goal: "Dibujar el jardín que más puntos sume a lo largo de un año: 4 estaciones de 3 turnos cada una.",
      setup: [
        "Cada jugador agarra una hoja (una grilla de 6×6) y un lápiz.",
        "Dejen los 3 dados en el centro y repasen entre todos cómo puntúa cada decoración.",
      ],
      turn: [
        "Alguien tira los 3 dados: el resultado vale para todos. Cada cara tiene un ícono de decoración y un número.",
        "Cada uno, en su hoja, elige una opción. Opción A: usar dos dados como decoraciones y el tercero como ubicación; dibujás esas dos decoraciones en casillas vacías de la fila o la columna que marca ese número.",
        "Opción B, podar el bonsái (hasta 3 veces por partida): dibujás UNA decoración de uno de los dados en cualquier casilla vacía y tachás una hoja del bonsái.",
        "Anotás en el casillero del turno qué dados usaste. Si no podés hacer ninguna opción, ponés una X.",
        "Al terminar cada estación (cada 3 turnos) podés trazar un estanque: un grupo de casillas de agua pegadas. Máximo uno por estación.",
      ],
      end: "Después del verano se suman los puntos de decoraciones y estanques y se restan las penalidades. Gana el puntaje más alto; si hay empate, el que tiene más hojas de bonsái sin podar.",
      tips: [
        "Cada dado se usa como decoración O como número, nunca las dos cosas.",
        "Los árboles valen el doble en primavera y verano: guardales lugar.",
        "Planificá los estanques temprano: el musgo y los puentes dependen de ellos.",
      ],
      variants: [
        "Solitario: mismas reglas, y comparás tu total con la tabla de rangos (de Mushin, hasta 19, a Yugen, 61 o más).",
        "La caja trae 4 lápices; cantidad máxima de jugadores y duración, a confirmar.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Se tiran los 3 dados para todos.",
        "A: dos decoraciones en la fila o columna del tercer dado.",
        "B: podar (máx. 3 veces): una decoración donde quieras.",
        "Cada 3 turnos: podés trazar un estanque.",
      ],
      keyActions: [
        { name: "Farol de piedra", text: "3 puntos. En tierra, con al menos 3 casillas de separación de otro farol." },
        { name: "Bambú", text: "2 puntos cada uno, si está pegado a otro bambú. En tierra." },
        { name: "Árbol", text: "1 punto si lo dibujaste en otoño o invierno; 2 en primavera o verano. En tierra." },
        { name: "Roca", text: "1 punto en tierra, 2 en agua, si no tiene otra roca alrededor." },
        { name: "Musgo", text: "1 punto por cada casilla de agua que toca. En tierra, pegado a un estanque." },
        { name: "Puente", text: "En agua, uniendo dos casillas de tierra en línea recta. Según cuántos tengas: 1 / 4 / 9 / 15 puntos." },
        { name: "Estanque", text: "3 puntos cada uno. No pueden tocarse entre sí." },
      ],
      scoring: [
        "Sumá decoraciones + estanques.",
        "−1 por cada casilla de tierra sin decorar.",
        "−1 por cada decoración fuera de lugar (un farol en el agua, un puente en tierra…).",
      ],
      commonMistakes: [
        "Una sola decoración por casilla.",
        "Más de 4 puentes no suman nada extra.",
      ],
    },
  },

  "unanimo-party": {
    howToPlay: {
      goal: "Sumar más puntos que el resto escribiendo las mismas palabras que los demás. Acá no gana el original: gana el que piensa como todos.",
      setup: [
        "Cada jugador agarra un lápiz y una hoja de puntaje.",
        "Elijan el mazo: Familia (más simple) o Expertos (más picante, para adultos).",
        "Mezclen y dejen el mazo boca abajo en el centro.",
      ],
      turn: [
        "Se da vuelta una carta y se lee el tema en voz alta.",
        "Todos escriben, en secreto, 6 palabras (o grupos de palabras) relacionadas con ese tema.",
        "El primer jugador lee su primera palabra. Todos los que la escribieron levantan la mano: cada uno anota tantos puntos como manos levantadas. Si nadie más la puso, vale 0.",
        "Sigue con el resto de sus palabras, y después el siguiente jugador lee solo las que todavía no se dijeron.",
        "Cada uno suma el total de la carta.",
      ],
      end: "Se juegan 3 cartas. Gana el que más puntos suma entre las tres; si hay empate, se juega una carta más.",
      tips: [
        "Pensá en lo primero que le viene a la cabeza a todo el mundo, no en lo más ingenioso.",
        "Conocé a tu mesa: con tus amigos, «asado» puede ser más unánime que «carne».",
      ],
      variants: [
        "Con timer: un minuto para escribir. El primero que termina grita «¡Stop!» y todos sueltan el lápiz.",
        "Por equipos (para 8 o más): hasta 4 equipos que eligen sus 6 palabras entre todos y puntúan como si fueran un solo jugador.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Se lee el tema.",
        "Escribí 6 palabras.",
        "Se leen de a una: mano arriba si la tenés.",
        "Puntos por palabra = cantidad de manos levantadas.",
      ],
      scoring: [
        "Palabra que escribieron 4 personas: 4 puntos para cada una.",
        "Palabra que escribiste solo vos: 0.",
        "Son 3 cartas: usá el anotador por rondas.",
      ],
      commonMistakes: [
        "Mazo Familia: las palabras tienen que ser exactamente iguales.",
        "Mazo Expertos: los sinónimos valen como iguales, pero una categoría más amplia no («animal salvaje» no es «tigre»).",
      ],
    },
  },

  "sound-box": {
    howToPlay: {
      goal: "Es cooperativo: entre todos tienen que llevar el marcador de progreso hasta la corona antes de quedarse sin corazones. ¿Cómo? Uno adivina qué sonidos están haciendo los demás… todos a la vez.",
      setup: [
        "Usen el lado A del tablero si son 4 o 6, y el lado B si son 5 o 7.",
        "Pongan 10 cartas de sonido en los espacios 1 a 10 y las fichas de número 1 a 10 en la bolsa. Las fichas 11 a 20 van en sus lugares del recorrido.",
        "El marcador de progreso y el de corazones van al inicio de sus pistas.",
        "Los anteojos de Adivino son para quien escuchó la radio más recientemente. Con 6 o 7 jugadores hay además un Grabador, con sus propios anteojos.",
      ],
      turn: [
        "El Adivino mira bien las cartas y se pone los anteojos que le tapan la vista.",
        "Cada uno de los demás saca en secreto una ficha de la bolsa: ese es el número de la carta cuyo sonido le toca hacer.",
        "Arranca el timer y todos hacen su sonido A LA VEZ durante unos 13 segundos.",
        "El Adivino se saca los anteojos y va señalando cartas de a una. Mientras acierte, sigue. Al primer error, se corta.",
        "Avanzan un casillero de progreso por cada acierto, y pierden corazones por cada sonido que quedó sin adivinar (cada ficha dice cuántos).",
      ],
      end: "Ganan si el marcador de progreso llega a la corona. Pierden si el marcador de corazones llega al final de su pista.",
      tips: [
        "Buscá un sonido que se distinga del resto, no el más fiel: importa que se escuche entre el quilombo.",
        "Se puede usar el cuerpo y objetos que haya cerca. Lo que no vale es hablar, tararear canciones conocidas ni tocar al Adivino.",
        "Para las primeras partidas, dejen afuera los marcadores de Doble Sonido.",
      ],
      variants: [
        "Grabador (6 y 7 jugadores): también escucha a ciegas y después le repite al Adivino los sonidos que recuerda, sin hablar.",
        "Doble Sonido: un jugador saca 2 fichas y hace los dos sonidos en la misma tanda. Si adivinan los dos, avanzan 2.",
        "Duración de la partida: a confirmar con la caja.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Adivino: mirá las cartas y ponete los anteojos.",
        "Resto: sacá una ficha en secreto.",
        "13 segundos de ruido, todos juntos.",
        "Adivino: señalá cartas hasta errar.",
        "Progreso por aciertos, corazones por lo que faltó. Rotan los anteojos.",
      ],
      keyActions: [
        { name: "Acierto", text: "+1 de progreso. La carta sale y se repone." },
        { name: "Sin adivinar", text: "La ficha muestra 1 a 3 corazones: eso baja el marcador." },
        { name: "Nuevas cartas", text: "Al pasar por un casillero con número, esa ficha entra a la bolsa y se abre un espacio más." },
      ],
      commonMistakes: [
        "Nada de palabras reales ni canciones reconocibles.",
        "Si pierden por corazones, los aciertos de esa ronda no cuentan.",
      ],
    },
  },

  barbecubes: {
    howToPlay: {
      goal: "Ser el último parrillero en pie: apilar comida en la parrilla con las pinzas sin que se caiga nada.",
      setup: [
        "Vaciá las piezas de comida en la tapa de la lata y poné la lata abierta en el centro.",
        "Apoyá las dos piezas de parrilla una al lado de la otra sobre la lata.",
        "Dejá las pinzas al lado y el mazo de cartas boca abajo.",
        "Arranca el que fue a un asado más recientemente.",
      ],
      turn: [
        "Da vuelta la carta de arriba: te dice qué pieza de comida agregar y sobre cuántas barras de la parrilla tiene que apoyarse.",
        "Si la carta tiene el ícono de cambio de mano, usás las pinzas con tu mano menos hábil.",
        "Con las pinzas, levantá esa pieza de la tapa y colocala en la parrilla, en la posición que quieras, tocando esa cantidad de barras. Podés empujar las que ya están para hacer lugar.",
        "Si se te cae alguna pieza de la parrilla o tu pieza cae adentro de la lata, te quedás con la carta.",
        "Pasá las pinzas al de la izquierda.",
      ],
      end: "Con tu segunda carta quedás eliminado. Gana el último que queda. Si se acaba el mazo y siguen varios, comparten la victoria.",
      tips: [
        "Armá una base ancha al principio: las piezas grandes abajo.",
        "Si tu pieza se cae afuera de la lata (sobre la mesa), no pasa nada: la levantás con las pinzas y probás de nuevo.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Da vuelta una carta.",
        "Poné esa pieza con las pinzas, sobre la cantidad de barras indicada.",
        "¿Se cayó algo? Te quedás la carta.",
        "Pasá las pinzas.",
      ],
      scoring: ["Primera carta: aviso. Segunda carta: afuera."],
      commonMistakes: [
        "Todo se hace con las pinzas: nada de dedos.",
        "La cantidad de barras que toca la pieza tiene que ser exactamente la de la carta.",
      ],
    },
  },

  "say-my-name": {
    howToPlay: {
      goal: "Que tu equipo adivine más nombres (de películas, libros, personajes…) que los demás a lo largo de tres rondas, cada una con menos permisos para dar pistas.",
      setup: [
        "Armen equipos (de a 2 es lo ideal) y siéntense intercalados.",
        "Elijan categoría: Títulos, Personajes o Vale todo.",
        "Repartan 8 cartas a cada uno: cada jugador se queda con 5 en secreto y devuelve 3. Todas las elegidas se mezclan en un solo mazo.",
        "Cada uno saca además una carta al azar de la caja para la ronda relámpago. Preparen un timer de 30 segundos.",
      ],
      turn: [
        "El que da pistas saca la carta de arriba y arranca el timer de 30 segundos.",
        "Si su equipo adivina, se quedan la carta y saca otra. Así hasta que se acabe el tiempo.",
        "Después pasa el mazo al jugador de la izquierda, que lo mezcla y juega su turno.",
        "La ronda termina cuando se adivinaron todas las cartas. Cada equipo anota 1 punto por carta y se vuelven a mezclar TODAS para la ronda siguiente.",
      ],
      end: "Después de la tercera ronda, gana el equipo con más puntos.",
      tips: [
        "Como las cartas son las mismas en las tres rondas, prestá atención a las pistas de los otros equipos: después te van a servir.",
        "Al elegir tus 5 cartas, quedate con las que tu equipo conoce (y el otro no).",
      ],
      variants: [
        "Todos contra todos (para 3, 5 o 7): cada uno hace adivinar sus propias cartas a toda la mesa; suma el que adivina y el que hizo adivinar.",
        "En la caja figura para 3 a 12 jugadores.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Sacá una carta y arrancá el timer (30 s).",
        "Dá pistas según lo que permite la ronda.",
        "Adivinada: la carta es de tu equipo y sacás otra.",
        "Se acabó el tiempo: pasás el mazo.",
      ],
      keyActions: [
        { name: "Ronda 1", text: "Podés hablar, actuar y hacer sonidos. No podés decir palabras del nombre ni traducciones. No se puede pasar. Intentos ilimitados." },
        { name: "Ronda 2", text: "Una sola palabra por carta, más actuación. Se puede pasar. Un solo intento por carta." },
        { name: "Relámpago", text: "Entre la 2 y la 3: cada uno lee las tres categorías de su carta y el primero que adivina la palabra clave se la queda." },
        { name: "Ronda 3", text: "Solo mímica: ni hablar ni sonidos. Se puede pasar. Un solo intento." },
      ],
      scoring: ["1 punto por carta adivinada, en cada ronda y en la relámpago."],
      commonMistakes: [
        "En la ronda 1, romper una regla te hace perder el turno entero.",
        "Las cartas pasadas o no adivinadas vuelven al mazo al final del turno.",
      ],
    },
  },

  yro: {
    howToPlay: {
      goal: "Tener más puntos de victoria que el resto reclutando aventureros en tu grilla de 3×3.",
      setup: [
        "Poné el tablero compartido (combate y puntos) en el centro. Cada uno agarra su tablero personal y sus 4 marcadores.",
        "Mezclá el mazo de aventureros y repartí 5 cartas a cada uno.",
        "Cada jugador recibe 5 de dinero y deja lugar delante para una grilla de 3×3 cartas.",
      ],
      turn: [
        "Todos juegan a la vez, fase por fase.",
        "ROBAR: descartá las cartas que quieras y volvé a tener 5.",
        "RECLUTAR: elegís entre reclutar 2 cartas pagando las dos, reclutar 1 (y cobrar 1 de dinero o pagarla con 1 de descuento), o no reclutar y cobrar 2. Las cartas nuevas van pegadas a una que ya tengas y no se mueven más.",
        "COMBATE: sumá el poder de tus tres aventureros de la primera línea. Según el ranking de poder se reparten puntos.",
        "PRODUCCIÓN e INGRESOS: avanzás tus marcadores de magia y tecnología, y cobrás 3 de dinero más lo que den tus cartas.",
        "PUNTOS: sumás los puntos de victoria que dan tus cartas reclutadas.",
      ],
      end: "Se termina cuando alguien llega a 40 puntos o recluta su novena carta: se completa ese turno, cada 3 de dinero se convierten en 1 punto y gana el que más tiene.",
      tips: [
        "Completar una fila o columna de tres cartas de la misma facción o profesión da un bonus: armá la grilla pensando en eso.",
        "La primera línea es la que pelea: poné ahí el poder, y atrás lo que produce.",
      ],
      variants: [
        "Solitario, draft (en vez de robar se pasan cartas) y misiones opcionales que dan 3 puntos cada una.",
        "En la caja figura para 1 a 5 jugadores y unos 30 minutos.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Robar hasta 5.",
        "Reclutar 2, 1 o 0 cartas.",
        "Combate: poder de la primera línea.",
        "Producción e ingresos (+3 de dinero).",
        "Puntos de tus cartas.",
      ],
      keyActions: [
        { name: "Reclutar 2", text: "Pagás el costo de las dos." },
        { name: "Reclutar 1", text: "Cobrás 1, o la pagás con 1 de descuento." },
        { name: "Reclutar 0", text: "Cobrás 2." },
      ],
      scoring: [
        "Combate, de a 2: el primero 4. De a 3: 5 y 3. De a 4 o 5: 5, 3 y 1.",
        "Puntos de los íconos de tus cartas, todos los turnos.",
        "Al final: 1 punto cada 3 de dinero.",
      ],
      commonMistakes: [
        "Las cartas no se mueven ni se reemplazan una vez puestas.",
        "El efecto de reclutamiento de una carta se resuelve una sola vez, al colocarla.",
      ],
    },
  },

  "jurassic-park-digger": {
    howToPlay: {
      goal: "Juntar fichas de dinosaurio: gana al instante el que consigue las 5 especies, o el que más fichas tiene después de 3 rondas.",
      setup: [
        "El mazo tiene 50 cartas: 5 especies con valores del 1 al 10. Las cartas del 1 al 5 traen piedras de ámbar.",
        "Mezclá y repartí 5 cartas a cada uno. El resto es el mazo.",
      ],
      turn: [
        "El que sale elige la regla de la baza: valores PARES, IMPARES, CONSECUTIVOS o IGUALES.",
        "Juega de 2 a 5 cartas que cumplan esa regla. Pueden ser de distintas especies.",
        "Los demás, en orden, también tienen que jugar de 2 a 5 cartas que cumplan la regla. Si podés, estás obligado.",
        "Si no podés, pasás, o descartás las cartas que quieras y robás la misma cantidad.",
        "Por cada especie jugada, la carta más alta se la queda su dueño delante de él. Las demás se descartan.",
        "Todos roban hasta tener 5 y sale el siguiente.",
      ],
      end: "La ronda termina cuando cada jugador salió la cantidad de veces que corresponde (2 cada uno, de a 3 o 4). Ahí se entrega la ficha de cada especie al que más puntos tiene en ella. Tres rondas, o hasta que alguien tenga las 5.",
      tips: [
        "Las cartas bajas pierden las bazas, pero si te las llevás valen doble por el ámbar.",
        "Elegí la regla mirando qué te deja jugar muchas cartas a vos y pocas a los demás.",
      ],
      variants: ["Cantidad de salidas por ronda de a 2 jugadores: a confirmar con el reglamento."],
    },
    cheatSheet: {
      yourTurn: [
        "Si salís: elegí la regla (pares, impares, consecutivos o iguales).",
        "Jugá de 2 a 5 cartas que la cumplan.",
        "La más alta de cada especie se la guarda quien la jugó.",
        "Robá hasta 5.",
      ],
      scoring: [
        "Por especie: 1 punto por carta ganada + 1 por cada piedra de ámbar.",
        "El que más puntos tiene en una especie se lleva su ficha.",
        "Empate: gana la suma más alta de esas cartas; si sigue, la carta más alta.",
      ],
      commonMistakes: [
        "Mínimo 2 cartas: con una sola no se puede jugar.",
        "No hay que seguir la especie del que salió, solo la regla.",
      ],
    },
  },

  "tenka-meidou": {
    howToPlay: {
      goal: "Sumar más puntos que el resto dominando las regiones de un mapa del Japón feudal con tus cubos.",
      setup: [
        "El mapa tiene 11 regiones. Repartí al azar las fichas del 2 al 12, una por región: ese número es lo que vale.",
        "Poné boca arriba tantas cartas de acción como jugadores más una.",
        "Cada jugador toma los cubos de su color.",
      ],
      turn: [
        "Tirá los tres dados. Podés volver a tirar una vez, pero los tres juntos.",
        "Separalos en un par y uno suelto.",
        "La suma del par indica la región (la que tiene esa ficha) donde ponés cubos.",
        "El dado suelto dice cuántos: la mitad de su valor, redondeando para arriba.",
        "Una vez por partida, en lugar de tirar, podés tomar y usar una de las cartas de acción (mover cubos a una región vecina, reemplazar un cubo rival, etc.).",
      ],
      end: "Termina cuando todos colocaron todos sus cubos. Las regiones se resuelven de menor a mayor valor: el que tiene más cubos se lleva los puntos (de a 3 o 4, el segundo cobra la mitad).",
      tips: [
        "Al ganar una región sumás 2 cubos de refuerzo en cada región vecina todavía sin resolver donde ya tengas al menos uno. Ganar las baratas te empuja hacia las caras.",
        "El primero que se queda sin cubos se lleva la mejor ficha de desempate, y desde ahí nadie más puede usar cartas.",
      ],
      variants: [
        "Esto está armado a partir de una reseña, no del reglamento: cuántos cubos tiene cada uno y el detalle de las cartas están a confirmar.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Tirá 3 dados (una repetición, de los tres).",
        "Par = región. Suelto = cubos (la mitad, hacia arriba).",
        "O, una sola vez en la partida, usá una carta de acción.",
      ],
      scoring: [
        "Se resuelve del 2 al 12.",
        "Mayoría: puntos de la región. Segundo (3–4 jugadores): la mitad.",
        "El ganador refuerza con 2 cubos las vecinas sin resolver donde ya esté.",
      ],
      commonMistakes: ["Los refuerzos cuentan para las regiones que se resuelven después: el orden importa mucho."],
    },
  },
};
