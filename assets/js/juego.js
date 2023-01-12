/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diaminds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck         = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntaje = document.querySelectorAll('small');
const cartasJugador = document.querySelector('#jugador-cartas');
const cartasComputador = document.querySelector('#computador-cartas');

//Esta funcion crea una nueva baraja
const crearDeck = () => {
    for(let i = 2 ; i<=10 ; i++){
        for(let tipo of tipos ){
            deck.push(i + tipo);
        }
    }
    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial + tipo)
        }
    }

    console.log(deck)
    deck = _.shuffle( deck );
    console.log(deck);
    return deck;
}


crearDeck();

//Esta función me permite pedir una carta
const pedirCarta = () =>{

    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}


//Esta función determina el valor de la carta seleccionada
const valorCarta = (carta) => {
    const valor = carta.substring(0,carta.length-1);
    let puntos = 0;

    puntos = (isNaN(valor)) ? puntos = (valor === 'A') ? 11 : 10 :
    puntos = valor * 1; 

    return puntos;
}

//Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntaje[1].innerHTML = puntosComputadora;
        const imgCarta = document.createElement('IMG');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        cartasComputador.append(imgCarta);

        if(puntosMinimos > 21 ){
            break;
        }
    }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if(puntosComputadora === puntosMinimos){
            alert('Nadie gana');
        }else if(puntosMinimos > 21){
            alert('computadora gana');
        }else if(puntosComputadora > 21){
            alert('jugador gana')
        }else if (puntosComputadora < puntosJugador){
            alert('computadora gana');
        }else if(puntosComputadora > puntosJugador){
            alert('jugador gana');
        }
    }, 10);
}
//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntaje[0].innerHTML = puntosJugador;
    const imgCarta = document.createElement('IMG');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    cartasJugador.append(imgCarta);

    if(puntosJugador > 21 ){
        console.warn('Perdiste');
        btnPedir.disabled = true ;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        console.warn('21, ganaste');
        turnoComputadora(puntosJugador);
        btnDetener.disabled = true;
    }
    
})

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
})

btnNuevo.addEventListener('click', () => {
    deck = crearDeck();
    console.log(deck);
    puntosJugador = 0;
    puntosComputadora = 0;
    puntaje.forEach(puntos =>{
        puntos.innerHTML = '0';
    })
    cartasComputador.innerHTML = '';
    cartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})