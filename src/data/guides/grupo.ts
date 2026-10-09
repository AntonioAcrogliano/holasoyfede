import type { Guide } from "../../types";

// Los que más se juegan en grupo.
export const grupo: Record<string, Guide> = {
  avalon: {
    howToPlay: {
      goal: "Los leales a Arturo ganan si salen bien 3 de las 5 misiones. Los esbirros de Mordred ganan si fracasan 3, si se rechazan 5 equipos seguidos, o si al final el Asesino descubre quién es Merlín.",
      setup: [
        "Repartí un rol secreto a cada uno. Buenos/malos: 5 jugadores 3/2 · 6: 4/2 · 7: 4/3 · 8: 5/3 · 9: 6/3 · 10: 6/4.",
        "Como mínimo jueguen con Merlín (bueno) y el Asesino (malo). El resto son leales y esbirros comunes.",
        "Todos cierran los ojos. Los malos los abren y se reconocen. Después los malos levantan el pulgar (con los ojos cerrados) y Merlín abre los ojos para ver quiénes son.",
        "Elegí al azar al primer líder y poné el tablero que corresponde a la cantidad de jugadores.",
      ],
      turn: [
        "El líder propone un equipo para la misión (el tamaño depende de la misión y de cuántos son; el anotador te lo dice).",
        "Se discute y todos votan a la vez si aprueban o rechazan ese equipo. Con mayoría de aprobados, sale; si hay empate o mayoría de rechazos, el líder pasa al de la izquierda.",
        "Si el equipo sale, cada integrante elige en secreto Éxito o Fracaso. Los buenos están obligados a jugar Éxito; los malos eligen.",
        "Se mezclan y se revelan: con un solo Fracaso la misión falla (en la 4ª misión con 7 o más jugadores hacen falta 2).",
        "El líder pasa al siguiente y arranca otra ronda.",
      ],
      end: "Termina cuando un bando junta 3 misiones. Si ganan los buenos, los malos todavía tienen una chance: el Asesino señala a un jugador y, si es Merlín, ganan los malos.",
      tips: [
        "Merlín: ayudá sin que se note. Si sos muy obvio, te matan al final.",
        "Mirá las votaciones, no solo las misiones: quién aprueba qué equipo dice muchísimo.",
        "Si sos malo, a veces conviene jugar Éxito en la primera misión para ganar confianza.",
      ],
      variants: [
        "Perceval (bueno): sabe quién es Merlín. Morgana (mala): se le aparece a Perceval como si fuera Merlín.",
        "Mordred (malo): Merlín no lo ve. Oberón (malo): no conoce a los otros malos ni ellos a él.",
        "Sumen roles de a poco; con Perceval y Morgana ya cambia mucho.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Si sos líder: proponé un equipo del tamaño que pide la misión.",
        "Todos votan a la vez: aprobar o rechazar.",
        "Si sale y estás en el equipo: jugá Éxito (bueno) o Éxito/Fracaso (malo), en secreto.",
        "Se revela el resultado y el líder pasa a la izquierda.",
      ],
      keyActions: [
        { name: "Merlín", text: "Bueno. Ve a los malos (menos a Mordred). Si el Asesino lo descubre, pierden los buenos." },
        { name: "Asesino", text: "Malo. Si los buenos ganan 3 misiones, elige a quién matar: si es Merlín, ganan los malos." },
        { name: "Perceval", text: "Bueno. Ve a Merlín (y a Morgana, sin saber cuál es cuál)." },
        { name: "5 rechazos", text: "Cinco equipos rechazados seguidos: ganan los malos." },
      ],
      scoring: [
        "3 misiones exitosas: ganan los buenos (salvo que maten a Merlín).",
        "3 misiones fracasadas: ganan los malos.",
        "4ª misión con 7+ jugadores: necesita 2 Fracasos para fallar.",
      ],
      commonMistakes: [
        "Un bueno NO puede jugar Fracaso, ni para despistar.",
        "El empate en la votación cuenta como rechazo.",
        "El contador de rechazos vuelve a cero cuando un equipo es aprobado.",
      ],
    },
  },

  "la-resistencia": {
    howToPlay: {
      goal: "La Resistencia gana si salen bien 3 de las 5 misiones. Los espías ganan si sabotean 3, o si se rechazan 5 equipos seguidos.",
      setup: [
        "Repartí en secreto las cartas de rol. Resistencia/espías: 5 jugadores 3/2 · 6: 4/2 · 7: 4/3 · 8: 5/3 · 9: 6/3 · 10: 6/4.",
        "Todos cierran los ojos; solo los espías los abren para reconocerse y los vuelven a cerrar.",
        "Elegí un líder al azar.",
      ],
      turn: [
        "El líder arma un equipo del tamaño que pide la misión.",
        "Todos votan a la vez. Mayoría de aprobados: el equipo sale. Empate o mayoría en contra: el líder pasa al siguiente.",
        "Los del equipo juegan en secreto una carta de misión: la Resistencia siempre Éxito; los espías eligen Éxito o Sabotaje.",
        "Se mezclan y se revelan. Con un solo Sabotaje, la misión fracasa (en la 4ª con 7 o más, hacen falta 2).",
        "El líder pasa al siguiente.",
      ],
      end: "Gana el primer bando que junta 3 misiones. Acá no hay Merlín ni Asesino: cuando se llega a 3, se termina.",
      tips: [
        "Es Avalon sin roles especiales: ideal para enseñar la mecánica.",
        "Los espías no tienen que sabotear siempre: quedar limpio una vez vale oro.",
        "Hagan hablar a todos; el que se queda callado suele esconder algo.",
      ],
      variants: [
        "Algunas ediciones traen cartas de Trama que el líder reparte y dan pequeños poderes. Para la primera partida, dejalas afuera.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Líder: proponé equipo.",
        "Todos votan aprobar o rechazar, a la vez.",
        "Si estás en el equipo, jugá tu carta de misión en secreto.",
        "Se revela y pasa el líder.",
      ],
      keyActions: [
        { name: "Resistencia", text: "Solo puede jugar Éxito." },
        { name: "Espía", text: "Puede jugar Éxito o Sabotaje. Conoce a los otros espías." },
        { name: "5 rechazos", text: "Cinco equipos rechazados seguidos: ganan los espías." },
      ],
      scoring: ["3 éxitos: gana la Resistencia.", "3 sabotajes: ganan los espías."],
      commonMistakes: [
        "El empate en la votación es rechazo.",
        "La 4ª misión con 7 o más necesita 2 Sabotajes.",
      ],
    },
  },

  "just-one": {
    howToPlay: {
      goal: "Es cooperativo: entre todos tienen que adivinar la mayor cantidad posible de las 13 palabras.",
      setup: [
        "Armen un mazo de 13 cartas boca abajo.",
        "Cada uno agarra un atril y un marcador.",
      ],
      turn: [
        "El que adivina pone la carta de arriba en su atril SIN mirarla, de cara a los demás, y elige un número del 1 al 5: esa es la palabra misteriosa.",
        "Los demás escriben en secreto una pista de UNA sola palabra.",
        "El que adivina cierra los ojos; el resto compara las pistas y tapa las que estén repetidas (o sean de la misma familia).",
        "El que adivina abre los ojos, mira las pistas que quedaron y arriesga UNA respuesta… o pasa.",
        "Acierto: la carta queda ganada. Fallo: se pierde esa carta y también la de arriba del mazo. Pasar: se pierde solo esa carta.",
      ],
      end: "Cuando se acaba el mazo, cuentan las cartas ganadas y miran la tabla de resultados.",
      tips: [
        "No des la pista más obvia: seguro alguien más la escribe y se anulan.",
        "Si quedaron pocas pistas y no la ves, pasar es mejor que perder dos cartas.",
      ],
      variants: [
        "Con 3 jugadores: cada uno de los que dan pistas escribe 2 pistas distintas en 2 atriles.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Adivinador: carta al atril sin mirar y elegí un número (1–5).",
        "Resto: una pista de una sola palabra, en secreto.",
        "Comparar y tapar las repetidas (el adivinador con los ojos cerrados).",
        "Adivinar una vez, o pasar.",
      ],
      keyActions: [
        { name: "Pista válida", text: "Una palabra, un número, una sigla o una onomatopeya." },
        { name: "Pista inválida", text: "La misma palabra en otro idioma, de la misma familia (príncipe/princesa), inventada, o que suene igual." },
      ],
      scoring: [
        "Acierto: +1.",
        "Fallo: se pierde la carta actual y la siguiente del mazo.",
        "Pasar: se pierde solo la actual.",
        "13 perfecto · 12 increíble · 11 genial · 9–10 muy bien · 7–8 en el promedio · 4–6 buen comienzo · 0–3 a seguir intentando.",
      ],
      commonMistakes: [
        "Plurales y variantes cuentan como la misma pista: se anulan.",
        "Si fallan con la última carta, pierden una de las ya ganadas.",
      ],
    },
  },

  "magic-maze": {
    howToPlay: {
      goal: "Entre todos, y sin hablar, tienen que llevar a los 4 héroes a robar su equipo y escaparse del shopping antes de que se acabe el reloj de arena.",
      setup: [
        "Pongan la loseta inicial con los 4 peones en el centro y el resto de las losetas del escenario en una pila boca abajo.",
        "Repartan las losetas de acción que corresponden a la cantidad de jugadores: cada una dice qué podés hacer (mover al norte, al sur, al este, al oeste, escalera mecánica, explorar, vórtice).",
        "Den vuelta el reloj de arena de 3 minutos. Desde ahí, no se habla más.",
      ],
      turn: [
        "No hay turnos: todos juegan a la vez, cuando quieren.",
        "Cualquiera puede mover a cualquier héroe, pero solo con las acciones de su loseta.",
        "Explorar: si un héroe está parado en una salida de su color, el que tiene la lupa agrega una loseta nueva.",
        "Si un héroe pisa una casilla de reloj de arena, se da vuelta el reloj (cada casilla se usa una sola vez) y pueden hablar hasta que alguien vuelva a mover.",
        "Cuando los 4 héroes están a la vez sobre su objeto, roban: se dan vuelta las losetas de acción, los vórtices dejan de funcionar y todos corren a las salidas.",
      ],
      end: "Ganan si los 4 héroes salen antes de que se acabe la arena. Si el reloj se vacía, pierden.",
      tips: [
        "El peón rojo de «¡Hacé algo!» se pone frente al jugador que tiene que reaccionar. Es la única forma de avisar.",
        "Mirá todo el tablero, no solo el héroe que estabas moviendo.",
        "Arranquen por los escenarios de aprendizaje del reglamento: van sumando reglas de a una.",
      ],
      variants: [
        "Solo o de a 2: se usan las losetas de acción de otra forma (se van rotando). Mirá el reglamento.",
        "Con 4 o más: después de cada vuelta de reloj, las losetas de acción se pasan al jugador de la izquierda (a partir del escenario que lo indica).",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Sin turnos y sin hablar: mové cualquier héroe usando solo TU acción.",
        "¿Alguien no reacciona? Ponele el peón rojo adelante.",
        "Reloj de arena pisado = dar vuelta el reloj y charla libre hasta el próximo movimiento.",
        "Los 4 sobre su objeto a la vez = robo. Después, todos a las salidas.",
      ],
      keyActions: [
        { name: "Explorar", text: "Con el héroe en una salida de su color, sumás una loseta." },
        { name: "Vórtice", text: "Teletransporta un héroe a un vórtice de su color. Deja de andar después del robo." },
        { name: "Escalera", text: "Sube o baja la escalera mecánica de una loseta." },
        { name: "Reloj", text: "Dura 3 minutos. Darlo vuelta no lo reinicia: queda la arena que ya había caído." },
      ],
      commonMistakes: [
        "Señalar, hacer gestos o mirar fijo para indicar una jugada no vale: solo el peón rojo.",
        "Dar vuelta el reloj cuando casi no cayó arena te deja con menos tiempo, no con más.",
      ],
    },
  },

  bleff: {
    howToPlay: {
      goal: "Engañar al resto con definiciones inventadas de palabras rarísimas, y no dejarte engañar. Gana el primero que llega a la casilla final del tablero (GRAN BLEFF).",
      setup: [
        "Cada uno elige una ficha y la pone en la salida. Repartan papel y lápiz.",
        "Elijan quién arranca leyendo (el coordinador de la ronda).",
      ],
      turn: [
        "El coordinador saca una tarjeta, elige una palabra y la lee en voz alta (y la deletrea si hace falta).",
        "Todos los demás escriben una definición inventada que suene creíble. El coordinador copia la definición verdadera en un papel igual.",
        "El coordinador mezcla todos los papeles y los lee en voz alta, sin que se note cuál es cuál.",
        "Cada jugador vota la definición que cree verdadera.",
        "Se reparten los puntos, se avanzan las fichas y el coordinador pasa al siguiente.",
      ],
      end: "Termina cuando alguien llega a la casilla final.",
      tips: [
        "Escribí con tono de diccionario: seco, corto y con algún dato raro.",
        "El coordinador tiene que leer todas con la misma cara. Practicá la de póker.",
        "Si no se entiende una letra, el coordinador puede leerla antes para sí mismo y preguntar en privado.",
      ],
      variants: [
        "El detalle exacto de cuántos casilleros da cada cosa está a confirmar con el reglamento de la caja. La versión más común: sumás por cada voto que recibe tu definición falsa, sumás por elegir la verdadera, y el coordinador suma si nadie la adivina.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "El coordinador lee la palabra.",
        "Escribí una definición trucha y entregala.",
        "Escuchá todas y votá la que creas verdadera.",
        "Sumá puntos y avanzá tu ficha.",
      ],
      scoring: [
        "Puntos por cada jugador que vote tu definición falsa.",
        "Puntos por votar la verdadera.",
        "El coordinador suma si nadie acierta.",
        "Valores exactos: a confirmar con el reglamento de la caja.",
      ],
      commonMistakes: [
        "Si conocés la palabra de verdad, avisale al coordinador y se cambia.",
        "No vale votar tu propia definición.",
      ],
    },
  },

  "toma-6": {
    howToPlay: {
      goal: "Terminar con la menor cantidad de cabezas de toro. La partida se corta cuando alguien llega a 66.",
      setup: [
        "Mezclá las 104 cartas y repartí 10 a cada uno.",
        "Poné 4 cartas boca arriba en columna: son el inicio de las 4 filas.",
      ],
      turn: [
        "Todos eligen una carta de su mano y la ponen boca abajo. Se revelan a la vez.",
        "Se colocan de menor a mayor. Cada carta va a la fila cuya última carta sea menor y esté más cerca de su número.",
        "Si tu carta es la sexta de una fila, te llevás las 5 que había y tu carta arranca la fila de nuevo.",
        "Si tu carta es más baja que el final de todas las filas, elegís una fila cualquiera, te la llevás y tu carta la reemplaza.",
        "Las cartas que te llevás van a tu pila de puntos (no a la mano).",
      ],
      end: "Cuando se jugaron las 10 cartas, cada uno cuenta sus cabezas de toro y se anota. Si alguien llegó a 66 o más, se termina y gana el que menos tiene; si no, se reparte de nuevo.",
      tips: [
        "Las filas con 4 o 5 cartas son una trampa: jugar cerca es arriesgado.",
        "A veces conviene tirar una carta bajísima a propósito para llevarte una fila barata.",
      ],
      variants: [
        "Variante táctica (pocos jugadores): se juega solo con las cartas del 1 al (10 × jugadores + 4), así todos saben qué cartas hay en juego.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Elegí una carta en secreto.",
        "Revelan todos a la vez.",
        "Se ubican de menor a mayor, cada una en la fila con el número más cercano por debajo.",
        "Sexta carta de una fila: te la llevás.",
      ],
      scoring: [
        "Carta normal: 1 cabeza.",
        "Terminadas en 5: 2 cabezas.",
        "Terminadas en 0: 3 cabezas.",
        "Múltiplos de 11: 5 cabezas.",
        "El 55: 7 cabezas.",
      ],
      commonMistakes: [
        "La carta no elige fila: va obligada a la del número menor más cercano.",
        "Solo elegís fila cuando tu carta es menor que todas las puntas.",
      ],
    },
  },

  "flip-7": {
    howToPlay: {
      goal: "Ser el que más puntos tiene cuando alguien llega a 200.",
      setup: [
        "Mezclá el mazo. Elegí un repartidor (va rotando cada ronda).",
        "Tené papel o el anotador a mano.",
      ],
      turn: [
        "El repartidor da una carta boca arriba a cada uno, de a uno. Si sale una carta de acción, se resuelve en el momento.",
        "Después, en orden, cada jugador activo decide: pedir otra carta o plantarse.",
        "Si te sale un número que ya tenías, perdiste la ronda: cero puntos.",
        "Si te plantás, asegurás lo que tenés y no recibís más cartas.",
        "Si juntás 7 números distintos, hacés Flip 7: la ronda se corta ahí para todos y sumás 15 de bonus.",
      ],
      end: "La ronda termina cuando todos se plantaron o perdieron, o cuando alguien hace Flip 7. Al final de una ronda en la que alguien llegó a 200, gana el que más tiene.",
      tips: [
        "En el mazo hay tantas cartas de cada número como el número mismo (doce 12, once 11… un solo 0). Los altos son los más fáciles de repetir.",
        "Con 4 o 5 cartas ya estás en zona de riesgo: pensá si vale la pena.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "¿Pedís o te plantás?",
        "Número repetido = afuera de la ronda con 0.",
        "Carta de acción = se resuelve ya.",
        "7 números distintos = Flip 7, +15 y se corta la ronda.",
      ],
      keyActions: [
        { name: "Congelar", text: "El jugador elegido se planta ya, con lo que tiene." },
        { name: "Tres cartas", text: "El jugador elegido recibe 3 cartas seguidas (corta si pierde o hace Flip 7)." },
        { name: "Segunda oportunidad", text: "Te salva de un repetido: descartás las dos y seguís." },
        { name: "+2 a +10 / ×2", text: "Modificadores: no cuentan como número ni te hacen perder." },
      ],
      scoring: [
        "Sumá tus cartas de número.",
        "Si tenés ×2, duplicá esa suma.",
        "Después sumá los modificadores (+2, +4…).",
        "Flip 7: +15.",
      ],
      commonMistakes: [
        "El ×2 duplica solo los números, no los +.",
        "Solo podés tener una Segunda oportunidad: si te toca otra, se la das a otro jugador activo.",
      ],
    },
  },

  "las-vegas-baby": {
    howToPlay: {
      goal: "Tener la mayor cantidad de fichas después de 7 preguntas.",
      setup: [
        "Desplegá el paño de apuestas.",
        "Cada jugador (o equipo) agarra una pizarrita, un marcador y sus 2 fichas de apuesta de su color.",
        "Dejá las fichas de póker a mano como banca.",
      ],
      turn: [
        "Se lee una pregunta cuya respuesta es un número.",
        "Todos escriben su respuesta en secreto y la ponen boca abajo.",
        "Se revelan y se ordenan en el paño de menor a mayor. Las del medio pagan poco; las de las puntas pagan más.",
        "Todos apuestan sus 2 fichas a la respuesta (o respuestas) que crean ganadora. Podés apostar a la de otro.",
        "Se lee la respuesta correcta. Gana la más cercana SIN pasarse. La banca paga las apuestas ganadoras según la columna, y el que escribió la respuesta ganadora cobra un bonus.",
      ],
      end: "Después de la 7ª pregunta, gana el que tiene más fichas de póker.",
      tips: [
        "No hace falta saber: alcanza con saber quién de la mesa sabe.",
        "Desde la segunda pregunta podés sumar fichas ganadas debajo de tus fichas de apuesta para apostar más fuerte (esas sí se pierden si errás).",
      ],
      variants: [
        "Con más de 7: jueguen en equipos compartiendo pizarra.",
        "Los montos exactos de pago y de bonus están a confirmar con el reglamento de la caja.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Escuchá la pregunta y escribí un número.",
        "Revelar y ordenar de menor a mayor.",
        "Apostá tus 2 fichas (juntas o separadas).",
        "Gana la más cercana sin pasarse. Cobrá.",
      ],
      keyActions: [
        { name: "«Todas se pasaron»", text: "Hay un casillero para apostar a que todas las respuestas son mayores que la correcta." },
        { name: "Respuestas iguales", text: "Se apilan en el mismo casillero." },
      ],
      scoring: [
        "Tus 2 fichas de color nunca se pierden.",
        "Las fichas de póker que agregás a la apuesta se pierden si errás.",
        "Bonus para quien escribió la respuesta ganadora.",
      ],
      commonMistakes: ["La más cercana pero por arriba NO gana: tiene que ser igual o menor."],
    },
  },

  "un-dia-en-las-carreras": {
    howToPlay: {
      goal: "Terminar las 4 carreras con más plata que nadie.",
      setup: [
        "Poné la pista con los 9 caballos en la largada y el tablero de apuestas al alcance de todos.",
        "Cada jugador agarra sus fichas de apuesta (tienen distintos valores).",
        "Elijan quién hace de «la casa»: tira los dados y relata la carrera. También puede hacerlo la app oficial.",
        "Revelá las apuestas especiales de esta carrera.",
      ],
      turn: [
        "La casa tira 2 dados sin parar: avanza el caballo que tiene ese número (2/3 y 11/12 comparten caballo).",
        "Si un mismo número sale dos veces seguidas, ese caballo avanza casilleros extra (el 7 no tiene bonus).",
        "Mientras tanto, y en tiempo real, todos van poniendo sus fichas en el tablero: a ganador, a que llega entre los primeros, por color, o en las apuestas especiales.",
        "En cada casillero entra una sola ficha: el que llega primero se lo queda.",
        "Cuando tres caballos cruzan la línea roja, se cierran las apuestas. La carrera sigue hasta que uno cruza la meta.",
      ],
      end: "Al terminar cada carrera se cobran las apuestas acertadas (valor de la ficha × multiplicador del casillero) y se pagan las multas de las que fallaron y tenían penalidad. Después de la 4ª carrera gana el que más plata tiene.",
      tips: [
        "Los caballos del medio (6, 7, 8) salen más seguido, por eso pagan menos. Los de las puntas pagan mucho más.",
        "No pongas todo al principio: guardate fichas para cuando la carrera se aclare.",
        "Entre carreras se reparten cartas VIP que te dan ventajas; leelas antes de que arranque la siguiente.",
      ],
      variants: [
        "Sin nadie que quiera ser la casa: usen la app, que tira los dados y relata.",
        "El momento exacto en que se reparten las cartas VIP está a confirmar con el reglamento.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "No hay turnos: apostá cuando quieras mientras corren.",
        "Una ficha por casillero.",
        "Tres caballos pasan la línea roja = no va más.",
        "Fin de carrera: cobrar y pagar multas.",
      ],
      keyActions: [
        { name: "Ganador / placé / show", text: "El caballo llega 1º / entre los 2 primeros / entre los 3 primeros." },
        { name: "Color", text: "Gana algún caballo de ese color." },
        { name: "Especiales", text: "Cartas que cambian en cada carrera (un caballo le gana a otro, finales raros, etc.)." },
      ],
      scoring: [
        "Acierto: valor de la ficha × multiplicador.",
        "Fallo en casillero con multa: pagás la multa.",
        "No podés quedar en negativo: el mínimo es 0 (a confirmar).",
      ],
      commonMistakes: [
        "Una vez puesta, la ficha no se mueve.",
        "Al terminar la carrera, cada uno recupera todas sus fichas de apuesta.",
      ],
    },
  },

  carcassonne: {
    howToPlay: {
      goal: "Sumar más puntos que el resto armando caminos, ciudades, monasterios y granjas con tus seguidores.",
      setup: [
        "Poné la loseta inicial en el centro y el resto boca abajo en pilas.",
        "Cada uno toma 8 seguidores de un color: uno va al marcador de puntos y quedan 7 para jugar.",
      ],
      turn: [
        "Robá una loseta y colocala tocando otra, de modo que todos los bordes coincidan (camino con camino, ciudad con ciudad, campo con campo).",
        "Si querés, poné UN seguidor en esa loseta: en un camino, una ciudad, un monasterio o un campo… siempre que esa construcción no tenga ya un seguidor (tuyo o ajeno).",
        "Si se completó algo (camino cerrado, ciudad cerrada, monasterio rodeado), se puntúa y los seguidores vuelven a sus dueños.",
      ],
      end: "Cuando se coloca la última loseta. Ahí se puntúa todo lo incompleto y las granjas.",
      tips: [
        "No te quedes sin seguidores: los granjeros no vuelven nunca hasta el final.",
        "Podés meterte en la ciudad de otro uniendo dos partes separadas: si empatan en seguidores, cobran los dos.",
        "Para la primera partida pueden jugar sin granjeros.",
      ],
      variants: [
        "El río y el abad (si vienen en tu edición) son mini-expansiones opcionales.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Robá una loseta y ubicala haciendo coincidir los bordes.",
        "Opcional: un seguidor en esa loseta, en algo que no esté ocupado.",
        "Puntuá lo que se haya completado y recuperá esos seguidores.",
      ],
      scoring: [
        "Camino: 1 punto por loseta (completo o no).",
        "Ciudad completa: 2 por loseta + 2 por escudo. Incompleta al final: 1 y 1.",
        "Monasterio: 1 por él + 1 por cada loseta que lo rodea (9 si está completo).",
        "Granja (al final): 3 puntos por cada ciudad completa que toca el campo.",
        "En empate de seguidores, todos los empatados cobran todo.",
      ],
      commonMistakes: [
        "El seguidor va solo en la loseta que acabás de poner.",
        "Los granjeros se acuestan y no se recuperan.",
        "El tablero de puntos da la vuelta a los 50: avisá cuando pasás.",
      ],
    },
  },

  catan: {
    howToPlay: {
      goal: "Ser el primero en llegar a 10 puntos de victoria en tu turno.",
      setup: [
        "Armá la isla con los hexágonos y poné una ficha de número en cada uno (el desierto no lleva; ahí arranca el ladrón).",
        "En orden, cada uno pone un pueblo con un camino. Después, en orden inverso, un segundo pueblo con su camino.",
        "Cobrá una carta de recurso por cada hexágono que toca tu SEGUNDO pueblo.",
      ],
      turn: [
        "Tirá los dos dados: todos los que tengan pueblo o ciudad tocando un hexágono con ese número cobran (pueblo 1 carta, ciudad 2).",
        "Si sale 7: nadie cobra; los que tengan más de 7 cartas descartan la mitad; movés al ladrón y le robás una carta al azar a alguien que esté en ese hexágono.",
        "Comerciá: con otros jugadores lo que acuerden, con la banca 4 iguales por 1, o mejor si tenés un puerto (3:1 o 2:1).",
        "Construí todo lo que puedas pagar.",
      ],
      end: "En cuanto alguien tiene 10 puntos durante su propio turno, gana.",
      tips: [
        "Los números 6 y 8 son los que más salen; el 2 y el 12, los que menos.",
        "Al principio valen más la madera y el ladrillo (caminos y pueblos); después, el trigo y el mineral (ciudades y cartas).",
        "Los pueblos tienen que estar separados por al menos 2 tramos de camino.",
      ],
      variants: [
        "Con 5 o 6 jugadores usá la Ampliación 5–6: suma hexágonos y una fase extra de construcción entre turnos.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Tirá los dados y se cobran recursos (o se resuelve el 7).",
        "Comerciá con jugadores, banca o puertos.",
        "Construí y/o comprá cartas de desarrollo.",
        "Podés jugar UNA carta de desarrollo por turno (no la que compraste recién).",
      ],
      keyActions: [
        { name: "Camino", text: "Madera + ladrillo." },
        { name: "Pueblo", text: "Madera + ladrillo + trigo + oveja. 1 punto." },
        { name: "Ciudad", text: "2 trigo + 3 mineral. Reemplaza un pueblo. 2 puntos." },
        { name: "Carta de desarrollo", text: "Oveja + trigo + mineral." },
        { name: "Ladrón", text: "El hexágono donde está no produce." },
      ],
      scoring: [
        "Pueblo 1 · Ciudad 2.",
        "Camino más largo (5 o más tramos): 2.",
        "Gran ejército (3 o más caballeros): 2.",
        "Cartas de punto de victoria: 1 cada una (se guardan ocultas).",
      ],
      commonMistakes: [
        "El 7 hace descartar a los que tienen MÁS de 7 cartas (8 o más).",
        "No podés construir un pueblo pegado a otro: regla de distancia.",
        "Solo ganás en tu turno.",
      ],
    },
  },

  "catan-ampliacion-5-6": {
    howToPlay: {
      goal: "Igual que en Catan: ser el primero en llegar a 10 puntos en tu turno.",
      setup: [
        "Armá el marco grande y sumá los hexágonos, números y puertos extra de la ampliación.",
        "Agregá las cartas de recurso y desarrollo adicionales, y las piezas de los dos colores nuevos.",
        "La colocación inicial es igual: un pueblo y un camino por ronda, ida y vuelta.",
      ],
      turn: [
        "El turno es el de Catan: tirar, comerciar, construir.",
        "Lo nuevo: cuando el jugador de turno termina, hay una fase de construcción especial. En orden, todos los demás pueden construir o comprar cartas de desarrollo (sin comerciar).",
        "Después pasa el dado al siguiente.",
      ],
      end: "Cuando alguien llega a 10 puntos en su turno.",
      tips: [
        "La fase especial existe para que no acumules cartas y te las coma el 7: usala.",
        "Con 6 jugadores la isla se llena rápido: asegurá espacio para crecer desde el principio.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Tirar dados y cobrar.",
        "Comerciar.",
        "Construir.",
        "Fase especial: los demás, en orden, pueden construir (sin comerciar).",
      ],
      scoring: ["Igual que Catan base: gana el primero en llegar a 10."],
      commonMistakes: [
        "En la fase especial no se comercia ni se juegan cartas de desarrollo: solo construir o comprar.",
      ],
    },
  },

  truco: {
    howToPlay: {
      goal: "Llegar antes que el rival a 30 puntos (15 malas + 15 buenas), o a 15 si juegan corto.",
      setup: [
        "Se juega con 40 naipes españoles (sin 8, 9 ni comodines), de a 2, 4 o 6 en equipos enfrentados.",
        "Se reparten 3 cartas a cada uno. El que está a la derecha del que reparte es mano.",
      ],
      turn: [
        "Cada mano tiene hasta 3 bazas. En cada baza todos tiran una carta y gana la más alta. El que gana, sale en la siguiente.",
        "Gana la mano el equipo que se lleva 2 de las 3 bazas. Si la primera es parda (empate), define la segunda.",
        "Antes de jugar la primera carta se puede cantar ENVIDO: se compara quién tiene más tantos con dos cartas del mismo palo.",
        "En cualquier momento se puede cantar TRUCO para subir lo que vale la mano. El rival puede querer, no querer (y pierde lo que valía antes) o subir la apuesta.",
      ],
      end: "Al terminar la mano se anotan los puntos del envido y del truco, y reparte el siguiente. Gana el equipo que llega primero al total.",
      tips: [
        "Orden de las cartas, de mayor a menor: 1 de espada, 1 de basto, 7 de espada, 7 de oro, los 3, los 2, los 1 de copa y oro, los 12, 11, 10, los 7 de copa y basto, los 6, 5 y 4.",
        "Tantos del envido: dos cartas del mismo palo suman sus valores + 20 (las figuras valen 0). Sin dos del mismo palo, vale tu carta más alta.",
        "Mentir es parte del juego. Las señas con tu compañero, también.",
      ],
      variants: [
        "Con flor: tres cartas del mismo palo valen 3 puntos y anulan el envido. Pónganse de acuerdo antes de empezar.",
        "De a 6: se suele jugar «pica-pica» en algunas manos (cada uno contra el de enfrente).",
        "Falta envido: lo más común es que, si los dos están en las malas, el que gana se lleva el partido; si alguno está en las buenas, se cobra lo que le falta al que va ganando. Hay variantes regionales: acuérdenla antes.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "¿Primera baza? Podés cantar envido antes de tirar.",
        "Podés cantar truco (o subir) en cualquier momento de tu turno.",
        "Tirá una carta. Gana la baza la más alta.",
        "Mejor de 3 bazas se lleva la mano.",
      ],
      keyActions: [
        { name: "Envido", text: "Querido vale 2. No querido, 1." },
        { name: "Real envido", text: "Querido vale 3. Se puede cantar arriba del envido (2 + 3 = 5)." },
        { name: "Falta envido", text: "Vale lo que falta para terminar (ver variantes)." },
        { name: "Truco", text: "Querido vale 2. No querido, 1." },
        { name: "Retruco", text: "Querido vale 3. No querido, 2." },
        { name: "Vale cuatro", text: "Querido vale 4. No querido, 3." },
      ],
      scoring: [
        "Mano sin cantar nada: 1 punto.",
        "Envido empatado: gana el que es mano.",
        "Primera parda: define la segunda. Tres pardas: gana el mano.",
      ],
      commonMistakes: [
        "«El envido está primero»: si te cantan truco en la primera baza, todavía podés cantar envido.",
        "El retruco solo lo puede cantar el equipo que aceptó el truco.",
        "Decir los tantos en voz alta es obligatorio si te los piden al final de la mano.",
      ],
    },
  },
};
