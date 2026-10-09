import type { Guide } from "../../types";

export const estrategia: Record<string, Guide> = {
  plunder: {
    howToPlay: {
      goal: "Ser el primer pirata en juntar 10 puntos de botín.",
      setup: [
        "Armá el mapa con las piezas de mar e islas.",
        "Cada jugador arranca con un barco básico, algunos recursos y elige dónde zarpa.",
        "Dejá a mano las cartas de recurso, las de tesoro, los mástiles, cañones y botes.",
      ],
      turn: [
        "Cobrá una carta de recurso por cada isla que controlás.",
        "Gastá recursos para mejorar: mástiles (más movimiento), cañones (más fuerza), botes salvavidas (más vidas) o barcos nuevos.",
        "Tirá el dado de navegación: esos son los puntos de movimiento que repartís entre tus barcos (los mástiles suman).",
        "Si llegás a una isla sin dueño, podés conquistarla tirando el dado contra su número de calavera. Si es de otro, se pelea.",
        "Si llegás al casillero de otro barco, podés atacarlo: cada uno tira un dado y suma sus cañones.",
      ],
      end: "En cuanto alguien llega a 10 puntos de botín, gana.",
      tips: [
        "Las primeras islas son las que más rinden: te dan recursos todos los turnos.",
        "Un barco sin botes se hunde con un solo combate perdido.",
        "Las X del mapa dan cartas de tesoro: puede haber recursos, puntos o sorpresas.",
      ],
      variants: [
        "De dónde salen los puntos (islas, barcos, barcos hundidos, tesoros) y las tormentas: confirmá el detalle con el reglamento.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Cobrá recursos por tus islas.",
        "Comprá mejoras y comerciá.",
        "Tirá el dado y navegá.",
        "Conquistá islas, atacá barcos o buscá tesoros.",
      ],
      keyActions: [
        { name: "Mástil", text: "+1 de movimiento para ese barco." },
        { name: "Cañón", text: "+1 al dado en combate." },
        { name: "Bote salvavidas", text: "Aguanta un golpe antes de hundirte." },
        { name: "Combate", text: "Dado + cañones. El más alto gana." },
      ],
      scoring: [
        "Sumás puntos de botín por islas conquistadas, barcos propios, barcos enemigos hundidos y algunas cartas de tesoro.",
        "Se juega a 10. Llevalo con el anotador.",
      ],
      commonMistakes: ["Los puntos por islas y barcos se pierden si te los sacan: el marcador sube y baja."],
    },
  },

  "medical-mysteries-nueva-york": {
    howToPlay: {
      goal: "Es cooperativo: son el equipo de guardia y tienen que diagnosticar al paciente y tratarlo bien para que pase la noche.",
      setup: [
        "Si es la primera vez, arranquen por el caso tutorial: enseña el sistema paso a paso.",
        "Elijan un caso (cada paciente viene en su sobre) y saquen la entrevista de ingreso, la historia clínica y la planilla del paciente.",
        "Dejen a mano las hojas de investigación (describen enfermedades posibles) y el cuadernillo de códigos de resultado. No espíen nada más del sobre.",
      ],
      turn: [
        "Lean en voz alta la entrevista de ingreso y la historia clínica.",
        "Entre todos deciden qué hacer: pedir un estudio, consultar a un especialista o indicar un tratamiento.",
        "Cada acción tiene un código: lo buscan en el cuadernillo y leen el resultado.",
        "Cada acción hace avanzar el reloj del caso, y el estado del paciente puede cambiar: aparecen cartas de historia y de estado nuevas.",
        "Crucen los síntomas con las hojas de investigación para ir descartando enfermedades.",
      ],
      end: "El caso termina cuando llegan al diagnóstico y al tratamiento final (o cuando se acaba el tiempo). Se lee el epílogo y se cuenta el puntaje según qué tan buenas fueron las decisiones.",
      tips: [
        "Nombren a alguien que anote: qué pidieron, qué dio y a qué hora.",
        "No pidan estudios porque sí: cada uno gasta tiempo.",
        "Cada caso se juega una sola vez. No lean el epílogo antes.",
      ],
      variants: [
        "El detalle de cómo se leen los códigos y cómo se puntúa está en el reglamento de la caja: a confirmar antes de la primera partida.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Repasen lo que saben del paciente.",
        "Elijan UNA acción entre todos.",
        "Busquen el código y lean el resultado.",
        "Avancen el reloj y actualicen la planilla.",
      ],
      keyActions: [
        { name: "Estudios", text: "Dan datos nuevos, pero cuestan tiempo." },
        { name: "Especialistas", text: "Orientan hacia un grupo de enfermedades." },
        { name: "Tratamiento", text: "Si es el correcto, suma puntos y estabiliza. Si no, puede empeorar." },
      ],
      scoring: ["Suman puntos por decisiones correctas y por llegar al diagnóstico. Tabla exacta: en el reglamento."],
      commonMistakes: ["Tratar antes de tener diagnóstico suele salir caro."],
    },
  },

  "medical-mysteries-miami": {
    howToPlay: {
      goal: "Es cooperativo: diagnosticar y tratar a los pacientes de una guardia de Miami antes de que se acabe el tiempo.",
      setup: [
        "Funciona igual que Medical Mysteries: Nueva York, con casos nuevos.",
        "Elijan un caso y saquen solo el material inicial del paciente.",
        "Tengan a mano las hojas de investigación y el cuadernillo de códigos.",
      ],
      turn: [
        "Lean el ingreso del paciente.",
        "Decidan entre todos una acción: estudio, interconsulta o tratamiento.",
        "Busquen el código de esa acción y lean el resultado.",
        "Avancen el reloj y anoten lo que cambió.",
      ],
      end: "Cuando llegan al diagnóstico y tratamiento final, o se termina el tiempo. Se lee el epílogo y se puntúa.",
      tips: [
        "Si ya jugaron el de Nueva York, pueden saltear el tutorial.",
        "Cada caso es de un solo uso.",
      ],
      variants: ["Esta edición no la pude verificar: reglas y cantidad de jugadores a confirmar con la caja."],
    },
    cheatSheet: {
      yourTurn: [
        "Repasar síntomas.",
        "Elegir una acción.",
        "Leer el código de resultado.",
        "Avanzar el reloj.",
      ],
      commonMistakes: ["No abran sobres ni lean cartas antes de que el juego lo indique."],
    },
  },

  "polilla-tramposa": {
    howToPlay: {
      goal: "Quedarte sin cartas antes que el resto… haciendo trampa. Literalmente: está permitido hacer desaparecer cartas.",
      setup: [
        "Repartí 8 cartas a cada uno. El resto es el mazo, con una carta boca arriba al lado.",
        "Elijan quién arranca siendo la Chinche Guardiana: se queda con esa carta frente a él.",
      ],
      turn: [
        "Jugá una carta que sea exactamente un número más alta o más baja que la de arriba del descarte. Si no podés, robás una.",
        "En cualquier momento, cualquiera que NO sea la guardiana puede hacer desaparecer cartas: tirarlas abajo de la mesa, guardarlas en la manga… de a una por vez.",
        "La guardiana no puede hacer trampa: vigila. Si ve a alguien y lo acusa bien, el tramposo recupera esa carta, recibe además una carta de la mano de la guardiana y pasa a ser la nueva guardiana.",
        "Las cartas con bichos tienen efectos especiales cuando se juegan.",
      ],
      end: "La ronda termina cuando alguien se queda sin cartas en la mano. Los demás suman puntos negativos por lo que les quedó. Se juegan varias rondas y gana el que menos tiene.",
      tips: [
        "Las polillas tramposas no se pueden jugar nunca: la única forma de sacártelas es con trampa.",
        "Hacé trampa cuando la guardiana está mirando a otro o está robando.",
        "Tu mano siempre tiene que estar arriba de la mesa, a la vista.",
      ],
      variants: [
        "Cantidad de rondas y valor exacto de las cartas en la mano al final: a confirmar con el reglamento.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Jugá una carta ±1 de la que está arriba.",
        "¿No podés? Robá una.",
        "Mientras tanto: desaparecé cartas, de a una, sin que te vean.",
      ],
      keyActions: [
        { name: "Polilla tramposa", text: "No se puede jugar. Solo se va con trampa." },
        { name: "Mosquito", text: "Todos golpean la carta; el último recibe una carta de cada uno." },
        { name: "Araña", text: "Le regalás una carta de tu mano a otro." },
        { name: "Hormiga", text: "Todos los demás roban una carta." },
        { name: "Cucaracha", text: "Cualquiera puede tirar encima, fuera de turno, una carta del mismo número." },
      ],
      scoring: ["Puntos negativos por las cartas que te quedaron. Las de bichos pesan más (valores a confirmar)."],
      commonMistakes: [
        "La última carta no se puede hacer desaparecer: hay que jugarla.",
        "La guardiana tampoco puede sacarse de encima su carta de guardiana.",
        "Acusar mal tiene costo: la guardiana roba una carta.",
      ],
    },
  },

  "alice-ha-desaparecido": {
    howToPlay: {
      goal: "Es un juego de rol silencioso: entre todos, y solo por mensajes de texto, reconstruyen qué le pasó a Alice Briarwood. No se gana ni se pierde: se cuenta una historia.",
      setup: [
        "Armen un grupo de chat con todos los jugadores y pongan el video con el temporizador y la música (dura 90 minutos).",
        "Cada uno elige un personaje con su secreto y su vínculo con Alice. Uno hace de facilitador (también juega).",
        "Repartan las cartas de motivación y armen los mazos de sospechosos, lugares y pistas.",
        "Antes de arrancar, hablando, cada uno presenta a su personaje y graba un mensaje de voz para Alice.",
      ],
      turn: [
        "Arranca el reloj y nadie habla más: todo pasa por el chat, en el grupo o por privado.",
        "Cada uno tiene cartas de pista con una hora marcada. Cuando el reloj llega a esa hora, das vuelta tu carta y hacés lo que dice: revelar un sospechoso, ir a un lugar, descubrir algo.",
        "Contás por chat lo que tu personaje encuentra y siente, y reaccionás a lo que escriben los demás.",
        "Las cartas van cerrando opciones hasta que la historia se define sola.",
      ],
      end: "A los 90 minutos se revela qué le pasó a Alice. Al final, todos escuchan los mensajes de voz que grabaron al principio y charlan sobre la partida.",
      tips: [
        "Escribí como escribirías por WhatsApp: corto, con errores, con emoción.",
        "No hace falta «resolver»: lo lindo es lo que le pasa a tu personaje.",
        "Tiene temas pesados. Hablen antes sobre qué prefieren evitar.",
      ],
      variants: [
        "Silent Falls es la expansión: suma personajes, sospechosos y lugares nuevos para rejugar.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Mirá el reloj.",
        "Cuando llegue la hora de tu carta, dala vuelta.",
        "Contá por chat lo que pasó.",
        "Respondé a los demás en personaje.",
      ],
      keyActions: [
        { name: "Cartas de pista", text: "Se activan en un minuto exacto del temporizador." },
        { name: "Mensajes privados", text: "Están permitidos, y a veces son la mejor parte." },
      ],
      commonMistakes: [
        "No se habla en voz alta durante los 90 minutos.",
        "No adelantes tus cartas: la tensión depende del reloj.",
      ],
    },
  },

  "the-night-cage": {
    howToPlay: {
      goal: "Es cooperativo: cada jugador tiene que encontrar una llave y después todos tienen que juntarse en una misma puerta para escapar, antes de que se acaben las losetas.",
      setup: [
        "Cada jugador pone su loseta inicial en el tablero con su peón encima.",
        "Mezclá las losetas (pasillos, llaves, puertas, monstruos, pozos) en pilas boca abajo. La cantidad depende de los jugadores.",
        "Cada uno recibe sus fichas de nervio.",
      ],
      turn: [
        "Elegís: quedarte quieto o moverte a una loseta conectada.",
        "Tu vela ilumina solo las casillas vecinas conectadas por pasillo: robás losetas y las colocás ahí.",
        "Lo que queda fuera de la luz de todas las velas desaparece: esas losetas se sacan del tablero.",
        "Si aparece un monstruo y te ve en línea recta, ataca: perdés nervio, se descartan losetas del mazo y tu vela se apaga un turno.",
        "Si pisás una loseta de llave, te la guardás. Si caés en un pozo, reaparecés en otro lado.",
      ],
      end: "Ganan si todos, cada uno con su llave, están parados juntos sobre una loseta de puerta. Pierden si se acaban las losetas antes.",
      tips: [
        "El mazo es el reloj: cada paso gasta losetas. No caminen de más.",
        "Quedarse quieto mantiene iluminado el camino para que pase un compañero.",
        "El tablero «da la vuelta»: lo que sale por un borde entra por el opuesto.",
      ],
      variants: [
        "El reglamento trae monstruos avanzados para subir la dificultad.",
        "Algunos detalles del ataque de los monstruos están resumidos: confirmalos con el reglamento.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Quedate o movete una loseta.",
        "Iluminá: colocá losetas nuevas en las conexiones.",
        "Sacá las losetas que quedaron a oscuras.",
        "Resolvé lo que apareció (monstruo, llave, pozo).",
      ],
      keyActions: [
        { name: "Llave", text: "Cada jugador necesita la suya." },
        { name: "Puerta", text: "Todos juntos, con llave, sobre la misma puerta." },
        { name: "Monstruo", text: "Ataca en línea recta. Cuesta nervio y losetas." },
      ],
      commonMistakes: [
        "Una loseta con un jugador encima nunca desaparece.",
        "Sin luz no se colocan losetas nuevas.",
      ],
    },
  },

  tranquilidad: {
    howToPlay: {
      goal: "Es cooperativo y en silencio: llenar la grilla de 6×6 con cartas en orden creciente, jugar una carta de Inicio y cerrar con una de Final.",
      setup: [
        "Armá el marco para una grilla de 6×6.",
        "Mezclá las cartas del 1 al 80 con las 5 de Final y repartilas en partes iguales: ese es el mazo personal de cada uno.",
        "Mezclá las cartas de Inicio dentro de las primeras cartas de cada mazo (según indica el reglamento) y robá 5.",
      ],
      turn: [
        "Elegí una de dos: JUGAR una carta en la grilla, o DESCARTAR 2 cartas.",
        "Los números tienen que quedar en orden creciente leyendo de izquierda a derecha y de abajo hacia arriba, pero podés dejar huecos.",
        "Si la carta queda pegada a otra, tenés que descartar tantas cartas como la diferencia entre las dos (un 45 al lado de un 49 cuesta 4). Si queda entre dos, pagás la diferencia más chica.",
        "Jugar la carta de Inicio es tu acción del turno: va afuera de la grilla, y entre todos descartan 8 cartas (solo pueden acordar cuántas pone cada uno).",
        "Reponé tu mano hasta 5.",
      ],
      end: "Ganan si, con la grilla completa y el Inicio jugado, alguien juega una carta de Final. Pierden si a alguien le toca jugar y no puede ni colocar ni descartar 2.",
      tips: [
        "Dejá huecos generosos al principio: una carta pegada a su vecina exacta (diferencia 1) es carísima de preparar pero barata de pagar.",
        "Cuiden las cartas de Final: son solo 5 y descartarlas todas es perder.",
        "No se puede hablar de las cartas. Los silencios y las caras, bueno… pasan.",
      ],
      variants: [
        "De a 2: antes de descartar las 8 cartas del Inicio, cada uno roba 2 extra.",
        "Solitario y mini expansiones: en el reglamento.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Jugá una carta en la grilla, o descartá 2.",
        "Si queda pegada a otra, descartá la diferencia.",
        "Robá hasta tener 5.",
      ],
      keyActions: [
        { name: "Inicio", text: "Se juega una sola vez. Cuesta 8 descartes entre todos." },
        { name: "Final", text: "Solo con la grilla llena y el Inicio jugado. Ganan." },
      ],
      commonMistakes: [
        "Sin huecos no hay donde poner: mirá qué números faltan entre dos cartas antes de pegarlas.",
        "Las cartas de Inicio que sobran se pueden descartar como cualquier otra.",
      ],
    },
  },

  canvas: {
    howToPlay: {
      goal: "Pintar 3 cuadros que sumen la mayor cantidad de puntos según los 4 criterios de la partida.",
      setup: [
        "Poné 4 cartas de criterio al azar con sus pilas de cintas al lado.",
        "Armá una fila de 5 cartas de arte transparentes.",
        "Cada jugador recibe 3 fondos, 3 fundas y 4 fichas de inspiración.",
      ],
      turn: [
        "Elegí UNA de dos acciones.",
        "TOMAR una carta de arte: la primera de la izquierda es gratis; para llevarte una más a la derecha, dejás una ficha de inspiración sobre cada carta que salteás. Si la carta tiene fichas encima, te las llevás.",
        "PINTAR un cuadro: elegís 3 cartas de arte de tu mano, las apilás en el orden que quieras dentro de una funda con un fondo, y lo puntuás contra los 4 criterios llevándote las cintas que correspondan.",
        "No podés tener más de 5 cartas de arte en la mano.",
      ],
      end: "Cuando todos terminaron sus 3 cuadros. Se cuentan las cintas de cada color según la tabla de su criterio y gana el que más suma.",
      tips: [
        "El orden de las capas importa: lo de arriba tapa lo de abajo. Solo cuentan los íconos que quedan a la vista.",
        "Mirá los 4 criterios antes de agarrar tu primera carta.",
        "El nombre del cuadro se arma solo con las cartas: léanlo en voz alta, es parte de la gracia.",
      ],
      variants: ["Tiene modo solitario contra un rival automático."],
    },
    cheatSheet: {
      yourTurn: [
        "Tomá una carta de arte (pagando inspiración por las que salteás)…",
        "…o pintá un cuadro con 3 cartas y un fondo.",
        "Al pintar, cobrá cintas por cada criterio cumplido.",
      ],
      keyActions: [
        { name: "Inspiración", text: "Una ficha por cada carta que salteás. Las fichas sobre la carta que agarrás son tuyas." },
        { name: "Cintas plateadas", text: "Bonus de algunas cartas: 2 puntos cada una." },
      ],
      scoring: [
        "Cada criterio tiene su tabla: cuántos puntos da tener 1, 2, 3… cintas de ese color.",
        "Sumá los 4 criterios + plateadas.",
      ],
      commonMistakes: [
        "Con 5 cartas en la mano estás obligado a pintar.",
        "Solo se puntúan los íconos visibles en la franja de abajo.",
      ],
    },
  },

  "canvas-reflexiones": {
    howToPlay: {
      goal: "Igual que Canvas: pintar los 3 cuadros que más puntos sumen. La expansión agrega cartas y criterios nuevos.",
      setup: [
        "Prepará una partida normal de Canvas.",
        "Mezclá las cartas de arte y los criterios de Reflexiones con los del juego base (o usá solo los nuevos para probarlos).",
        "Sumá los componentes nuevos que indique el reglamento de la expansión.",
      ],
      turn: [
        "El turno no cambia: tomás una carta de arte o pintás un cuadro.",
        "Las cartas nuevas traen elementos de reflejo/espejo que interactúan con lo que hay en otras capas.",
      ],
      end: "Cuando todos pintaron sus 3 cuadros, se cuentan las cintas.",
      tips: ["Si es la primera vez con la expansión, usá al menos 2 criterios nuevos para ver qué cambia."],
      variants: ["El funcionamiento exacto de las cartas de reflejo está a confirmar con el reglamento de la expansión."],
    },
    cheatSheet: {
      yourTurn: ["Tomar una carta de arte o pintar un cuadro, igual que en Canvas."],
      scoring: ["Cintas por criterio + plateadas, como en el juego base."],
      commonMistakes: ["No es un juego independiente: necesitás Canvas."],
    },
  },

  "sushi-go": {
    howToPlay: {
      goal: "Sumar más puntos que el resto en 3 rondas armando combinaciones de sushi.",
      setup: [
        "Mezclá todas las cartas.",
        "Repartí según cuántos son: 2 jugadores, 10 cartas · 3 jugadores, 9 · 4 jugadores, 8 · 5 jugadores, 7.",
      ],
      turn: [
        "Todos eligen una carta de su mano y la ponen boca abajo.",
        "Se revelan a la vez y quedan frente a cada uno.",
        "Cada uno pasa el resto de su mano al jugador de la izquierda.",
        "Se repite hasta que no quedan cartas.",
      ],
      end: "Al terminar cada ronda se puntúa todo menos los puddings, que quedan en la mesa. Después de la 3ª ronda se puntúan los puddings y gana el que más tiene.",
      tips: [
        "Acordate de qué manos pasaron: sabés qué cartas van a volver.",
        "No te olvides de los puddings: −6 al final duele.",
        "Un wasabi sin nigiri arriba no vale nada.",
      ],
      variants: ["De a 2: hay una variante con un tercer jugador fantasma en el reglamento."],
    },
    cheatSheet: {
      yourTurn: [
        "Elegí una carta y ponela boca abajo.",
        "Revelan todos juntos.",
        "Pasá tu mano a la izquierda.",
      ],
      keyActions: [
        { name: "Palitos", text: "En un turno futuro, decí «¡Sushi Go!» y jugá 2 cartas; los palitos vuelven a la mano que pasás." },
        { name: "Wasabi", text: "El próximo nigiri que juegues va encima y vale el triple." },
      ],
      scoring: [
        "Maki: el que más tiene, 6; el segundo, 3 (los empates se reparten).",
        "Tempura: 5 por cada par. Sashimi: 10 por cada trío.",
        "Gyozas: 1, 3, 6, 10 o 15 puntos por tener 1, 2, 3, 4 o 5+.",
        "Nigiri: huevo 1, salmón 2, calamar 3.",
        "Pudding (al final): el que más tiene +6, el que menos −6. De a 2 no hay penalización.",
      ],
      commonMistakes: [
        "Tempura y sashimi incompletos valen 0.",
        "Los puddings no se descartan entre rondas.",
      ],
    },
  },

  clank: {
    howToPlay: {
      goal: "Bajar a la guarida del dragón, robar un artefacto y salir vivo con más puntos que el resto.",
      setup: [
        "Cada jugador arranca con el mismo mazo básico de 10 cartas y roba 5.",
        "Poné los artefactos, secretos y fichas en el tablero, y armá la fila de 6 cartas de la mazmorra.",
        "Meté los cubos negros del dragón en la bolsa. Cada uno pone algunos cubos de Clank! propios en el área de ruido (según el orden de turno).",
      ],
      turn: [
        "Jugá TODAS las cartas de tu mano, en el orden que quieras.",
        "Las cartas te dan: Habilidad (para comprar cartas nuevas), Espadas (para pelear monstruos) y Botas (para moverte por los túneles).",
        "Si una carta dice Clank!, ponés cubos tuyos en el área de ruido.",
        "Reponé la fila de la mazmorra. Si aparece una carta con el símbolo del dragón, ataca: todos los cubos del área de ruido van a la bolsa y se sacan cubos al azar. Cada cubo de tu color es una herida.",
        "Descartá todo y robá 5 cartas nuevas.",
      ],
      end: "El primero que sale con un artefacto recibe 20 puntos y pone en marcha la cuenta regresiva: quedan pocos turnos y el dragón ataca cada vez más fuerte. Después se suman artefactos, fichas, oro y cartas.",
      tips: [
        "Solo podés llevar UN artefacto: elegí hasta dónde te animás a bajar.",
        "Si te quedás sin vida en las profundidades, no puntuás. Si ya estabas arriba con un artefacto, te rescatan y sí contás.",
        "Comprar botas temprano te ahorra muchos turnos.",
      ],
      variants: ["El tablero tiene dos lados: el segundo es más difícil."],
    },
    cheatSheet: {
      yourTurn: [
        "Jugá toda tu mano.",
        "Gastá Botas, Espadas y Habilidad como quieras.",
        "Reponé la fila; si sale dragón, ataca.",
        "Descartá y robá 5.",
      ],
      keyActions: [
        { name: "Habilidad", text: "Compra cartas de la fila o de la reserva. Van a tu descarte." },
        { name: "Espadas", text: "Derrotan monstruos de la fila o pagan túneles con enemigos." },
        { name: "Botas", text: "Una por túnel (algunos piden dos)." },
        { name: "Clank!", text: "Cubos tuyos al área de ruido. Más ruido, más chances de que el dragón te pegue." },
      ],
      scoring: [
        "Artefacto, fichas de secreto, monos, coronas, huevos de dragón.",
        "Oro: 1 punto por moneda.",
        "Puntos de las cartas de tu mazo.",
        "20 puntos por salir de la mazmorra.",
      ],
      commonMistakes: [
        "Sin artefacto no podés salir ni puntuar.",
        "Las cartas compradas van al descarte, no a la mano.",
      ],
    },
  },

  "stone-age": {
    howToPlay: {
      goal: "Tener más puntos al final, construyendo chozas y juntando cartas de civilización.",
      setup: [
        "Cada jugador arranca con 5 personas, 12 de comida y su tablero.",
        "Poné las pilas de chozas, la fila de 4 cartas de civilización y los recursos en sus lugares.",
      ],
      turn: [
        "FASE 1 — Colocar: por turnos, cada uno pone una o más personas en UN lugar del tablero, hasta que todos colocaron todo.",
        "FASE 2 — Resolver: cada jugador, en orden, retira a su gente lugar por lugar y hace la acción.",
        "Para juntar recursos tirás un dado por persona y dividís el total: comida ÷2, madera ÷3, ladrillo ÷4, piedra ÷5, oro ÷6. Las herramientas suman al resultado.",
        "FASE 3 — Alimentar: pagás 1 de comida por cada persona (tu nivel de agricultura te descuenta). Si no alcanza, pagás con recursos o perdés 10 puntos.",
      ],
      end: "Cuando se vacía una pila de chozas o no se puede reponer la fila de cartas. Se suman los puntos de las cartas de civilización y 1 punto por cada recurso que sobre.",
      tips: [
        "La choza de la familia (más gente), el campo (comida fija) y el herrero (herramientas) se disputan todas las rondas: priorizalos cuando salís primero.",
        "Las cartas de civilización son la mitad del puntaje final. No las ignores.",
        "Más gente = más acciones, pero también más bocas.",
      ],
      variants: ["Con 2 o 3 jugadores hay restricciones sobre cuántos pueden ocupar ciertos lugares."],
    },
    cheatSheet: {
      yourTurn: [
        "Colocá gente en un lugar (de a un lugar por turno).",
        "Cuando todos terminaron: retirá y resolvé cada lugar.",
        "Alimentá a tu tribu: 1 de comida por persona.",
      ],
      keyActions: [
        { name: "Divisores", text: "Comida 2 · Madera 3 · Ladrillo 4 · Piedra 5 · Oro 6." },
        { name: "Herramientas", text: "Suman al dado, una vez por ronda cada una." },
        { name: "Chozas", text: "Pagás los recursos que pide y cobrás los puntos ya." },
        { name: "Cartas", text: "Cuestan de 1 a 4 recursos según su posición en la fila." },
      ],
      scoring: [
        "Cartas verdes: cantidad de símbolos distintos al cuadrado.",
        "Cartas de multiplicador: × tus campos, herramientas, chozas o personas.",
        "1 punto por recurso sobrante.",
      ],
      commonMistakes: [
        "No alimentar cuesta −10 puntos, cada vez.",
        "En un mismo lugar no podés agregar más gente en un turno posterior.",
      ],
    },
  },

  "mille-fiori": {
    howToPlay: {
      goal: "Sumar la mayor cantidad de puntos colocando tus piezas de vidrio en las distintas zonas del tablero.",
      setup: [
        "Cada jugador toma sus fichas de diamante de un color y pone su barco en el puerto.",
        "Mezclá el mazo y dejá a un costado algunas cartas boca arriba: son las cartas extra que se ganan con los bonus.",
      ],
      turn: [
        "Cada uno recibe 5 cartas, elige una en secreto y pasa el resto.",
        "En orden, cada uno revela su carta y coloca una ficha en la casilla que muestra (o usa la carta para mover su barco).",
        "Cada zona puntúa distinto y se cobra en el momento.",
        "Si con tu jugada cumplís una condición de bonus, jugás al toque una de las cartas extra: así se arman las cadenas.",
        "Se repite hasta que cada uno jugó 4 cartas (3 si son 2 jugadores). La carta que sobra pasa a ser carta extra.",
      ],
      end: "Cuando alguien coloca su última ficha, o cuando no alcanzan las cartas para repartir otra ronda. Se suman los bonus de fin de partida.",
      tips: [
        "Mirá las cartas extra antes de elegir: una jugada que dispara otra vale doble.",
        "Lo que pasás le llega al de al lado: a veces conviene no regalarle la carta que necesita.",
      ],
      variants: ["La condición exacta de fin de partida cambia un poco según la fuente: confirmala con el reglamento."],
    },
    cheatSheet: {
      yourTurn: [
        "Elegí 1 carta de tu mano y pasá el resto.",
        "Revelá y colocá tu ficha (o mové el barco).",
        "Cobrá los puntos de esa zona.",
        "¿Bonus? Jugá una carta extra ya.",
      ],
      keyActions: [
        { name: "Talleres", text: "1 punto por cada ficha tuya conectada; doble en casillas de pigmento." },
        { name: "Residencias", text: "Los puntos de la casilla, y volvés a cobrar tus fichas anteriores de esa línea." },
        { name: "Gente del pueblo", text: "1, 3 o 6 puntos según la altura en la pirámide." },
        { name: "Comercio", text: "Todas las fichas de ese producto cobran según cuántas hay ya colocadas." },
        { name: "Puerto", text: "Movés tu barco y cobrás donde caés; después colocás en una fila de carga." },
      ],
      scoring: ["Cada zona tiene un bonus único de 20/15/10/5 para los primeros que cumplen su condición."],
      commonMistakes: ["Los puntos de comercio los cobran también los rivales que tengan fichas ahí."],
    },
  },

  fossilis: {
    howToPlay: {
      goal: "Ser el paleontólogo con más puntos: desenterrá huesos y completá esqueletos de dinosaurio.",
      setup: [
        "Armá el tablero 3D: los huesos van escondidos abajo, tapados por losetas de arena, arcilla y piedra.",
        "Cada jugador pone su paleontólogo en el borde y recibe sus fichas.",
        "Poné a la vista las cartas de dinosaurio, las de herramienta y el mercado.",
      ],
      turn: [
        "Tenés una cantidad fija de energía para gastar en acciones, en el orden que quieras.",
        "Moverte por el sitio de excavación.",
        "Excavar: empujás una loseta de terreno. La arena es barata; la arcilla y la piedra cuestan más. Lo que cae del tablero te lo quedás.",
        "Extraer: sacás con la pinza un hueso de un pozo destapado.",
        "Con los huesos correctos reclamás una carta de dinosaurio. También podés comprar herramientas y suministros.",
      ],
      end: "Cuando se cumple la condición de fin (según el reglamento). Se suman dinosaurios, sets y bonus.",
      tips: [
        "Empujar una loseta puede mover a otro paleontólogo o tapar un pozo: usalo.",
        "Mirá qué huesos piden los dinosaurios a la vista antes de excavar al azar.",
      ],
      variants: ["Costos exactos de energía, eventos y puntaje final: a confirmar con el reglamento."],
    },
    cheatSheet: {
      yourTurn: [
        "Gastá tu energía en mover, excavar y extraer.",
        "Reclamá un dinosaurio si tenés los huesos.",
        "Comprá herramientas o suministros.",
      ],
      keyActions: [
        { name: "Arena / arcilla / piedra", text: "De más barato a más caro de empujar." },
        { name: "Pinza", text: "Para sacar el hueso sin mover lo demás." },
        { name: "Herramientas", text: "Dan acciones especiales de un solo uso o permanentes." },
      ],
      scoring: ["Puntos por cada dinosaurio completado + bonus. Llevalo con el anotador."],
      commonMistakes: ["No se puede extraer de un pozo que tiene una loseta o un paleontólogo encima."],
    },
  },

  kingdomino: {
    howToPlay: {
      goal: "Armar el reino de 5×5 que más puntos sume, juntando terrenos iguales con coronas.",
      setup: [
        "Cada jugador recibe una loseta inicial con su castillo y un rey (2 reyes si juegan de a 2).",
        "Mezclá los dominós. Poné 4 en fila ordenados por su número de menor a mayor, boca arriba (3 si son 3 jugadores).",
        "Para la primera ronda, los reyes eligen dominó en orden al azar.",
      ],
      turn: [
        "Se prepara una fila nueva de dominós, ordenada de menor a mayor.",
        "El dueño del rey que está en el dominó de más arriba juega primero.",
        "Agarrá tu dominó y sumalo a tu reino: al menos uno de sus lados tiene que tocar un terreno del mismo tipo (el castillo es comodín).",
        "Poné tu rey en un dominó libre de la fila nueva: ese será tu próximo dominó y tu lugar en el orden de turno.",
      ],
      end: "Cuando se acaban los dominós. Cada zona de terreno conectado vale (cantidad de casillas) × (cantidad de coronas).",
      tips: [
        "Los dominós más altos son mejores pero te hacen elegir último la ronda siguiente.",
        "Una zona sin coronas vale cero, por grande que sea.",
        "Planificá el cuadrado de 5×5 desde el principio: lo que no entra, se descarta.",
      ],
      variants: [
        "Reino del medio: +10 si tu castillo queda en el centro.",
        "Armonía: +5 si no tuviste que descartar ningún dominó.",
        "De a 2: pueden jugar reinos de 7×7 usando todos los dominós.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Sumá tu dominó al reino (tocando un terreno igual o el castillo).",
        "Elegí tu próximo dominó poniendo el rey.",
        "El orden de la ronda que viene sale de la fila: arriba juega primero.",
      ],
      scoring: [
        "Por cada zona: casillas × coronas.",
        "Sumá todas las zonas.",
        "Bonus opcionales: Reino del medio +10, Armonía +5.",
      ],
      commonMistakes: [
        "El reino no puede pasarse de 5×5.",
        "Si el dominó no entra en ningún lado, se descarta (y perdés la Armonía).",
        "Dos zonas del mismo terreno separadas se cuentan por separado.",
      ],
    },
  },

  "the-island": {
    howToPlay: {
      goal: "Salvar a tus náufragos más valiosos llevándolos a las islas de las esquinas antes de que explote el volcán.",
      setup: [
        "Armá la isla central con las losetas de playa, bosque y montaña mezcladas.",
        "Por turnos, cada uno coloca sus 10 náufragos (de a uno por loseta). Tienen un valor del 1 al 6 abajo: miralo al colocar, porque después no se puede espiar.",
        "Por turnos, cada uno coloca 2 botes al lado de la isla. Las serpientes marinas van en sus casilleros.",
      ],
      turn: [
        "Si querés, jugá una loseta de tu mano (las que guardaste de turnos anteriores).",
        "Tenés 3 movimientos para repartir entre tus náufragos y los botes que controlás.",
        "Sacá una loseta de la isla: primero se van todas las de playa, después bosque, después montaña. Lo que estaba encima cae al agua. Mirá el reverso: algunas se resuelven ya (aparece un tiburón, una ballena, un bote, un remolino) y otras te las guardás.",
        "Tirá el dado de criaturas y mové una criatura de ese tipo.",
      ],
      end: "Cuando sale la loseta del volcán: todo lo que no llegó a tierra, se pierde. Cada uno da vuelta sus náufragos salvados y suma sus valores.",
      tips: [
        "No importa cuántos salvás, sino cuánto valen. Protegé al 6 y al 5.",
        "Un bote lo controla el que tiene más náufragos adentro: subite a botes ajenos.",
        "Los nadadores avanzan solo 1 casilla por turno. Nadar es desesperación.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Opcional: jugar una loseta guardada.",
        "3 movimientos (náufragos y botes).",
        "Hundir una loseta de tierra y resolverla.",
        "Dado de criaturas y mover una.",
      ],
      keyActions: [
        { name: "Tiburón", text: "Se come a los nadadores de su casilla." },
        { name: "Ballena", text: "Destruye botes; los ocupantes quedan nadando." },
        { name: "Serpiente marina", text: "Destruye el bote y se come a todos." },
        { name: "Delfín / bote", text: "Losetas que te ayudan a mover nadadores o botes." },
      ],
      scoring: ["Sumá los números de abajo de tus náufragos salvados."],
      commonMistakes: [
        "Después de colocarlos no se puede mirar el valor de los náufragos.",
        "Se hunde por orden: playa, bosque, montaña. Y la loseta tiene que tocar agua.",
      ],
    },
  },
};
