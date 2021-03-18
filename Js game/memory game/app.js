document.addEventListener('DOMContentLoaded',()=>{
    
//card options
const cardArray = [
    {
        name : 'eevee',
        img : 'assets/eevee.jpg'
    },
    {
        name : 'eevee',
        img : 'assets/eevee.jpg'
    },
    {
        name : 'pikachu',
        img : 'assets/pikachu.jpg'
    },
    {
        name : 'pikachu',
        img : 'assets/pikachu.jpg'
    },
    {
        name : 'Cyndaquil',
        img : 'assets/Cyndaquil.png'
    },
    {
        name : 'Cyndaquil',
        img : 'assets/Cyndaquil.png'
    },
    {
        name : 'whimscott',
        img : 'assets/whimscott.jpg'
    },
    {
        name : 'whimscott',
        img : 'assets/whimscott.jpg'
    },
    {
        name : 'chikorita',
        img : 'assets/chikorita.jpg'
    },
    {
        name : 'chikorita',
        img : 'assets/chikorita.jpg'
    },
    {
        name : 'charmander',
        img : 'assets/charmander.png'
    },
    {
        name : 'charmander',
        img : 'assets/charmander.png'
    },
]

//randomize position when reset
cardArray.sort(()=> 0.5 - Math.random());

//create gameboard
const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('#result');
var selectedCard = [];
var selectedCardId = [];
var cardsWon = [];

createBoard = () =>{
    for(let i = 0 ; i < cardArray.length ; i++){
        var card = document.createElement('img'); //create an element
        card.setAttribute('src','assets/pokemon logo.png'); // add attribute(s) to the new element
        card.setAttribute('data-id',i);
        card.addEventListener('click',flipcard); //add event listener for flipcard when clicked
        grid.appendChild(card);
        card.style.borderStyle = 'groove';
    }
}

//flip the card
function flipcard(){
    var cardId = this.getAttribute('data-id'); //'this' mean the variable before (card.getAttribute())
    selectedCard.push(cardArray[cardId].name); //push card's name based on card id
    selectedCardId.push(cardId); //only push the id
    this.setAttribute('src',cardArray[cardId].img);
    if(selectedCard.length === 2){
        setTimeout(checkForMatch, 500) //add some delay so everything doesnt turn out too quickly
    }
}

//check for matches
checkForMatch = () =>{
    var cards = document.querySelectorAll('img');
    const optionOneId =selectedCardId[0]
    const optionTwoId = selectedCardId[1];
    if(selectedCard[0] === selectedCard[1]) {
        alert("You found a match");
        cards[optionOneId].setAttribute('src','assets/white blank.png');
        cards[optionTwoId].setAttribute('src','assets/white blank.png');
        cardsWon.push(selectedCard);
    }else {
        cards[optionOneId].setAttribute('src','assets/pokemon logo.png');
        cards[optionTwoId].setAttribute('src','assets/pokemon logo.png');
        alert('Sorry, Try again');
    }

    //reset the array
    selectedCard = [];  
    selectedCardId = [];
    resultDisplay.textContent = cardsWon.length;
    if(cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations, You WON!';
    }
}





createBoard();




})