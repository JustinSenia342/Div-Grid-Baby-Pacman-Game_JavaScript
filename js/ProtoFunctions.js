//loading image array with 0=bgcolor, 1=baby, 2=cheerio, 3=marshmallow
var imageArray = new Array();
imageArray[0] = new Image();
imageArray[0].src ="http://psacake.com/web/dots/CCFFCC.gif";
imageArray[1] = new Image();
imageArray[1].src ="./src/baby.jpg";
imageArray[2] = new Image();
imageArray[2].src ="./src/cheerio.jpg";
imageArray[3] = new Image();
imageArray[3].src ="./src/marshmallow.jpg";

var rows; //used for grid creation
var cols; //used for grid creation
var s;		   //constructed grid string is stored here
var id;		   //used to give each created cell a coordinate ID
var cheerioX = 0;			//stores random X coordinate for cheerio instance
var cheerioY = 0;			//stores random Y coordinate for cheerio instance
var marshmallowX = 0;		//stores random X coordinate for marshmallow instance
var marshmallowY = 0;		//stores random Y coordinate for marshmallow instance
var cheerio;				//target element location for cheerio placement
var marshmallow;			//target element location for marshmallow placement
var babyX = 0;				//stores X coordinate for baby location
var babyY = 0;				//stores Y coordinate for baby location
var baby;					//target element location for baby
var babyLoc = "0-0";		//string that stores baby coordinates
var treatRandCheerio;		//stores cheerio probability information
var treatRandMarshmallow;	//stores marshmallow probability information
var treatTimer;				//Interval Timer Variable
var gameTimer;				//Timeout Timer Variable
var score = 0;				//Total Score
var scoreDisplay;			//target element location for score tracking
var audio = new Audio('./src/crunch.mp3'); //audio variable that plays a sound effect
var babyEat = "";

//createGrid uses javascript for loops in order to construct a string that
//will be used as html to make a grid that will be used as the game board.
function createGrid () {
	rows = 20; //num of rows
	cols = 20; //num of columns
	
	s = "<table>";
	for (var i=0; i<rows; i++) {
		s += "<tr> ";
		for (var j=0; j<cols; j++) {
			id = i + "-" + j;
			s += "<td> <img src=' " + imageArray[0].src +
				"' " +
				" id ='" + id + "' " +
				" height='25' width='25' ></td>";
		}
		s += "<tr>";
	}
	s += "</table>";
	document.write(s);
	document.write("<br /> <br />");
	id = 0 + "-" + 0;
}

//throwTreats uses Math.floor(Math.random()) nested functions to calculate the probability of
//either a cheerio or marshmallow being thrown (cheerio=1/3 chance, marshmallow=1/5 chance) 
//and if deemed to be thrown, it will calculate coordinates with the same floor and rand
//functions, and set the target location on the grid to have the right picture.
//if target location is the same as baby location it will recalculate the coordinates
function throwTreats(){

treatRandCheerio = (Math.floor(Math.random() * 3));
treatRandMarshmallow = (Math.floor(Math.random() * 5));

if (treatRandCheerio === 0){
	cheerioX = (Math.floor(Math.random() * 20));
	cheerioY = (Math.floor(Math.random() * 20));
	
	while (cheerioX == babyX && cheerioY == babyY) {
		cheerioX = (Math.floor(Math.random() * 20));
		cheerioY = (Math.floor(Math.random() * 20));
	}
		
	cheerio = document.getElementById(cheerioY + "-" + cheerioX);
	cheerio.src = imageArray[2].src;
}

if (treatRandMarshmallow === 0){
	marshmallowX = (Math.floor(Math.random() * 20));
	marshmallowY = (Math.floor(Math.random() * 20));
	
	while (marshmallowX == babyX && marshmallowY == babyY) {
		marshmallowX = (Math.floor(Math.random() * 20));
		marshmallowY = (Math.floor(Math.random() * 20));
	}
	
	marshmallow = document.getElementById(marshmallowY + "-" + marshmallowX);
	marshmallow.src = imageArray[3].src;
}

}

//setInitialBabyLocation sets the initial baby location on the gameboard (used after
//gameboard has already been created) to the correct picture, also makes sure
//baby cordinates are synched up before the game starts by making sure the baby is at
//"0-0"
function setInitialBabyLocation(){
	baby = document.getElementById("0-0");
	babyLoc = babyY + "-" + babyX;
	baby.src = imageArray[1].src;
}

//eatTreat is a function to determine if the baby just moved over a treat, and if she did
//it increments the score by the respective amount (based on kind of treat) and plays a crunch
//sound
function eatTreat(babyEat){
	if(babyEat == imageArray[2].src){
		score = score + 1;
		audio.play();
	}
	else if (babyEat == imageArray[3].src){
		score = score + 100;
		audio.play();
	}
}

//listens for keypresses, and then based on the key pressed (up,right,down,left) it
//attemps to move the baby in the respective direction. initially it checks to see if
//the baby is already at a wall of the playpen, and then does nothing if she is told to
//move in the walls direction. otherwise it updates the coordinate variables, determines
//if the new location has a treat on it or not, then moves the baby to the new location.
//by changing the previous baby location to a blank tile and the new location to a baby icon.
function babyMove(keyIn){
	keyIn = keyIn || window.event;
	baby = document.getElementById(babyY + "-" + babyX);
	scoreDisplay = document.getElementById("ScoreTotalBox");


	if (keyIn.keyCode == '37') {
//				alert("left"); //left
		if (babyX === 0){
		"";}
		else{
			babyX = babyX - 1;
			babyLoc = babyY + "-" + babyX;
			baby.src = imageArray[0].src;
			baby = document.getElementById(babyLoc);
			eatTreat(baby.src);
			baby.src = imageArray[1].src;
		}
	}
	else if (keyIn.keyCode == '38') {
//				alert("up"); //up
		if (babyY === 0){
		"";}
		else{
			babyY = babyY - 1;
			babyLoc = babyY + "-" + babyX;
			baby.src = imageArray[0].src;
			baby = document.getElementById(babyLoc);
			eatTreat(baby.src);
			baby.src = imageArray[1].src;
		}
	}
	else if (keyIn.keyCode == '39') {
//				alert("right"); //right
		if (babyX == 19){
		"";}
		else{
			babyX = babyX + 1;
			babyLoc = babyY + "-" + babyX;
			baby.src = imageArray[0].src;
			baby = document.getElementById(babyLoc);
			eatTreat(baby.src);
			baby.src = imageArray[1].src;
		}
	}
	else if (keyIn.keyCode == '40') {
//				alert("down"); //down
		if (babyY == 19){
		"";}
		else{
			babyY = babyY + 1;
			babyLoc = babyY + "-" + babyX;
			baby.src = imageArray[0].src;
			baby = document.getElementById(babyLoc);
			eatTreat(baby.src);
			baby.src = imageArray[1].src;
		}
	}
	scoreDisplay.value = score;
}

//clears the game timer and the interval timer and alerts the user with a
//"Game over" then displays their score		
function endGame() {
	clearTimeout(gameTimer);
	clearInterval(treatTimer);
	alert("GAME OVER! You Scored: " + score);
}