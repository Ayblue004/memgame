document.addEventListener('DOMContentLoaded', ()=>{
	const imageArray = [
{
	name: "bus",
	image: "images/bus.png"
},
{
	name: "bus",
	image: "images/bus.png"
},
{
	name: "casino",
	image: "images/casino.png"
},
{
	name: "casino",
	image: "images/casino.png"
},
{ 
	name: "coconut",
	image: "images/coconut.png"
},
{ 
	name: "coconut",
	image: "images/coconut.png"
},
{
	name: "globe",
	image: "images/globe.png"
},
{
	name: "globe",
	image: "images/globe.png"
},
{
	name: "house",
	image: "images/house.png"
},
{
	name: "house",
	image: "images/house.png"
},
{
	name: "sword",
	image: "images/sword.png"
},
{
	name: "sword",
	image: "images/sword.png"
}
]
const close =()=> {
    var audio = new Audio('close.mp3');
    audio.loop = false;
    audio.play(); 
}
const open =()=> {
    var audio = new Audio('open.mp3');
    audio.loop = false;
    audio.play(); 
}
const correct =()=> {
    var audio = new Audio('correct.mp3');
    audio.loop = false;
    audio.play(); 
}
const won =()=> {
    var audio = new Audio('won.mp3');
    audio.loop = false;
    audio.play(); 
}
 imageArray.sort(()=> 0.5 - Math.random() );
theTime = document.getElementById('timeNorms');
theScore = document.getElementById('scoreNorms');
var x = 0;
var root = document.getElementById('root');
var container = document.getElementById('container');
//check for a match
var matchName =[]
var matchId = []
var cardsWon =[]
function checkForMatch(){
const theImage= document.querySelectorAll('img');
const firstPicked = matchName[0];
const secondPicked = matchName[1];
const matchId1 = matchId[0];
const matchId2 = matchId[1];
if(firstPicked == secondPicked && matchId1 != matchId2){
 theImage[matchId1].setAttribute('src', 'images/blank.png');
 theImage[matchId2].setAttribute('src', 'images/blank.png');
 theImage[matchId2].removeEventListener('click',flipcard);
 theImage[matchId1].removeEventListener('click', flipcard);
 cardsWon.push(matchName);
 setTimeout(correct,300);
}else{
	theImage[matchId1].setAttribute('src', 'images/background.png');
	theImage[matchId2].setAttribute('src', 'images/background.png');
	setTimeout(close, 300);
}
matchName= [];
matchId = [];
if(cardsWon.length == imageArray.length/2){
	let prompt = document.getElementById("prompt");
    prompt.style.display ="block";
 clearInterval(timer);
	theScore.innerText = calcScore();
	won();
}
}

//scoring

//count trials 
let trial = 0;
const countTries=()=>{
	let tries = document.getElementById('triesNorms');
	let addIt=()=> trial++
 if (matchName.length < 1){
 	addIt();
 }
 tries.innerText = trial;
}

//timing
function time(){
 x+=1;
 theTime.innerText = x;
 return x;
}
const calcScore=()=>{
let theTrials = trial
let theTime = time();
let tries1 = 6;
let time1 = 10;
if (theTime <= time1 ) {
	return 1000
}
else if (theTime + theTrials/2 < 100){
 let calc1 = (theTime + theTrials) / 2;
let calc2 = calc1 * 10;
let calc3 = 1000 - calc2;
return Math.round(calc3);
}else if (theTime + theTrials/2 > 100){
	let calc4 = theTime+theTrials /2
 return Math.round(calc4);
}
}
// create images
function createImage() {
	for(i=0; i< imageArray.length; i++){
    var image = document.createElement('img')
    image.setAttribute("src", "images/background.png");
    image.setAttribute("height", "150px");
    image.setAttribute("data-Id", i);
    image.setAttribute("width", "136px");
     image.addEventListener("click", flipcard);
     image.addEventListener('click', open);
    container.appendChild(image);
	}
}



// flip the card 
function flipcard(){
var cardLink = this.getAttribute('data-Id');
this.setAttribute('src', imageArray[cardLink].image);
const card = imageArray[cardLink].name
matchName.push(card);
matchId.push(cardLink);
if(matchName.length== 2){
	setTimeout(checkForMatch, 200);
	setTimeout(countTries,200);
}
}
createImage();
const timer = setInterval(time,1000);
})