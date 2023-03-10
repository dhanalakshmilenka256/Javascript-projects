//Challange1:your age in days
function ageindays(){
    var birthyear=prompt("what year were you born?");
    var birthmonth=prompt("what month you were born?");
    var birthday=prompt("what day you were born?");
    var months;
    if(birthmonth>2){
        months=birthmonth-2;
    }
    else{
        months=2-birthmonth;
    }
    var agendays=(2023-birthyear)*365+months*30+birthday;
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode('You are '+agendays+' days old');
    h1.setAttribute('id','agendays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
    console.log(agendays);
}
function reset(){
    document.getElementById('agendays').remove();
}
//Challenge 2:cat Generator
function generatecat(){
    var image=document.createElement('img');
    var div=document.getElementById('flex-cat-gen');
    image.src="http://thecatapi.com/api/images/get?format=src&type=gif&size";
    div.appendChild(image);
}
//Challenge3:Rock,Paper,Scissor
function rpsGame(choice){
    console.log(choice);
    var humanchoice,robotchoice;
    humanchoice=choice.id;
    robotchoice=numberToChoice(randTorpsInt());
    console.log('computer choice',robotchoice);
    results=decideWinner(humanchoice,robotchoice);
    console.log(results);
    message=finalMessage(results);
    rpsfrontend(choice.id,robotchoice,message);
}
function randTorpsInt(){
    return Math.floor(Math.random()*3);
}
 
function numberToChoice(num){
    return['rock','paper','scissor'][num];
}
function decideWinner(choice,compchoice){
    var rpsDatabase={
        'rock':{'scissor':1,'rock':0.5,'paper':0},
        'paper':{'rock':1,'paper':0.5,'scissor':0},
        'scissor':{'paper':1,'scissor':0.5,'rock':0}
    };

    var yourscore=rpsDatabase[choice][compchoice];
    var compscore=rpsDatabase[compchoice][choice];
    return [yourscore,compscore];
}

function finalMessage([yourscore,compscore]){
    if(yourscore===0){
        return {'message':'You lost!','color':'red'};
    }
    else if(yourscore===0.5){
        return {'message':'You Tied!','color':'yellow'};
    }
    else{
    return {'message':'You Won!','color':'green'};
}
}

function rpsfrontend(humanImageChoice,robotImageChoice,finalMessage){
    var imagesDatabase={
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src,
    }
    //let's remove all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();
    var humanDiv=document.createElement('div');
    var robotDiv=document.createElement('div');
    var messageDiv=document.createElement('div');
    humanDiv.innerHTML= "<img src='"+imagesDatabase[humanImageChoice]+"' height=150 width=150 style='box-shadow':0px 10px 50px rgba(37,50,233,1);>"
    messageDiv.innerHTML= "<h1 style='color: "+finalMessage['color']+"; font-size:60px; padding:30px; '>" + finalMessage['message'] + "</h1>"
    robotDiv.innerHTML= "<img src='"+imagesDatabase[robotImageChoice]+"' height=150 width=150 style='box-shadow':0px 10px 50px rgba(243,50,233,1);>"
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(robotDiv);
}
//Challenge 4:changing the color of all buttons
var all_buttons=document.getElementsByTagName('button');
var copyAllButtons=[];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

console.log(copyAllButtons);

function buttonColorChange(buttonThingy){
    if(buttonThingy.value==='red'){
        buttonsRed();
    }
    else if(buttonThingy.value==='green'){
        buttonsGreen();
    }
    else if(buttonThingy.value==='reset'){
        buttonsColorReset();
    }
    else if(buttonThingy.value==='random'){
        randomColors();
    }
}

function buttonsRed(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
function buttonsGreen(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
function buttonsColorReset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}
function randomColors(){
    var choices=['btn-primary','btn-danger','btn-success','btn-warning']
    
    for(let i=0;i<all_buttons.length;i++){
        let randomNumber=Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomNumber]);
    }

}

let blackjackGame={
    "you": {'scorespan':"#your-blackjack-result","div":"#your-box","score":0},
    "dealer": {'scorespan':"#dealer-blackjack-result","div":"#dealer-box","score":0},
    "cards": ['2','3','4','5','6','7','8','9','10','K','J','Q','A'],
    "cardsMap":{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'K':10,'J':10,'A':[1,11],'Q':10},
    "wins":0,
    "losses":0,
    "draws":0,
    "isstand":false,
    "turnsover":false,
};

const YOU=blackjackGame['you'];
const DEALER=blackjackGame['dealer'];

const hitsound=new Audio('static/sounds/swish.m4a');
const winsound=new Audio('static/sounds/cash.mp3');
const lostsound=new Audio('static/sounds/aww.mp3');
document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click',blackjackDeal);

function blackjackHit(){
    if(blackjackGame['isstand']===false){
        let card=randomCard();
        showCard(card,YOU);
        updateScore(card,YOU);
        showScore(YOU);
    }
} 
function randomCard(){
    let randomIndex=Math.floor(Math.random()*13);
    return blackjackGame['cards'][randomIndex];
}

function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
        let cardImage=document.createElement('img');
        cardImage.src=`static/images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitsound.play();
    }
}

function blackjackDeal(){
    if(blackjackGame['turnsover']===true){
        blackjackGame['isstand']=false;
        let yourImages=document.querySelector('#your-box').querySelectorAll('img');
        let dealerImages=document.querySelector('#dealer-box').querySelectorAll('img');

        for(i=0;i<yourImages.length;i++){
            yourImages[i].remove();
        }
        for(i=0;i<dealerImages.length;i++){
            dealerImages[i].remove();
        }
        YOU['score']=0;
        DEALER['score']=0;
        document.querySelector('#your-blackjack-result').textContent=0;
        document.querySelector('#dealer-blackjack-result').textContent=0;
        document.querySelector('#your-blackjack-result').style.color="#ffffff";
        document.querySelector('#dealer-blackjack-result').style.color="#ffffff";
        document.querySelector("#blackjack-result").textContent="Let's play";
        document.querySelector("#blackjack-result").style.color="black";
        blackjackGame['turnsover']=true;
}}
function updateScore(card,activePlayer){
    if(card==='A'){
        //if adding 11 keeps me below 21 add 11 otherwise add 1  
        if(activePlayer['score']+blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score']+=blackjackGame['cardsMap'][card][1];
    }
    else{
        activePlayer['score']+=blackjackGame['cardsMap'][card][0];    }
}else{
    activePlayer['score']+=blackjackGame['cardsMap'][card];
}
}

function showScore(activePlayer){
    if(activePlayer['score']>21){
        document.querySelector(activePlayer['scorespan']).textContent='BUST!';
        document.querySelector(activePlayer['scorespan']).style.color='red';

    }
    else{
    document.querySelector(activePlayer['scorespan']).textContent=activePlayer['score'];
}
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));

}
async function dealerLogic(){
    blackjackGame['isstand']=true;

    while(DEALER['score']<16 && blackjackGame['isstand']===true){
        let card=randomCard();
        showCard(card,DEALER);
        updateScore(card,DEALER);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame['turnsover']=true;
    let winner=computerWinner();
    showResult(winner);
}
//computer winner and return who just won
//update the wins losses and draws
function computerWinner(){
    let winner;
    if(YOU['score']<=21){
        //condition :Higher than the dealer or when dealer busts you're
        if(YOU['score']>DEALER['score']||(DEALER['score']>21)){
            blackjackGame['wins']++;
            winner=YOU;
        }
        else if(YOU['score']<DEALER['score']){
            blackjackGame['losses']++;
            winner=DEALER;
        } 
        else if(YOU['score']===DEALER['score']){
            blackjackGame['draws']++;
        }

    //condition:when user busts but dealer doesn't busts
    }
    else if(YOU['score']>21 && DEALER['score']<=21){
        blackjackGame['losses']++;
        winner=DEALER;
    }
    //condition:when you and dealer bursts
    else if(YOU['score']>21 && DEALER['score']>21){
        blackjackGame['draws']++;
    }
    console.log(blackjackGame);
    return winner;
}
function showResult(winner){
    let message,messageColor;
    if(blackjackGame['turnsover']=== true){
    if(winner===YOU){
        document.querySelector('#wins').textContent=blackjackGame['wins'];
        message='You won!';
        messageColor='green';
        winsound.play();
    }
    else if(winner===DEALER){
        document.querySelector('#losses').textContent=blackjackGame['losses'];
        message='You lost!';
        messageColor='red';
        lostsound.play();
    }
    else{
        document.querySelector('#draws').textContent=blackjackGame['draws'];
        message='You drew!';
        messageColor='black';
    }
    document.querySelector("#blackjack-result").textContent=message;
    document.querySelector("#blackjack-result").style.color=messageColor;
}
}