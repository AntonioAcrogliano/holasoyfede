import type { Guide } from "../../types";

export const resto: Record<string, Guide> = {
  "happy-little-dinosaurs": {
    howToPlay: {
      goal: "Ser el primero en llegar a 50 puntos en la ruta de escape, o ser el último dinosaurio que queda vivo.",
      setup: [
        "Cada jugador elige un dinosaurio con su tablero y pone su ficha en el inicio de la ruta de escape.",
        "Repartí 5 cartas a cada uno. Armá el mazo de desastres aparte.",
      ],
      turn: [
        "Se revela una carta de desastre.",
        "Todos eligen una carta de puntos de su mano y la juegan boca abajo. Se revelan a la vez.",
        "Se aplican los efectos de las cartas y los modificadores del dinosaurio de cada uno.",
        "El que sacó más puntos avanza esa cantidad en la ruta de escape.",
        "El que sacó menos se queda con el desastre en su zona.",
        "Todos roban hasta tener 5 cartas.",
      ],
      end: "Quedás eliminado si juntás 3 desastres del mismo tipo, o uno de cada uno de los 3 tipos. Gana el primero que llega a 50 o el último en pie.",
      tips: [
        "Las cartas instantáneas se juegan después de revelar: sirven para salvarte o para hundir a otro.",
        "No quemes tus cartas altas cuando el desastre no te complica.",
      ],
      variants: ["Cómo se resuelven los empates por el puntaje más bajo: a confirmar con el reglamento."],
    },
    cheatSheet: {
      yourTurn: [
        "Se revela el desastre.",
        "Todos juegan una carta de puntos boca abajo.",
        "Revelar, aplicar efectos e instantáneas.",
        "El más alto avanza; el más bajo se come el desastre.",
        "Robar hasta 5.",
      ],
      keyActions: [
        { name: "Tipos de desastre", text: "Natural, depredador y emocional." },
        { name: "Meteorito", text: "Cuenta como comodín de cualquier tipo." },
      ],
      scoring: ["Usá el anotador para llevar la ruta de escape hasta 50."],
      commonMistakes: ["Solo avanza el que sacó el puntaje más alto de la ronda, no todos."],
    },
  },

  "casting-shadows": {
    howToPlay: {
      goal: "Ser el último mago en pie.",
      setup: [
        "Armá el mapa de hexágonos con la Runa Antigua en el centro y el hexágono de hogar de cada jugador.",
        "Cada uno elige un personaje con su tablero: vida en 18 y energía de sombra en 0.",
        "Poné tu peón en tu hogar y dejá a mano los dados de recursos y los mazos de hechizos.",
      ],
      turn: [
        "FASE 1 — Recursos: tirá los 5 dados de recursos. Eso es lo que tenés para gastar este turno. Si arrancás parado en un hexágono que da un recurso, lo sumás.",
        "FASE 2 — Acciones: tenés 4 puntos de acción. Cada acción cuesta 1 y se pueden repetir: viajar a un hexágono vecino, recolectar, aprender o lanzar hechizos, atacar.",
        "FASE 3 — Sombra: los fragmentos de sombra que te sobraron los absorbés y subís tu marcador de sombra.",
      ],
      end: "Cuando la vida de un jugador llega a 0, queda eliminado. Gana el último que queda.",
      tips: [
        "Cuando juntás suficiente energía de sombra te transformás en tu Forma de Sombra, que es más fuerte: llegá antes que el resto.",
        "Los puntos de acción que no usás se pierden.",
        "Mirá el alcance de tus hechizos antes de acercarte.",
      ],
      variants: [
        "El listado exacto de acciones y lo que cambia la Forma de Sombra está en el reglamento: a confirmar.",
        "La expansión The Ice Storm suma personajes y hechizos.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Tirá los 5 dados de recursos.",
        "Gastá 4 puntos de acción.",
        "Absorbé los fragmentos de sombra que sobraron.",
      ],
      keyActions: [
        { name: "Viajar", text: "1 acción por hexágono." },
        { name: "Hechizos", text: "Se pagan con los recursos que te salieron en los dados." },
        { name: "Forma de Sombra", text: "Te transformás al llegar al tope de energía de sombra." },
      ],
      scoring: ["Usá el anotador como contador de vida: todos arrancan en 18."],
      commonMistakes: ["Los recursos de los dados no se guardan para el turno siguiente (salvo la sombra absorbida)."],
    },
  },

  "casting-shadows-ice-storm": {
    howToPlay: {
      goal: "Igual que Casting Shadows: ser el último mago en pie.",
      setup: [
        "Prepará una partida normal de Casting Shadows.",
        "Sumá los personajes, hechizos y hexágonos de hielo de la expansión.",
      ],
      turn: [
        "El turno no cambia: recursos, 4 acciones, absorber sombra.",
        "Los personajes y hechizos nuevos traen efectos de hielo.",
      ],
      end: "Gana el último que queda con vida.",
      variants: ["Los efectos exactos de las cartas de hielo: a confirmar con el reglamento de la expansión."],
    },
    cheatSheet: {
      yourTurn: ["Dados de recursos.", "4 puntos de acción.", "Absorber sombra."],
      commonMistakes: ["No es independiente: necesitás Casting Shadows."],
    },
  },

  quoridor: {
    howToPlay: {
      goal: "Ser el primero en llevar tu peón a cualquier casilla de la fila opuesta.",
      setup: [
        "Cada jugador pone su peón en el centro de su fila.",
        "De a 2: 10 muros cada uno. De a 4: 5 muros cada uno.",
      ],
      turn: [
        "Elegí UNA cosa: mover tu peón o poner un muro.",
        "El peón se mueve una casilla en horizontal o vertical, nunca en diagonal.",
        "Un muro ocupa el largo de dos casillas y va en las ranuras.",
        "Si tenés un peón rival justo adelante, lo saltás. Si atrás de él hay un muro o el borde, podés moverte en diagonal a su costado.",
      ],
      end: "Gana el primero que pisa la fila de enfrente.",
      tips: [
        "No gastes los muros al principio: el que se queda sin muros solo puede caminar.",
        "Un muro bien puesto le suma al rival varios pasos, no uno.",
      ],
      variants: ["De a 4 no se puede saltar más de un peón a la vez."],
    },
    cheatSheet: {
      yourTurn: ["Mover el peón 1 casilla…", "…o colocar un muro."],
      keyActions: [
        { name: "Salto", text: "Si tenés un peón pegado adelante, pasás por arriba." },
        { name: "Muro", text: "Bloquea dos casillas de ancho. No se mueve más." },
      ],
      commonMistakes: [
        "Está prohibido encerrar del todo a un peón: siempre tiene que quedar un camino a la meta.",
        "Los muros no se cruzan ni se superponen.",
      ],
    },
  },

  "bienvenido-al-dungeon": {
    howToPlay: {
      goal: "Ganar 2 veces el calabozo, o ser el último que queda sin eliminar.",
      setup: [
        "Elegí uno de los héroes y poné sus 6 losetas de equipo a la vista.",
        "Mezclá las cartas de monstruo. Cada jugador recibe una carta de ayuda (lado blanco).",
      ],
      turn: [
        "En tu turno: robás una carta de monstruo o pasás.",
        "Si robás, la mirás en secreto y elegís: meterla boca abajo en el calabozo, o quedártela y sacarle una pieza de equipo al héroe.",
        "Si pasás, quedás afuera de esta ronda.",
        "Cuando todos pasaron menos uno, ese jugador entra al calabozo con el equipo que quedó.",
        "Se dan vuelta los monstruos de a uno: el equipo anula a algunos; los demás restan su fuerza a la vida del héroe.",
      ],
      end: "Si el héroe sobrevive a todo el calabozo, ese jugador gana una carta de éxito. Si muere, da vuelta su carta de ayuda al lado rojo; a la segunda derrota queda eliminado. Gana el primero con 2 éxitos o el último en pie.",
      tips: [
        "Acordate de qué monstruos metiste vos: es información que los demás no tienen.",
        "Sacarle al héroe el equipo que frena al monstruo que acabás de ver es una jugada cruel y correcta.",
        "Pasar temprano es válido si el calabozo ya pinta imposible.",
      ],
      variants: ["Cada héroe (guerrero, bárbaro, mago, pícaro) tiene equipo distinto: vayan rotando."],
    },
    cheatSheet: {
      yourTurn: [
        "Robá un monstruo o pasá.",
        "Si robaste: al calabozo, o te lo quedás y sacás un equipo.",
        "El último sin pasar, entra.",
      ],
      keyActions: [
        { name: "Vida", text: "La base del héroe más las piezas de equipo que suman vida." },
        { name: "Equipo", text: "Cada pieza anula ciertos monstruos o da un efecto de un solo uso." },
      ],
      scoring: ["2 éxitos = ganás. 2 derrotas = eliminado. El anotador sirve para llevar los éxitos."],
      commonMistakes: ["El monstruo que te quedás no entra al calabozo: lo dejás boca abajo frente a vos."],
    },
  },

  "the-mind": {
    howToPlay: {
      goal: "Es cooperativo: superar todos los niveles jugando las cartas en orden creciente, sin hablar ni hacerse señas.",
      setup: [
        "Vidas y estrellas ninja iniciales: 2 jugadores, 2 vidas y 12 niveles · 3 jugadores, 3 vidas y 10 niveles · 4 jugadores, 4 vidas y 8 niveles. Siempre 1 estrella.",
        "Mezclá las cartas del 1 al 100.",
        "En el nivel 1 cada uno recibe 1 carta; en el nivel 2, 2 cartas, y así.",
      ],
      turn: [
        "Antes de empezar cada nivel, todos apoyan una mano en la mesa para «sincronizarse».",
        "No hay turnos: cuando sentís que tu carta más baja es la que sigue, la jugás al medio.",
        "Las cartas tienen que salir de menor a mayor entre todos.",
        "Si alguien juega una carta y otro tenía una más baja, se frena: pierden una vida y se descartan todas las cartas más bajas que la jugada.",
        "Cuando todos se quedaron sin cartas, pasaron de nivel.",
      ],
      end: "Ganan si superan el último nivel. Pierden si se quedan sin vidas.",
      tips: [
        "El truco es el tiempo: cuanto más baja tu carta, antes la jugás. Aprendan a contar parecido.",
        "Cualquiera puede decir «stop» para volver a concentrarse apoyando la mano.",
        "Usen la estrella cuando hay tensión con cartas muy pegadas.",
      ],
      variants: ["Modo extremo: dos pilas, una ascendente y otra descendente."],
    },
    cheatSheet: {
      yourTurn: [
        "Mano en la mesa: concentración.",
        "Jugá tu carta más baja cuando creas que es la que sigue.",
        "¿Alguien tenía una menor? Pierden una vida.",
        "Sin cartas en las manos: nivel superado.",
      ],
      keyActions: [
        { name: "Estrella ninja", text: "Alguien levanta la mano; si todos aceptan, cada uno descarta boca arriba su carta más baja." },
        { name: "Premios", text: "Nivel 2, 5 y 8: una estrella. Nivel 3, 6 y 9: una vida." },
      ],
      commonMistakes: [
        "No se puede hablar de números, ni señalar, ni amagar.",
        "Máximo 5 vidas y 3 estrellas.",
      ],
    },
  },

  "beacon-patrol": {
    howToPlay: {
      goal: "Es cooperativo: explorar la mayor parte posible del mar. Se compara el puntaje final con una tabla.",
      setup: [
        "Poné la loseta inicial al medio y los barcos encima.",
        "Mezclá las demás losetas en una pila. Cada jugador roba 3.",
        "Cada jugador tiene 3 fichas de movimiento.",
      ],
      turn: [
        "Colocá una loseta de tu mano pegada a la loseta donde está tu barco. Los bordes tienen que coincidir: agua con agua y tierra con tierra. No se puede rotar.",
        "Movés tu barco a la loseta nueva (gratis).",
        "Podés gastar fichas de movimiento para navegar a otra loseta vecina por agua y seguir colocando desde ahí.",
        "Podés colocar las 3 losetas, o intercambiar una con otro jugador en vez de colocar.",
        "Al final del turno robás hasta tener 3 y recuperás tus fichas de movimiento.",
      ],
      end: "Cuando se acaban las losetas y nadie puede colocar. Se puntúan las losetas «exploradas»: las que tienen vecinas en sus 4 lados.",
      tips: [
        "Una loseta suelta en el borde no vale nada: cierren huecos.",
        "Hablen de lo que tienen en la mano; está permitido y hace falta.",
        "Los faros conviene ponerlos donde sea fácil rodearlos.",
      ],
      variants: ["En solitario se juega con 2 barcos. Hay mini expansiones en la caja para variar."],
    },
    cheatSheet: {
      yourTurn: [
        "Colocá losetas junto a tu barco (bordes iguales, sin rotar).",
        "Tu barco pasa a la loseta nueva.",
        "Fichas de movimiento para reubicarte.",
        "Robá hasta 3.",
      ],
      scoring: [
        "Loseta explorada común: 1 punto.",
        "Con boya: 2 puntos.",
        "Con faro: 3 puntos.",
      ],
      commonMistakes: [
        "Las losetas no se rotan: la flecha siempre apunta al norte.",
        "Solo cuentan las losetas rodeadas por los 4 lados.",
      ],
    },
  },

  bandido: {
    howToPlay: {
      goal: "Es cooperativo: cerrar todas las salidas del túnel para que el bandido no se escape de la cárcel.",
      setup: [
        "Poné la carta inicial del bandido al medio. Tiene dos lados: uno con 5 salidas (más fácil) y otro con 6.",
        "Mezclá el mazo y repartí 3 cartas a cada uno.",
      ],
      turn: [
        "Colocá una carta de tu mano conectada a los túneles que ya hay en la mesa.",
        "Todos los bordes que toquen tienen que coincidir: túnel con túnel, pared con pared.",
        "Robá una carta.",
        "Si no podés colocar ninguna, mandá tus 3 cartas abajo del mazo y robá 3 nuevas.",
      ],
      end: "Ganan si todos los túneles terminan cerrados (con linternas o en bucles). Pierden si se acaba el mazo y queda algún túnel abierto.",
      tips: [
        "Cada bifurcación que abren es una salida más para cerrar después.",
        "Guardá las cartas de linterna (callejón sin salida) para cuando hagan falta.",
        "Pueden hablar de estrategia, pero sin decir exactamente qué cartas tienen.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Colocá una carta que encaje con todo lo que toca.",
        "Robá una.",
        "¿No podés? Cambiá tu mano entera.",
      ],
      commonMistakes: [
        "Una carta que tapa un túnel con una pared no vale: tiene que encajar en todos los bordes.",
        "Ocupa mucha mesa: empiecen por el centro.",
      ],
    },
  },

  "gloomhaven-fauces-del-leon": {
    howToPlay: {
      goal: "Es una campaña cooperativa: escenario por escenario, sus mercenarios tienen que cumplir el objetivo del mapa (casi siempre, eliminar a todos los enemigos) antes de quedar agotados.",
      setup: [
        "Cada jugador elige un personaje y arma su mano de cartas.",
        "Abran el libro de escenarios en la página que toca: el mapa es el libro mismo.",
        "Los primeros 5 escenarios son un tutorial que va sumando reglas de a poco. Empiecen por ahí, sin leer el reglamento entero.",
      ],
      turn: [
        "Cada uno elige en secreto 2 cartas de su mano. Una de las dos marca tu iniciativa: número más bajo, jugás antes.",
        "Se revela todo, junto con la carta de acción de cada tipo de monstruo.",
        "En tu turno hacés la acción de ARRIBA de una carta y la de ABAJO de la otra, en el orden que quieras.",
        "Los monstruos actúan solos según su carta: se mueven y atacan al enemigo más cercano.",
        "Al atacar, das vuelta una carta de tu mazo de modificadores: puede sumar, restar, duplicar o anular el daño.",
      ],
      end: "Ganan cuando cumplen el objetivo del escenario. Pierden si todos los personajes quedan agotados (sin vida o sin cartas para jugar).",
      tips: [
        "Tus cartas son tu reloj: cada descanso perdés una para siempre. No las quemes al principio.",
        "Las cartas con el símbolo de «perdida» son muy fuertes pero no vuelven en ese escenario.",
        "Pueden hablar de qué quieren hacer, pero sin decir números de iniciativa ni valores exactos.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Elegí 2 cartas (o un descanso largo).",
        "Revelar: la iniciativa más baja va primero.",
        "Acción de arriba de una + acción de abajo de la otra.",
        "Fin de ronda: descanso corto si querés.",
      ],
      keyActions: [
        { name: "Acción básica", text: "Cualquier carta sirve como Ataque 2 (arriba) o Movimiento 2 (abajo)." },
        { name: "Descanso corto", text: "Al final de la ronda: recuperás el descarte y perdés una carta al azar." },
        { name: "Descanso largo", text: "Ocupa tu turno (iniciativa 99): recuperás el descarte, elegís qué carta perder y curás 2." },
        { name: "Agotado", text: "Sin vida, o sin poder jugar 2 cartas ni descansar." },
      ],
      commonMistakes: [
        "Hay que usar arriba de una carta y abajo de la OTRA, nunca las dos de la misma.",
        "Los monstruos se enfocan en el enemigo al que llegan con menos movimiento; si hay empate, el de iniciativa más baja.",
      ],
    },
  },

  "hive-pocket": {
    howToPlay: {
      goal: "Rodear por completo a la abeja reina rival (los 6 lados ocupados, con piezas de cualquier color).",
      setup: [
        "No hay tablero: las piezas forman la colmena sobre la mesa.",
        "Cada jugador tiene 1 reina, 2 escarabajos, 2 saltamontes, 2 arañas, 3 hormigas, 1 mosquito y 1 mariquita.",
        "Empieza el blanco.",
      ],
      turn: [
        "Elegí UNA cosa: colocar una pieza nueva o mover una que ya está en juego.",
        "Colocar: la pieza nueva tiene que tocar solo piezas de tu color (salvo en la primera jugada de cada uno).",
        "Tu reina tiene que estar en la mesa a más tardar en tu 4º turno. Hasta que no la ponés, no podés mover nada.",
        "Mover: cada bicho se mueve a su manera, y la colmena nunca puede quedar partida en dos, ni siquiera a mitad del movimiento.",
      ],
      end: "Pierde el jugador cuya reina queda rodeada. Si las dos quedan rodeadas a la vez, es empate.",
      tips: [
        "Las hormigas son tu mejor pieza: usalas para inmovilizar piezas rivales.",
        "Una pieza que sostiene la colmena no se puede mover: «clavá» las del rival.",
        "No saques la reina en la primera jugada, pero tampoco esperes al cuarto turno siempre.",
      ],
      variants: ["Para aprender, pueden jugar sin mosquito ni mariquita."],
    },
    cheatSheet: {
      yourTurn: ["Colocar una pieza (tocando solo las tuyas)…", "…o mover una pieza (sin romper la colmena)."],
      keyActions: [
        { name: "Reina", text: "1 casilla." },
        { name: "Escarabajo", text: "1 casilla, y puede subirse arriba de otras piezas (la de abajo queda bloqueada)." },
        { name: "Saltamontes", text: "Salta en línea recta por arriba de las piezas hasta el primer hueco." },
        { name: "Araña", text: "Exactamente 3 casillas bordeando la colmena." },
        { name: "Hormiga", text: "Todas las casillas que quiera, bordeando la colmena." },
        { name: "Mosquito", text: "Copia el movimiento de cualquier pieza que esté tocando." },
        { name: "Mariquita", text: "3 pasos: dos por arriba de la colmena y uno para bajar." },
      ],
      commonMistakes: [
        "Libertad de movimiento: una pieza no puede deslizarse por un hueco donde no entra físicamente.",
        "Si no podés colocar ni mover, perdés el turno.",
      ],
    },
  },

  "stratego-clasico": {
    howToPlay: {
      goal: "Capturar la bandera del rival, o dejarlo sin piezas que se puedan mover.",
      setup: [
        "Cada jugador coloca sus 40 piezas en sus cuatro filas, de espaldas al rival: el otro no ve qué es cada una.",
        "Los dos lagos del medio no se pueden pisar.",
        "Empieza el rojo.",
      ],
      turn: [
        "Mové UNA pieza una casilla hacia adelante, atrás o al costado. Nunca en diagonal.",
        "Si te movés a una casilla ocupada por el rival, atacás: los dos dicen el rango de su pieza.",
        "El rango más bajo sale del tablero. Si son iguales, salen las dos.",
        "Las bombas y la bandera no se mueven nunca.",
      ],
      end: "Gana el que captura la bandera rival, o el que deja al otro sin movimientos posibles.",
      tips: [
        "Rodeá tu bandera con bombas… o no, justamente porque es lo que todos hacen.",
        "Usá los exploradores para descubrir qué son las piezas grandes del rival.",
        "Acordate de qué piezas ya se mostraron.",
      ],
      variants: [
        "La numeración cambia según la edición: en algunas el Mariscal es el 10 y en otras el 1. Mirá la tabla de tu caja.",
      ],
    },
    cheatSheet: {
      yourTurn: ["Mové una pieza una casilla.", "Si entrás a una casilla ocupada, hay combate.", "Sale la de menor rango."],
      keyActions: [
        { name: "Explorador", text: "Se mueve todas las casillas libres que quiera en línea recta." },
        { name: "Minero", text: "El único que desactiva bombas." },
        { name: "Espía", text: "Si ATACA al Mariscal, lo elimina. Pierde contra todo lo demás." },
        { name: "Bomba", text: "Elimina a cualquiera que la ataque, menos al Minero." },
      ],
      commonMistakes: [
        "No se puede ir y volver entre las mismas dos casillas más de 3 veces seguidas.",
        "El Espía solo gana si es él quien ataca.",
      ],
    },
  },

  "little-secret": {
    howToPlay: {
      goal: "La mayoría comparte una palabra secreta. Unos pocos tienen otra parecida (los infiltrados) y uno no tiene ninguna (el periodista). Los del grupo mayoritario tienen que descubrirlos; los demás, pasar desapercibidos.",
      setup: [
        "Repartí una carta a cada jugador y armá las palabras según indica el reglamento: casi todos reciben la misma, los infiltrados una distinta.",
        "Nadie sabe si su palabra es la de la mayoría o la del infiltrado. El único que sabe su rol es el periodista, porque no tiene palabra.",
        "El periodista se usa a partir de 5 jugadores.",
      ],
      turn: [
        "Por turnos, cada uno dice UNA palabra relacionada con la suya. Ni tan obvia que la regale, ni tan rara que te deje pegado.",
        "Después de la vuelta, todos debaten: ¿quién parece tener otra palabra? ¿Quién está improvisando?",
        "Se vota a la vez y el más votado queda eliminado y revela su rol.",
        "Si quedó eliminado el periodista, tiene una chance de adivinar la palabra de la mayoría.",
        "Se sigue con otra vuelta de pistas entre los que quedan.",
      ],
      end: "La ronda termina cuando solo quedan los del grupo mayoritario, o cuando quedan solo 2 jugadores. Suman puntos los que sobrevivieron. Se juegan varias rondas.",
      tips: [
        "Si escuchás pistas que no te cierran, capaz el infiltrado sos vos: adaptate.",
        "Periodista: hablá último si podés y copiá el tono de los demás.",
      ],
      variants: [
        "El juego trae cartas de poder que alteran la partida.",
        "Puntaje exacto y reparto de roles por cantidad de jugadores: a confirmar con el reglamento.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Decí una palabra relacionada con tu secreto.",
        "Debate abierto.",
        "Votación: sale el más votado.",
        "Se repite con los que quedan.",
      ],
      keyActions: [
        { name: "Mayoría", text: "Comparten la palabra. Ganan si quedan solo ellos." },
        { name: "Infiltrado", text: "Tiene una palabra parecida y no sabe que es infiltrado." },
        { name: "Periodista", text: "Sin palabra. Si lo descubren, puede salvarse adivinándola." },
      ],
      commonMistakes: ["No vale repetir una pista que ya se dijo ni decir la palabra secreta."],
    },
  },
};
