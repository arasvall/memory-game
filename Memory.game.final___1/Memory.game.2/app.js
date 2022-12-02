

    let deck = document.querySelector(".board");
    const playerOneDisplay = document.querySelector('#score1');
    const playerTwoDisplay = document.querySelector('#score2');
    let chosenCards = []; // set to empty array 
    let nameOfChosenCards = []; // set to empty array 
    let pair = []; // set to empty array 
    

const cards = [ // Place all cards in one array 

    {
        name: 'Black widow',
        img: 'IMG/Black-widow.png'
    },
    {
        name: 'Black widow',
        img: 'IMG/Black-widow.png'
    },
    {
        name: 'Deadpool',
        img: 'IMG/deadpool.png'
    },
    {
        name: 'Deadpool',
        img: 'IMG/deadpool.png'
    },
    {
        name: 'Hulk',
        img: 'IMG/hulk.png'
    },
    {
        name: 'Hulk',
        img: 'IMG/hulk.png'
    },
    {
        name: 'Iron man',
        img: 'IMG/Iron-man.png'
    },
    {
        name: 'Iron man',
        img: 'IMG/Iron-man.png'
    },
    {
        name: 'Loki',
        img: 'IMG/Loki.png'
    },
    {
        name: 'Loki',
        img: 'IMG/Loki.png'
    },
    {
        name: 'Spiderman',
        img: 'IMG/spiderman.png'
    },
    {
        name: 'Spiderman',
        img: 'IMG/spiderman.png'
    },
    {
        name: 'Thor',
        img: 'IMG/Thor.png'
    },
    {
        name: 'Thor',
        img: 'IMG/Thor.png'
    },
    {
        name: 'Wolverine',
        img: 'IMG/Wolverine.png'
    },
    {
        name: 'Wolverine',
        img: 'IMG/Wolverine.png'
    },
    {
        name: 'Groot',
        img: 'IMG/Groot.png'
    },
    {
        name: 'Groot',
        img: 'IMG/Groot.png'
    },
    {
        name: 'Rocket',
        img: 'IMG/Rocket.png'
    },
    {
        name: 'Rocket',
        img: 'IMG/Rocket.png'
    },
    {
        name: 'Rogue',
        img: 'IMG/Rogue.png'
    },
    {
        name: 'Rogue',
        img: 'IMG/Rogue.png'
    },
    {
        name: 'Cyclops',
        img: 'IMG/Cyclops.png'
    },
    {
        name: 'Cyclops',
        img: 'IMG/Cyclops.png'
    },
]


cards.sort(() => 0.5 - Math.random()) // place the cards randomly

/* Funktionen gameBoard körs endast en gång, alltså när spelet startar. När den körs så loopar den igenom alla kort i
arrayen "cards". Då gör den två saker:

1. Sätter img "src" till marvel-icon.png, då ser det ut som alla kort är vända med baksidan upp.

2. Ger varje kort ett unikt id-nummer så vi kan hålla reda på dem i arrayen "cards". Det gör det genom att sätta
attributet "data-id" på varje kort till vad räknaren (i) är just den gången. Varje varv som loopen körs så ökar "i" med 1.

Alltså: 
- Första varvet
1. "i” är 0. 
2. Kortet på plats cards[0] får data-id = 0. 
3. ”i” ökar med 1.

- Andra varvet
1. "i” är 1. 
2. Kortet på plats cards[1] får data-id = 1. 
3. ”i” ökar med 1.

Osv..  
När varje kort får ett unikt ID så ser programmet skillnad på img "spiderman" och img "spiderman" */


// -------------------------------- Set the gameboard
// förbereder och startar spelet, skickar sedan till flipcard
function gameBoard(){
    highlightPlayer1();
    for(let i = 0; i < cards.length; i++){
        let card = document.createElement('img') // Create img 
        card.setAttribute('src', 'IMG/marvel-icon.png'); // place marvel-icon on every img we created
        card.setAttribute('data-id', i); // Give every card a unique id-number, based on the current "i" value
        card.addEventListener('click', flipCard); // when a card is clicked, call function "flipCard"
        deck.appendChild(card); // append "card" to "deck"
    }
}

gameBoard();


// -------------------------------- Turn around cards

function flipCard() {
    let cardId = this.getAttribute('data-id') // Picks the 'data-id' on the chosen card and saves it in varible 'cardId'. Then we can retrieve the card the player clicked on from the array of all cards.
    chosenCards.push(cards[cardId].name)
    nameOfChosenCards.push(cardId)
    this.setAttribute('src', cards[cardId].img)

    if(chosenCards.length === 2) { // examine if there is two cards in "chosenCards", if it's not, wait for player to choose another card so "flipCard" is run again
        setTimeout(match, 600) // call function match after 0.6 seconds
    }
}

// -------------------------- highlight the player whose turn it is
function highlightPlayer1(){
    document.querySelector('.Player1').style.backgroundColor = '#fb7777'; // select the player and add style
    document.querySelector('.Player2').style.backgroundColor = '#ffcccc';
}
function highlightPlayer2(){
    document.querySelector('.Player1').style.backgroundColor = '#ffcccc';
    document.querySelector('.Player2').style.backgroundColor = '#fb7777';
}

// ----------------------------------- match - play game

let playerOneScore = 0; // set up the score counter
let playerTwoScore = 0;
let firstPlayersTurn = true; // later helps us vary the players turn

function match(){
    let allCards = document.querySelectorAll('img'); 
    const firstCardId = nameOfChosenCards[0]; // the first card chosen and saved in "nameOfChosenCards"
    const secondCardId = nameOfChosenCards[1]; // the second card chosen and saved in "nameOfChosenCards"
    
    
    if (chosenCards[0] === chosenCards[1]){ // if both clicked cards has the same name
        allCards[firstCardId].setAttribute('style', 'opacity: 0; visibility: hidden;' ) // remove the two identical clicked cards
        allCards[secondCardId].setAttribute('style', 'opacity: 0; visibility: hidden;' ) 

        pair.push(chosenCards) //add won cards to pair

        if(firstPlayersTurn){ // if it's the first player who got a match
            playerOneScore += 1; // add 1 point to player
            playerOneDisplay.textContent = playerOneScore //adds the number to the player's score board
        } else{ // if it's the second player who got a match
            playerTwoScore += 1; // add 1 point to player
            playerTwoDisplay.textContent = playerTwoScore //adds the number to the player's score board
        }

        if (pair.length === cards.length/2){ // 
            gameOver(); // call function "gameOver"
        }
    
    } else { // if the cards did not match
        allCards[firstCardId].setAttribute('src', 'IMG/marvel-icon.png'); // flip back cards
        allCards[secondCardId].setAttribute('src', 'IMG/marvel-icon.png'); 
        if(firstPlayersTurn){ // if firstPlayersTurn = true
            firstPlayersTurn = false; // change it so it's the other player's turn instead
            highlightPlayer2() //apply highlight on the player whose turn it is
        } else if (!firstPlayersTurn){
            firstPlayersTurn = true;
            highlightPlayer1()
        }

}
chosenCards = [];
nameOfChosenCards = [];
}

// -------------------------- Game Over

function gameOver(){
    deck.classList.add('wonDisplay'); // create new class only in this function to make it easer to style css 
    let wonDisplay = document.querySelector('.wonDisplay');
    if(playerOneScore > playerTwoScore){
        wonDisplay.textContent = 'Grattis! Spelare 1 vann!'
    } else if (playerTwoScore > playerOneScore){
        wonDisplay.textContent = 'Grattis! Spelare 2 vann!'
    } else if (playerOneScore === playerTwoScore){
        wonDisplay.textContent = 'Hoppsan! Det blev lika!'
    }
    
}




