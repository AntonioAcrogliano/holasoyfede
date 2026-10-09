import type { Guide } from "../../types";

export const party: Record<string, Guide> = {
  cartografos: {
    howToPlay: {
      goal: "Dibujar el mapa que más reputación sume a lo largo de las 4 estaciones, cumpliendo los edictos de la reina.",
      setup: [
        "Cada uno recibe una hoja de mapa y un lápiz.",
        "Poné las 4 cartas A, B, C y D en fila y debajo de cada una un edicto al azar (uno de cada tipo).",
        "Armá el mazo de exploración y mezclale 1 carta de emboscada. Poné las 4 cartas de estación en orden, con Primavera arriba.",
      ],
      turn: [
        "Se revela una carta de exploración: muestra una o dos formas y uno o dos tipos de terreno (bosque, aldea, granja, agua).",
        "Todos, a la vez, eligen una opción y la dibujan en su mapa, donde quieran. Se puede girar y espejar; no puede pisar nada dibujado ni las montañas.",
        "Si sale una carta de ruinas, la forma siguiente tiene que tapar una casilla de ruinas.",
        "Si sale una emboscada, pasás tu hoja al vecino (según la flecha) y él te dibuja los monstruos donde más te moleste.",
        "Cada carta suma tiempo. Cuando el tiempo acumulado llega al número de la estación, la estación termina y se puntúa.",
      ],
      end: "Después de puntuar el Invierno, se suman las cuatro estaciones y gana el total más alto.",
      tips: [
        "Mirá qué edictos se puntúan DOS veces cerca tuyo y arrancá por ahí: A y B se puntúan primero, pero A vuelve en Invierno.",
        "Rodear una montaña por sus cuatro lados te da una moneda, y las monedas suman en todas las estaciones que faltan.",
        "Si la forma no entra en ningún lado, dibujás un cuadradito de 1×1 del terreno que quieras.",
      ],
      variants: [
        "Modo solitario: viene explicado en el reglamento, con las emboscadas colocadas por regla.",
        "Mini expansión de Habilidades: pagás monedas para hacer jugadas especiales.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Se revela una carta de exploración.",
        "Elegí forma y terreno, y dibujala donde quieras.",
        "¿Forma con moneda o montaña rodeada? Pintá una moneda.",
        "Si el tiempo llegó al límite, se puntúa la estación.",
      ],
      keyActions: [
        { name: "Ruinas", text: "La próxima forma tiene que cubrir una casilla de ruinas. Si no podés, va un 1×1." },
        { name: "Emboscada", text: "Tu vecino dibuja monstruos en tu mapa. Después la carta se descarta." },
        { name: "Estaciones", text: "Primavera 8 de tiempo · Verano 8 · Otoño 7 · Invierno 6." },
      ],
      scoring: [
        "Primavera: edictos A + B. Verano: B + C. Otoño: C + D. Invierno: D + A.",
        "Sumá 1 por cada moneda pintada (en todas las estaciones).",
        "Restá 1 por cada casilla vacía pegada a un monstruo.",
      ],
      commonMistakes: [
        "Las monedas se cuentan en CADA estación, no solo al final.",
        "Los monstruos restan todas las estaciones hasta que los rodees.",
        "Al empezar cada estación se agrega una emboscada nueva al mazo.",
      ],
    },
  },

  "cartografos-heroes": {
    howToPlay: {
      goal: "Igual que en Cartógrafos: sumar la mayor reputación en 4 estaciones. Acá los monstruos son más bravos y tenés héroes para frenarlos.",
      setup: [
        "Hoja de mapa y lápiz para cada uno (los mapas de Héroes tienen otra geografía).",
        "4 edictos al azar bajo las cartas A, B, C y D.",
        "Mazo de exploración con 1 emboscada y 1 héroe mezclados. Cartas de estación en orden.",
      ],
      turn: [
        "Se revela una carta y todos dibujan a la vez, igual que en el juego base.",
        "Carta de héroe: dibujás al héroe en una casilla y marcás su patrón de ataque. Todo monstruo que esté (o caiga después) en esas casillas queda destruido y deja de restar.",
        "Carta de emboscada: tu vecino te dibuja el monstruo. Además, cada monstruo tiene una habilidad propia que se activa al final de la estación (se expande, arruina casillas, etc.).",
        "Cuando el tiempo llega al límite de la estación, se puntúa.",
      ],
      end: "Al terminar el Invierno se suman las 4 estaciones.",
      tips: [
        "Guardá espacio para los héroes cerca de los bordes, que es donde suelen caer los monstruos.",
        "Un héroe bien puesto protege una zona toda la partida.",
        "Se puede jugar solo o mezclar sus cartas con el Cartógrafos original.",
      ],
      variants: [
        "Las habilidades exactas de cada monstruo están en su carta: léanlas en voz alta cuando aparecen.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Se revela una carta.",
        "Exploración: dibujá forma y terreno.",
        "Héroe: dibujalo y marcá su zona de ataque.",
        "Emboscada: tu vecino te dibuja el monstruo.",
      ],
      keyActions: [
        { name: "Héroe", text: "Destruye monstruos en su patrón, ahora y más adelante." },
        { name: "Monstruo destruido", text: "Se tacha y ya no resta puntos." },
        { name: "Estaciones", text: "Primavera 8 · Verano 8 · Otoño 7 · Invierno 6." },
      ],
      scoring: [
        "Por estación: dos edictos + monedas − casillas vacías pegadas a monstruos vivos.",
        "Primavera A+B · Verano B+C · Otoño C+D · Invierno D+A.",
      ],
      commonMistakes: [
        "El héroe no ataca la casilla donde está parado, sino las de su patrón.",
        "Las habilidades de los monstruos se resuelven antes de restar puntos (a confirmar con el reglamento).",
      ],
    },
  },

  pictionary: {
    howToPlay: {
      goal: "Ser el primer equipo en llegar al final del tablero haciendo que tus compañeros adivinen lo que dibujás.",
      setup: [
        "Armen equipos (2 a 4). Cada equipo tiene una ficha, lápiz y papel.",
        "Tablero al medio, cartas y reloj de arena de 1 minuto a mano.",
      ],
      turn: [
        "Un dibujante por equipo, que va rotando. Saca una carta y mira la palabra de la categoría del casillero donde está su ficha.",
        "Se da vuelta el reloj: tiene 1 minuto para dibujar mientras su equipo grita respuestas.",
        "Si adivinan a tiempo, tiran el dado, avanzan y siguen jugando con otro dibujante.",
        "Si no adivinan, el turno pasa al equipo de la izquierda.",
        "Casilleros «Todos juegan»: dibuja uno de cada equipo a la vez, la misma palabra. El equipo que adivina primero se queda con el turno.",
      ],
      end: "Gana el equipo que llega al último casillero y adivina una palabra ahí.",
      tips: [
        "Dibujá rápido y feo: importa la idea, no el arte.",
        "Si no sale, cambiá de enfoque en vez de repasar el mismo dibujo.",
      ],
      variants: [
        "Sin tablero: jueguen a una cantidad fija de rondas y sumen 1 punto por acierto con el anotador.",
        "Con mucha gente, armen solo 2 equipos grandes.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Sacá carta y mirá la palabra de tu categoría.",
        "1 minuto para dibujar.",
        "Adivinaron: dado, avanzan y siguen.",
        "No adivinaron: pasa el turno.",
      ],
      keyActions: [
        { name: "Categorías", text: "Persona/lugar/animal · Objeto · Acción · Difícil · Todos juegan." },
        { name: "Todos juegan", text: "Dibujan todos los equipos a la vez; el primero en adivinar gana el turno." },
      ],
      commonMistakes: [
        "No vale escribir letras ni números, ni hablar, ni hacer gestos.",
        "Sí vale dibujar algo que «suena como» la palabra.",
      ],
    },
  },

  "exploding-kittens-party-pack": {
    howToPlay: {
      goal: "Ser el último en pie: no explotar.",
      setup: [
        "Sacá del mazo los gatitos explosivos y las cartas de Desactivar.",
        "Repartí 7 cartas a cada uno y sumale 1 Desactivar: arrancan con 8.",
        "Meté en el mazo tantos gatitos explosivos como jugadores menos uno, más los Desactivar que sobren, y mezclá.",
      ],
      turn: [
        "Jugá todas las cartas que quieras (o ninguna).",
        "Para terminar tu turno, robá una carta del mazo.",
        "Si robás un gatito explosivo, mostralo: si tenés Desactivar, lo usás y volvés a meter el gatito en el mazo donde quieras, en secreto. Si no tenés, quedás afuera.",
      ],
      end: "Cuando queda un solo jugador sin explotar.",
      tips: [
        "Guardá los Desactivar: son la carta más valiosa. Robárselos a otro es una gran jugada.",
        "Después de desactivar, acordate dónde pusiste el gatito (y miralo a los ojos al que sigue).",
      ],
      variants: [
        "El Party Pack ajusta el mazo según cuántos son (con pocos se usa solo una parte de las cartas, marcadas con una huella). Detalle a confirmar con el reglamento.",
        "La caja hace ruido al abrirla. No es una regla, pero suma.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Jugá cartas, las que quieras.",
        "Robá una para terminar.",
        "¿Gatito explosivo? Desactivalo o chau.",
      ],
      keyActions: [
        { name: "Saltar", text: "Terminás tu turno sin robar." },
        { name: "Atacar", text: "Terminás sin robar y el siguiente juega 2 turnos." },
        { name: "Ver el futuro", text: "Mirás las 3 cartas de arriba del mazo." },
        { name: "Barajar", text: "Mezclás el mazo." },
        { name: "Favor", text: "Otro jugador te da una carta a su elección." },
        { name: "No", text: "Cancela cualquier carta menos el gatito y el Desactivar. Se juega en cualquier momento." },
        { name: "Gatos iguales", text: "Un par: robás una carta al azar a otro. Un trío: le pedís una carta específica." },
      ],
      commonMistakes: [
        "Robar es lo último del turno: después no se juega nada más.",
        "Un «No» puede cancelar otro «No».",
      ],
    },
  },

  muse: {
    howToPlay: {
      goal: "Que tu equipo sea el primero en juntar 5 obras adivinadas.",
      setup: [
        "Armen 2 equipos (o más, si son muchos).",
        "Mezclen por separado las cartas de obras de arte y las cartas de inspiración.",
      ],
      turn: [
        "El equipo activo elige a su Musa.",
        "El equipo RIVAL roba 6 obras y 2 cartas de inspiración. Elige una obra y una inspiración, y se las da a la Musa.",
        "La Musa mira la obra en secreto y da una pista siguiendo la consigna de la inspiración (por ejemplo: «hacé un sonido», «nombrá una película», «hacé una pose»).",
        "La obra se mezcla con las otras 5 y se ponen las 6 boca arriba.",
        "El equipo de la Musa discute y elige una. Si acierta, se queda con la obra. Si no, se la queda el rival.",
      ],
      end: "Gana el primer equipo que junta 5 obras.",
      tips: [
        "Cuando elijan para el rival, busquen 6 obras parecidas entre sí y la inspiración más incómoda.",
        "La Musa no puede agregar nada más que la pista: ni gestos ni caras.",
      ],
      variants: ["De a 2 o 3: hay un modo cooperativo en el reglamento."],
    },
    cheatSheet: {
      yourTurn: [
        "El rival roba 6 obras y 2 inspiraciones, y elige una de cada.",
        "La Musa da la pista según la inspiración.",
        "Se mezclan y se muestran las 6 obras.",
        "El equipo elige. Acierto: obra para ustedes. Error: para el rival.",
      ],
      scoring: ["Cada obra vale 1. Se juega a 5."],
      commonMistakes: [
        "La pista tiene que respetar la consigna de la inspiración, no vale describir la obra directamente.",
      ],
    },
  },

  yogi: {
    howToPlay: {
      goal: "Ser el último que logra mantener todas sus posturas.",
      setup: ["Mezclá el mazo y ponelo al medio. Hagan espacio en la mesa."],
      turn: [
        "Robá una carta, leela en voz alta y hacé lo que dice.",
        "Hay dos tipos: unas te piden sostener la carta contra tu cuerpo de alguna forma; otras te piden mantener una postura con la carta apoyada frente a vos.",
        "Lo que te tocó lo tenés que seguir cumpliendo hasta el final, mientras sumás cartas nuevas.",
        "Si se te cae una carta o dejás de cumplir alguna consigna, quedás afuera.",
      ],
      end: "Gana el último que queda en juego.",
      tips: [
        "Pensá cómo vas a robar la próxima carta antes de acomodarte.",
        "Jueguen parados si pueden.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Robá una carta.",
        "Cumplí la consigna sin soltar las anteriores.",
        "¿Fallaste alguna? Afuera.",
      ],
      commonMistakes: [
        "Las consignas se acumulan: ninguna se «vence».",
        "No vale que otro te alcance la carta.",
      ],
    },
  },

  "eso-no-es-un-sombrero": {
    howToPlay: {
      goal: "Terminar con menos cartas de penalización que el resto. Se juega hasta que alguien junta 3.",
      setup: [
        "Cada jugador recibe una carta boca arriba: es su regalo. Todos la miran bien.",
        "A la cuenta de tres, todos dan vuelta su carta boca abajo.",
        "El mazo queda al medio.",
      ],
      turn: [
        "El jugador activo roba una carta del mazo, la muestra a todos y la da vuelta boca abajo frente a él.",
        "Ahora tiene dos regalos. Agarra el que tenía DE ANTES y se lo pasa al vecino que indica la flecha del dorso, diciendo «te regalo un…» y lo que cree que es.",
        "El que recibe puede aceptar (y entonces le pasa su propio regalo viejo al siguiente, de la misma manera) o rechazar diciendo «eso no es un…».",
        "Si rechaza, se da vuelta la carta. Si tenía razón el que rechazó, la carta se la queda de penalización el que la ofreció. Si se equivocó, se la queda él.",
        "El que se llevó la penalización roba una carta nueva y arranca otra cadena.",
      ],
      end: "Cuando alguien junta 3 cartas de penalización. Gana el que tiene menos.",
      tips: [
        "Lo difícil no es tu carta: es acordarte de la que te pasaron hace tres vueltas.",
        "Podés decir cualquier cosa con total seguridad. A veces pasa.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Robá, mostrá y poné boca abajo.",
        "Pasá tu regalo VIEJO diciendo qué es.",
        "El que recibe: acepta y sigue la cadena, o rechaza.",
        "Rechazo: se revela y alguien se lleva la penalización.",
      ],
      commonMistakes: [
        "Siempre se pasa el regalo que ya tenías, no el nuevo.",
        "La dirección la marca la flecha del dorso de la carta que pasás.",
        "No se puede espiar tus propias cartas.",
      ],
    },
  },

  "taco-gato-cabra-queso-pizza": {
    howToPlay: {
      goal: "Quedarte sin cartas… y después ganar un golpe más.",
      setup: ["Repartí todo el mazo boca abajo entre los jugadores. Nadie mira sus cartas."],
      turn: [
        "Por turnos, cada uno da vuelta su carta de arriba hacia el centro (hacia afuera, para no espiar) y dice la palabra que toca: taco, gato, cabra, queso, pizza… y vuelve a empezar.",
        "Si la carta coincide con la palabra que se dijo, todos golpean la pila. El último en golpear se lleva todas las cartas.",
        "Si alguien golpea cuando no correspondía, o amaga, se lleva la pila.",
        "El que se llevó la pila arranca de nuevo desde «taco».",
      ],
      end: "Cuando te quedás sin cartas seguís participando de los golpes: si sos el primero en golpear bien en la próxima coincidencia, ganaste.",
      tips: [
        "Sáquense anillos y relojes. En serio.",
        "Mantené el ritmo: si te trabás al decir la palabra, también te llevás la pila.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Da vuelta tu carta hacia el centro.",
        "Decí la palabra que sigue en la secuencia.",
        "¿Coincide? Todos golpean.",
        "El último (o el que se equivocó) se lleva la pila.",
      ],
      keyActions: [
        { name: "Gorila", text: "Golpeate el pecho y después la pila." },
        { name: "Marmota", text: "Golpeá la mesa con las dos manos y después la pila." },
        { name: "Narval", text: "Juntá las manos sobre la cabeza como un cuerno y después la pila." },
      ],
      commonMistakes: [
        "La carta se da vuelta hacia afuera, no hacia vos.",
        "Las cartas especiales siempre hacen golpear, se diga la palabra que se diga.",
      ],
    },
  },

  "fantasma-blitz": {
    howToPlay: {
      goal: "Juntar más cartas que nadie agarrando primero el objeto correcto.",
      setup: [
        "Poné los 5 objetos en círculo al medio: fantasma blanco, sillón rojo, botella verde, libro azul y ratón gris.",
        "Mazo boca abajo al lado.",
      ],
      turn: [
        "Alguien da vuelta la carta de arriba. Todos miran a la vez.",
        "Si en la carta hay un objeto con su color verdadero, hay que agarrar ESE.",
        "Si los dos objetos están con colores cambiados, hay que agarrar el que no aparece: ni su forma ni su color están en la carta.",
        "El que agarra el correcto se queda con la carta. El que agarra uno equivocado le da una de sus cartas ganadas.",
      ],
      end: "Cuando se acaba el mazo. Gana el que juntó más cartas.",
      tips: [
        "Primero buscá si hay algo del color correcto: es lo más rápido de detectar.",
        "Solo podés agarrar un objeto por carta: pensá medio segundo antes de manotear.",
      ],
      variants: [
        "Variante de gritar: si aparece el libro en la carta, en vez de agarrar hay que gritar el nombre del objeto correcto.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Se revela una carta.",
        "¿Hay un objeto con su color real? Agarralo.",
        "¿No? Agarrá el que no está ni en forma ni en color.",
        "Acierto: carta para vos. Error: entregás una.",
      ],
      scoring: ["1 punto por carta al final."],
      commonMistakes: ["Una sola mano y un solo intento por carta."],
    },
  },

  "sombras-sobre-londres": {
    howToPlay: {
      goal: "Un jugador es Jack y gana si sobrevive las 4 noches volviendo a su guarida sin que lo atrapen. Los demás son policías y ganan si lo arrestan o le cortan el camino.",
      setup: [
        "Jack elige en secreto su guarida (un círculo numerado) y la anota en su hoja, detrás de la pantalla.",
        "Jack distribuye sus fichas de mujeres (algunas son señuelos) y los policías sus fichas de patrulla (también con señuelos).",
        "Se reparten los detectives entre los demás jugadores; uno hace de jefe de investigación cada noche.",
      ],
      turn: [
        "Cada noche arranca con el crimen: Jack elige una víctima y marca la escena. Puede esperar unos turnos para que las víctimas se muevan, pero eso le da tiempo a la policía.",
        "Jack se mueve en secreto de un círculo numerado a otro vecino y lo anota. Tiene una cantidad limitada de movimientos para llegar a su guarida.",
        "Después se mueven los policías, hasta 2 cruces cada uno, por los cuadraditos negros.",
        "Cada policía hace una acción: buscar pistas en los círculos de al lado (Jack tiene que decir si pasó por ahí esa noche) o intentar un arresto en UN círculo vecino.",
        "Si Jack llega a su guarida, lo anuncia y termina la noche.",
      ],
      end: "Jack gana si completa las 4 noches. La policía gana si acierta un arresto donde está Jack, o si Jack se queda sin movimientos sin llegar a la guarida.",
      tips: [
        "Policías: las pistas de cada noche se van acumulando y terminan señalando la zona de la guarida. Anoten todo.",
        "Jack: variá el camino de vuelta. Si siempre entrás por el mismo lado, te cierran.",
        "La tercera noche hay dos crímenes: es la más difícil para Jack.",
      ],
      variants: [
        "Carruajes: Jack se mueve 2 círculos y puede pasar por arriba de un policía. Callejones: cruza una manzana. Tiene pocos de cada uno por noche.",
        "El reglamento trae reglas opcionales para ayudar a Jack o a la policía según la experiencia.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Jack: movete a un círculo vecino y anotalo en secreto.",
        "Policías: muevan hasta 2 cruces cada uno.",
        "Policías: cada uno busca pistas O arresta.",
        "Jack avisa cuando llega a la guarida.",
      ],
      keyActions: [
        { name: "Buscar pistas", text: "Preguntás por los círculos vecinos, de a uno, hasta encontrar una pista." },
        { name: "Arresto", text: "Elegís UN círculo vecino. Si Jack está ahí ahora, ganaron." },
        { name: "Carruaje", text: "Jack mueve 2 y puede cruzar policías." },
        { name: "Callejón", text: "Jack cruza una manzana a otro círculo de su borde." },
      ],
      commonMistakes: [
        "Jack no puede pasar por un cruce con un policía (salvo en carruaje).",
        "Pista = Jack pasó por ahí en algún momento de ESTA noche, no que esté ahí ahora.",
      ],
    },
  },

  clue: {
    howToPlay: {
      goal: "Ser el primero en deducir quién cometió el crimen, con qué arma y en qué habitación.",
      setup: [
        "Separá las cartas en sospechosos, armas y habitaciones. Sin mirar, sacá una de cada grupo y metelas en el sobre.",
        "Mezclá el resto y repartilas todas entre los jugadores.",
        "Cada uno elige un personaje, lo pone en su casilla de salida y marca en su hoja las cartas que tiene (esas no están en el sobre).",
      ],
      turn: [
        "Tirá el dado y mové tu ficha, o usá un pasadizo secreto si estás en una habitación de esquina.",
        "Si entrás a una habitación, hacé una sugerencia: «fue tal, con tal arma, en esta habitación». El sospechoso y el arma nombrados se traen a esa habitación.",
        "El jugador de tu izquierda, si tiene alguna de esas tres cartas, te muestra UNA en secreto. Si no tiene ninguna, pasa al siguiente, y así hasta que alguien muestre.",
        "Anotá lo que aprendiste.",
        "Cuando creas saber todo, hacé una acusación: decí las tres cosas y mirá el sobre en secreto.",
      ],
      end: "Si la acusación es correcta, ganaste. Si no, quedás afuera de moverte y sugerir, pero seguís mostrando cartas.",
      tips: [
        "Anotá también lo que los otros NO pudieron mostrar: es tanta información como lo que sí.",
        "Sugerir cosas que tenés en la mano sirve para aislar una sola incógnita.",
        "El anotador tiene una columna por jugador para marcar quién tiene qué.",
      ],
      variants: [
        "Los nombres de personajes, armas y habitaciones cambian según la edición. En el anotador podés editarlos para que coincidan con tu caja.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Dado y mover (o pasadizo).",
        "En una habitación: sugerencia con sospechoso + arma + esa habitación.",
        "Los demás, en orden, muestran una carta si la tienen.",
        "Anotar. Acusar solo si estás seguro.",
      ],
      keyActions: [
        { name: "Sugerencia", text: "Solo sobre la habitación donde estás parado." },
        { name: "Acusación", text: "Una sola por partida. Podés nombrar cualquier habitación." },
        { name: "Pasadizo", text: "Une las habitaciones de esquinas opuestas sin tirar el dado." },
      ],
      commonMistakes: [
        "Se muestra UNA sola carta, y solo al que sugirió.",
        "Si te arrastraron a una habitación por una sugerencia, en tu turno podés sugerir ahí sin moverte.",
      ],
    },
  },

  "pistas-cruzadas": {
    howToPlay: {
      goal: "Es cooperativo: llenar la mayor parte posible de la grilla antes de que se acabe el tiempo.",
      setup: [
        "Armen una grilla: una fila de cartas de palabra arriba (con letras A, B, C…) y una columna al costado (con números 1, 2, 3…). El tamaño depende de la dificultad; 5×5 es lo estándar.",
        "Cada jugador roba una carta de coordenada (por ejemplo B3) y la mira en secreto.",
        "Den vuelta el reloj de arena (5 minutos).",
      ],
      turn: [
        "No hay turnos. Cuando a alguien se le ocurre, dice UNA sola palabra que conecte la palabra de su columna con la de su fila.",
        "Los demás discuten y eligen una casilla.",
        "Si aciertan, la carta se pone en esa casilla. Si erran, la carta se descarta.",
        "El que dio la pista roba otra coordenada y sigue.",
      ],
      end: "Cuando se acaba el tiempo o las cartas. El puntaje es la cantidad de casillas llenas.",
      tips: [
        "Miren qué casillas ya están ocupadas: descartan opciones.",
        "Si tu coordenada es imposible, tirá una pista igual: bloquear el mazo es peor.",
      ],
      variants: [
        "Modo experto: grilla más grande, o sin poder hablar entre los que adivinan.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Mirá tu coordenada.",
        "Decí una sola palabra que una fila y columna.",
        "El resto elige una casilla.",
        "Acierto: se coloca. Error: se descarta. Robá otra.",
      ],
      scoring: ["1 punto por casilla llena. Grilla completa = puntaje perfecto."],
      commonMistakes: [
        "No vale usar las palabras de la grilla ni derivadas.",
        "El que da la pista no puede ayudar ni reaccionar.",
      ],
    },
  },

  cometas: {
    howToPlay: {
      goal: "Es cooperativo y en tiempo real: jugar todas las cartas del mazo y de las manos sin que ningún reloj de arena se quede sin arena.",
      setup: [
        "Poné los 6 relojes de arena acostados al medio.",
        "Repartí las cartas según la cantidad de jugadores y armá el mazo con el resto.",
        "Parás el reloj blanco (con la arena arriba) y arranca la partida.",
      ],
      turn: [
        "En tu turno jugás una carta boca arriba y das vuelta el reloj (o los relojes) del color que muestra.",
        "La primera vez que sale un color, ese reloj se para y empieza a correr.",
        "Carta de un solo color: podés dar vuelta ese reloj O el blanco.",
        "Carta de dos colores: tenés que dar vuelta los dos, sí o sí.",
        "Robás una carta y juega el siguiente, lo más rápido posible.",
      ],
      end: "Cuando se acaba el mazo empieza el gran final: hay que jugar todas las cartas de las manos y el blanco ya no se puede dar vuelta. Si lo logran, ganan. Si cualquier reloj se vacía antes, pierden.",
      tips: [
        "Hablen todo el tiempo: «tengo rojo», «necesito azul ya».",
        "Dar vuelta un reloj al que casi no le cayó arena lo deja casi vacío: a veces conviene esperar.",
        "Los relojes duran distinto: el rojo es el más corto y el violeta el más largo.",
      ],
      variants: [
        "Cartas de desafío para subir la dificultad: tormenta (dar vuelta todos), líneas cruzadas y avión (silencio).",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Jugá una carta.",
        "Da vuelta el o los relojes de esos colores.",
        "Robá una carta.",
        "Rápido: sigue el próximo.",
      ],
      keyActions: [
        { name: "Un color", text: "Ese reloj o el blanco, a elección." },
        { name: "Dos colores", text: "Los dos, obligatorio." },
        { name: "Gran final", text: "Sin mazo, el blanco ya no se toca." },
      ],
      commonMistakes: [
        "El blanco solo se da vuelta con cartas de un color.",
        "Dar vuelta un reloj recién dado vuelta lo vacía enseguida.",
      ],
    },
  },

  odin: {
    howToPlay: {
      goal: "Tener la menor cantidad de puntos cuando alguien llega a 15. Los puntos son las cartas que te quedan en la mano al final de cada ronda.",
      setup: [
        "El mazo tiene cartas del 1 al 9 en 6 colores.",
        "Repartí 9 cartas a cada uno. El resto no se usa en esta ronda.",
      ],
      turn: [
        "El que abre juega UNA sola carta.",
        "El siguiente tiene que jugar algo de valor más alto, con la misma cantidad de cartas o con una más. O pasar.",
        "Si jugás varias cartas, tienen que ser todas del mismo número o todas del mismo color. El valor se lee ordenando los dígitos de mayor a menor (un 8 y un 3 valen 83).",
        "Después de jugar, tenés que levantar UNA carta de la jugada anterior y llevártela a la mano; el resto de esa jugada se descarta.",
        "Si todos pasan, se limpia la mesa y el último que jugó abre de nuevo con una sola carta.",
      ],
      end: "La ronda termina cuando alguien se queda sin cartas. Cada uno suma 1 punto por carta en la mano. Cuando alguien llega a 15, gana el que menos tiene.",
      tips: [
        "Levantar una carta no siempre es malo: elegí la que te arma un grupo de color o de número.",
        "Si al empezar tu turno todas tus cartas son del mismo número o color, podés jugarlas todas juntas y cerrar.",
      ],
      variants: ["Cantidad de cartas iniciales y puntaje final: a confirmar con el reglamento si juegan de a 2."],
    },
    cheatSheet: {
      yourTurn: [
        "Jugá un valor más alto, con igual cantidad de cartas o una más. O pasá.",
        "Levantá una carta de la jugada anterior.",
        "Si todos pasan: mesa limpia y abrís con una carta.",
      ],
      keyActions: [
        { name: "Jugada válida", text: "Varias cartas del mismo número, o del mismo color." },
        { name: "Valor", text: "Los dígitos ordenados de mayor a menor: 9-5-2 vale 952." },
      ],
      scoring: ["1 punto por carta en mano al terminar la ronda.", "Se juega hasta 15. Gana el que menos tiene."],
      commonMistakes: [
        "Levantar una carta es obligatorio, no opcional.",
        "No podés jugar DOS cartas más que la jugada anterior: solo igual o una más.",
      ],
    },
  },

  nessos: {
    howToPlay: {
      goal: "Ser el primero en llegar al puntaje objetivo juntando ánforas… sin quedarte con 3 cartas de Caronte, que te eliminan.",
      setup: [
        "Armá el mazo según la cantidad de jugadores (con menos gente se sacan algunas cartas).",
        "Repartí 5 cartas a cada uno.",
      ],
      turn: [
        "Elegí una carta de tu mano y ofrecésela boca abajo a otro jugador, anunciando su número.",
        "Si es una ánfora, tenés que decir la verdad. Si es un Caronte, tenés que mentir y decir un número cualquiera.",
        "El que recibe la oferta elige: ACEPTAR (se queda las cartas boca arriba), RECHAZAR (las cartas vuelven boca arriba al que ofreció) o SUMAR una carta de su mano y pasarle todo a otro jugador, anunciando su carta de la misma forma.",
        "Con 3 cartas en la oferta ya no se puede sumar: el último tiene que aceptar o rechazar.",
        "Todos reponen su mano hasta 5.",
      ],
      end: "Si juntás 3 Carontes boca arriba, quedás eliminado. Gana el primero que llega al puntaje objetivo, o el último que queda en pie.",
      tips: [
        "Un número alto anunciado puede ser una ánfora buenísima o un Caronte: mirá quién te lo ofrece y cómo viene la partida.",
        "Sumar una carta y pasarla es la forma de sacarte un Caronte de encima.",
      ],
      variants: [
        "Puntaje objetivo según jugadores (a confirmar con el reglamento): 3 y 4 jugadores, 40 puntos · 5 jugadores, 35 · 6 jugadores, 30.",
        "El reglamento da bonus por ciertas combinaciones de ánforas: revisalo antes de la primera partida.",
      ],
    },
    cheatSheet: {
      yourTurn: [
        "Ofrecé una carta boca abajo y anunciá el número.",
        "El otro acepta, rechaza o suma una carta y la pasa.",
        "Máximo 3 cartas por oferta.",
        "Reponer la mano hasta 5.",
      ],
      keyActions: [
        { name: "Ánfora", text: "Vale su número. Hay que anunciarla con la verdad." },
        { name: "Caronte", text: "No suma. Hay que anunciarlo con un número falso. Tres te eliminan." },
      ],
      scoring: ["Sumá el valor de tus ánforas boca arriba.", "Usá el anotador por rondas para llevar la cuenta."],
      commonMistakes: [
        "Con una ánfora NO se puede mentir.",
        "Si rechazan tu oferta, las cartas te las quedás vos.",
      ],
    },
  },

  munchkin: {
    howToPlay: {
      goal: "Ser el primero en llegar a nivel 10. El último nivel hay que ganarlo matando un monstruo.",
      setup: [
        "Separá los dos mazos: Puertas y Tesoros.",
        "Repartí 4 cartas de cada mazo a cada jugador.",
        "Todos arrancan en nivel 1, sin raza ni clase. Podés bajar a la mesa lo que te haya tocado (objetos, raza, clase).",
      ],
      turn: [
        "Patear la puerta: da vuelta una carta de Puerta. Si es un monstruo, peleás. Si es una maldición, te cae. Cualquier otra cosa, a tu mano.",
        "Si no hubo monstruo: podés buscar problemas (pelear con un monstruo de tu mano) o saquear la habitación (robar otra Puerta boca abajo).",
        "Combate: tu nivel + tus bonus contra el nivel del monstruo. Si lo superás, subís 1 nivel y robás sus tesoros. Si no, intentás huir tirando el dado (zafás con 5 o 6) o sufrís lo que dice la carta.",
        "Caridad: si terminás con más de 5 cartas en la mano, las de más se las das al jugador de menor nivel.",
      ],
      end: "En cuanto alguien llega a nivel 10 matando un monstruo, gana.",
      tips: [
        "Los demás pueden meterse en tu combate: potenciar al monstruo, sumarle otro, o ayudarte a cambio de tesoros.",
        "Guardá las cartas de joder para cuando alguien esté por ganar.",
        "Vender objetos por 1000 monedas de oro te da un nivel (pero no el décimo).",
      ],
      variants: ["Para una partida más corta, jueguen hasta nivel 8 o usen las reglas de «partida rápida» del reglamento."],
    },
    cheatSheet: {
      yourTurn: [
        "Pateá la puerta (carta boca arriba).",
        "¿Monstruo? Peleá. ¿No? Buscá problemas o saqueá.",
        "Ganás: +1 nivel y tesoros. Perdés: huir con 5 o 6.",
        "Caridad: máximo 5 cartas en mano.",
      ],
      keyActions: [
        { name: "Fuerza", text: "Nivel + bonus de objetos y cartas de un solo uso." },
        { name: "Ayuda", text: "Un solo jugador puede ayudarte; suma su fuerza." },
        { name: "Equipo", text: "1 armadura, 1 casco, 1 calzado y 2 manos (o 1 arma de dos manos). Un solo objeto Grande." },
        { name: "Morir", text: "Perdés todo tu equipo, pero mantenés nivel, raza y clase." },
      ],
      scoring: ["Empatar con el monstruo es perder (salvo los guerreros)."],
      commonMistakes: [
        "El nivel 10 solo se consigue matando un monstruo.",
        "Durante un combate no podés equiparte, vender ni cambiar objetos.",
      ],
    },
  },
};
