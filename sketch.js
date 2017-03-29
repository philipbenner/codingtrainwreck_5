var shipRow = 6; //
var shipCol = 4; //  zero based  and the names are backwards.. 

var game = {
	ship : null,
	shots : [],
	aliens : [],
	aDir : 1
};


function setup() {
	//frameRate(30);
	createCanvas(600, 400);
	game.ship = new Ship(this);
	//game.ship.init();

	for (var c = shipCol-1; c >= 0; c--){
		for (var a = shipRow-1; a >= 0; a--){
			var mod = c % 2;
			var tempA = new Alien(a,c,this,mod);
			game.aliens.push(tempA);
		}
	}
}

function draw() {
  	background(230, 230, 250);
  	checkKeyDown();
  	for(var i = game.shots.length-1; i >= 0; i--){
  		game.shots[i].show();
  		game.shots[i].move();
  		if (game.shots[i].testLoc() ){
  			game.shots.splice(i, 1);
  		}
  		// test here for hits to aliens?
  		//nested loop 
  	}
  	//
	for (var i = game.aliens.length-1; i >= 0; i--){
  		game.aliens[i].move();
	  	game.aliens[i].draw();
	}

  	game.ship.show();	
  	checkAllExtents()
  	
}

function checkKeyDown() {

	if( keyIsDown(LEFT_ARROW) ){
		game.ship.shipEvent('left');
	} else if( keyIsDown(RIGHT_ARROW) ){
		game.ship.shipEvent('right');
	}
	
}

function keyPressed (){
	if(keyCode == 32){
		game.ship.shipEvent('shot');
	}
}

function bullet (from,to){
	var b = new Shot(from.x, from.y, to);
	game.shots.push(b);
}

function checkAllExtents(){
	var change = false;
	var fireOnce = true

	for (var i = game.aliens.length-1; i >= 0; i--){
  		var check = game.aliens[i].checkExtents();
  		if (check){
  			change = true;
  		}
	}

	if(change){
		if(game.aDir){
			game.aDir = 0;
		}else {
			game.aDir = 1;	
		}
		
		for (var i = game.aliens.length-1; i >= 0; i--){
			game.aliens[i].dir = game.aDir;
			
		}
	}
}

