//Challenge 1 : Your Age in Days======================================================================================================
function ageInDays() {
    var birthYear = prompt("What year you were born?")
    var ageInDays = (2020- birthYear) * 365
    var h1 = document.createElement('h1')
    var textAnswer = document.createTextNode(`You Are ${ageInDays} days old`)
    h1.setAttribute('id','ageInDays')
    h1.appendChild(textAnswer)
    document.getElementById('flex-box-result').appendChild(h1)
}

function reset() {
    document.getElementById('ageInDays').remove()
}

//Challenge 2 : Cat generator=========================================================================================================
function generateCat() {
    var image = document.createElement('img')
    var div = document.getElementById('flex-cat-gen')
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif&size=small"
    div.appendChild(image)
}

//Challenge 3 : Rock, Paper, Scissor===================================================================================================
function rpsGame(yourChoice) {
    // console.log(yourChoice.id)
    var humanChoice, botChoice
    humanChoice = yourChoice.id
    botChoice = numberToChoice(randToRpsInt())
    // console.log (botChoice)
    result = decideWinner(humanChoice,botChoice) //return array [0,1] human lost | bot won
    // console.log(result)
    message = finalMessage(result) // return object {"message" : 'You Won', "color" : green}
    // console.log(message)
    rpsFrontEnd(humanChoice, botChoice, message)
}

function randToRpsInt () {
    return Math.floor(Math.random() * 3)
}

function numberToChoice (number) {
    return ["rock" , "paper" , "scissor"][number]
}

function decideWinner(yourChoice, botChoice) {
    var rpsDataBase = {
        'rock' : {'scissor' : 1 , 'rock' : 0.5 , 'scissor' : 0},
        'paper' : {'rock' : 1 , 'paper' : 0.5 , 'scissor' : 0},
        'scissor' : {'rock' : 0 , 'paper' : 1 , 'scissor' : 0.5}
    }

    var yourScore = rpsDataBase [yourChoice][botChoice]
    var botScore = rpsDataBase [botChoice][yourChoice]

    return [yourScore , botScore]
}

function finalMessage([yourScore , botScore]) {
    if (yourScore === 0) {
        return {'message' : 'You Lost' , 'color' : 'red'}
    } else if (yourScore === 0.5) {
        return {'message' : 'You Tie' , 'color' : 'yellow'}
    } else {
        return {'message' : 'You Won' , 'color' : 'green'}
    }
}

function rpsFrontEnd(humanImageChoice , botImageChoice , finalMessage) {
    var imagesDabase = {
        'rock' : document.getElementById('rock').src,
        'paper' : document.getElementById('paper').src,
        'scissor' : document.getElementById ('scissor').src
    }

    //remove all images
    document.getElementById('rock').remove()
    document.getElementById('paper').remove()
    document.getElementById('scissor').remove()

    var humanDiv = document.createElement('div')
    var botDiv = document.createElement('div')
    var messageDiv = document.createElement('div')

    humanDiv.innerHTML = `<img src='${imagesDabase[humanImageChoice]}' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'>`
    botDiv.innerHTML = `<img src='${imagesDabase[botImageChoice]}' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1)'>`
    messageDiv.innerHTML = `<h1 style ='color: ${finalMessage['color']} ; font-size : 60px ; padding 30px' > ${finalMessage['message']} </h1>`
    document.getElementById('flex-box-rps-div').appendChild(humanDiv)
    document.getElementById('flex-box-rps-div').appendChild(messageDiv)
    document.getElementById('flex-box-rps-div').appendChild(botDiv)
}

//Challenge 4 : Change the Color of All Buttons=======================================================================================
var all_buttons = document.getElementsByTagName('button')

var copyAllButtons = []
for(let i = 0; i < all_buttons.length; i++) {
    copyAllButtons.push(all_buttons[i].classList[1])
}
// console.log(copyAllButtons)
function buttonColorChange(buttonObj) {
    switch (buttonObj.value) {
        case 'red':
            buttonRed()
            break
        case 'green':
            buttonGreen();
            break
        case 'random':
            buttonColorRandom()
            break
        case 'reset':
            buttonColorReset()
            break
    }
}

function buttonRed() {
    for(let i = 0 ; i < all_buttons.length ; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add('btn-danger')
    }
}

function buttonGreen() {
    for(let i = 0 ; i < all_buttons.length ; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add('btn-success')
    }
}

function buttonColorReset() {
    for(let i = 0 ; i <all_buttons.length ; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add(copyAllButtons[i])
    }
}

function buttonColorRandom() {
    const choices = ['btn-primary','btn-success','btn-warning','btn-danger']
    for(let i = 0 ; i<all_buttons.length ; i++) {
        let randomNumber = Math.floor(Math.random() * 4)
        all_buttons[i].classList.remove(all_buttons[i].classList[1])
        all_buttons[i].classList.add(choices[randomNumber])
    }
}

//challenge 5 : Blackjack======================================================================================================
let blackjackGame = {
    'player': {'scoreSpan' : '#player-blackjack-result' , 'div' : '#player-box' , 'score' : 0},
    'dealer': {'scoreSpan' : '#dealer-blackjack-result' , 'div' : '#dealer-box' , 'score' : 0},
    'cards' : ['2C','3C','4C','5C','6C','7C','8C','9C','10C','AC','JC','QC','KC',
                '2D','3D','4D','5D','6D','7D','8D','9D','10D','AD','JD','QD','KD',
                '2H','3H','4H','5H','6H','7H','8H','9H','10H','AH','JH','QH','KH',
                '2S','3S','4S','5S','6S','7S','8S','9S','10S','AS','JS','QS','KS'],
    'cardsMap' : {'2': 2 ,'3' : 3 ,'4' : 4 ,'5' : 5 ,'6' : 6,'7' : 7 ,'8' : 8 , '9' : 9 , '1' : 10 ,'A' : [1 , 11] , 'J' : 10 ,'Q' : 10 , 'K' :10},
    'wins' : 0,
    'loses' : 0,
    'draws' : 0,
    'isStart' : false,
    'isHit' : false,
    'isStand' : false,
    'turnsOver' : false
}

const player = blackjackGame['player']
const dealer = blackjackGame['dealer']

var playerHandCards = []
var dealerHandCards = []

const hitSound = new Audio('static/sound/swish.m4a')
const winSound = new Audio('static/sound/cash.mp3')
const loseSound = new Audio('static/sound/aww.mp3')

document.querySelector('#blackjack-start-button').addEventListener('click',blackjackStart)
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit)
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic)
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal)

function blackjackStart() {
    if(blackjackGame['isStart'] === false) {
        let cardPlayer = randomCards()
        let cardDealer = randomCards()
        showCard(player,cardPlayer)
        rearrangeCard(player,cardPlayer,playerHandCards)
        calculateScore(player,playerHandCards)
        showScore(player)
        showCard(dealer,cardDealer)
        rearrangeCard(dealer,cardDealer,dealerHandCards)
        calculateScore(dealer,dealerHandCards)
        showScore(dealer)
        blackjackGame['isStart'] = true
    }
}

function blackjackHit() {
    if(blackjackGame['isStand'] === false && blackjackGame['isStart'] === true) {
        let card = randomCards()
        showCard(player,card)
        // showCard(dealer,card)
        rearrangeCard(player,card,playerHandCards)
        calculateScore(player,playerHandCards)    
        // updateScore(player,card)
        showScore(player)
        blackjackGame['isHit'] = true
    }

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms))
}


async function dealerLogic() {
    if(blackjackGame['turnsOver'] === false && blackjackGame['isStart'] === true && blackjackGame['isHit'] === true) {
        blackjackGame['isStand'] = true
        while(dealer['score'] < 16 && blackjackGame['isStand'] === true){
            let card = randomCards()
            showCard(dealer,card)
            rearrangeCard(dealer,card,dealerHandCards)
            calculateScore(dealer,dealerHandCards)
            showScore(dealer)
            await sleep(1000)
        }
        
        // if(dealer['score'] > 15) {
            blackjackGame['turnsOver'] = true;
            showResult(computeWinner());
        // }
    }
  
}
function blackjackDeal() {
    if(blackjackGame['turnsOver'] === true){
        //2p :
        // showResult(computeWinner())
        playerHandCards = []
        dealerHandCards = []
        let playerImages = document.querySelector('#player-box').querySelectorAll('img')
        let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img')
        for(let i = 0 ; i <playerImages.length ; i++) {
            playerImages[i].remove()
        }
        for(let i = 0 ; i <dealerImages.length ; i++) {
            dealerImages[i].remove()
        }
        player['score'] = 0
        dealer['score'] = 0
        document.querySelector('#player-blackjack-result').textContent = 0
        document.querySelector('#dealer-blackjack-result').textContent = 0

        document.querySelector('#player-blackjack-result').style.color = 'white'
        document.querySelector('#dealer-blackjack-result').style.color = 'white'

        document.querySelector('#blackjack-result').textContent = "Let's play"
        document.querySelector('#blackjack-result').style.color = 'black'
        blackjackGame['isStand'] = false
        blackjackGame['turnsOver'] = false
        blackjackGame['isStart'] = false
        blackjackGame['isHit'] = false
    }

}


function showCard(activePlayer,card) { 
    if(activePlayer['score'] <= 21){
        let cardImage =  document.createElement('img')
        cardImage.src = `static/images/${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage)
        hitSound.play()
    }
}


function randomCards() {
    let randomIndex = Math.floor(Math.random() * 52)
    return blackjackGame['cards'][randomIndex]
}

function rearrangeCard(activePlayer,card,activePlayerHandCards) {
    activePlayer['score'] = 0
    activePlayerHandCards.push(card[0])
    if(activePlayerHandCards.includes('A')){
      var aIndex = activePlayerHandCards.indexOf('A',0)
      activePlayerHandCards[aIndex] = activePlayerHandCards[activePlayerHandCards.length-1]
      activePlayerHandCards[activePlayerHandCards.length-1] = 'A'
    }
}

function calculateScore(activePlayer,activePlayerHandCards) {
    // console.log(playerHandCards)
    for(let i = 0 ; i < activePlayerHandCards.length ; i++) {
        updateScore(activePlayer,activePlayerHandCards[i])
    }
}

function updateScore(activePlayer, card) {
    // console.log(card[0])
    
    //A is 1 or 11
    //this will update the score in object blackjackGame
    if(card[0] === 'A'){
        if(activePlayer['score'] + blackjackGame['cardsMap'][card[0]][1] <=21) {
            activePlayer['score'] += blackjackGame['cardsMap'][card[0]][1]
        }else {
            activePlayer['score'] += blackjackGame['cardsMap'][card[0]][0]
        }
    }else {
        activePlayer['score'] += blackjackGame['cardsMap'][card[0]]
    }
    
}

function showScore(activePlayer) {
    if(activePlayer['score'] > 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST'
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red'
    }else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score']
    }
    
}

//compute winner and return who won
//update wins,loses,draws value
function computeWinner() {
    let winner

    if(player['score'] <=21) {
    // conditions are : if player > than dealer or when dealer bust but player <=21
    if(player['score'] > dealer['score'] || dealer['score'] > 21) {
        // console.log('PLAYER WON')
        blackjackGame['wins']++
        winner = player
    }else if(player['score'] < dealer['score']) {
        // console.log('DEALER WON')
        blackjackGame['loses']++
        winner = dealer
    }else if(player['score'] === dealer['score']) {
        // console.log('DREW')
        blackjackGame['draws']++
    }
    
    //condition : when player BUST but dealer doesnt
    }else if (player['score'] >21 && dealer['score'] <= 21){
        // console.log('PLAYER LOST')
        blackjackGame['loses']++
        winner = dealer

    //condition : when both dealer and player BUST
    }else if(player['score'] > 21 && dealer['score'] > 21) {
        console.log('DREW')
        blackjackGame['draws']++
    }

    // console.log(winner)
    return winner
}

function showResult(winner) {
    let message,messageColor

    // if(blackjackGame['turnsOver'] === true) {
        if(winner === player ) {
            message = 'PLAYER WON'
            messageColor = 'green'
            winSound.play()
        }else if(winner === dealer) {
            message = 'DEALER WON'
            messageColor = 'red'
            loseSound.play()
        } else {
            message = 'DREW'
            messageColor = 'black'
        }
    
        document.querySelector('#blackjack-result').textContent = message
        document.querySelector('#blackjack-result').style.color = messageColor
        document.querySelector('#wins').textContent = blackjackGame['wins']
        document.querySelector('#losses').textContent = blackjackGame['loses']
        document.querySelector('#draws').textContent = blackjackGame['draws']
    // }

}
