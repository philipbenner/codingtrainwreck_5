

var game = {
	ship : null,
	shots : []

};


function setup() {
	//frameRate(30);
	createCanvas(600, 400);
	game.ship = new Ship(this);
	//game.ship.init();
}

function draw() {
  	background(230, 230, 250);
  	checkKeyDown();
  
	//if(game.shots.length > 0){
	  	for(var i = game.shots.length-1; i >= 0; i--){
	  		game.shots[i].show();
	  		game.shots[i].move();
	  	}	
	//}
  	game.ship.show();
  	
  	
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
	console.log('butllet',from.x , to);
	var b = new Shot(from.x, from.y);
	game.shots.push(b);
}
