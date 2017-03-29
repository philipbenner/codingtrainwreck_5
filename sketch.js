var shipRow = 6; //
var shipCol = 4; //  zero based  and the names are backwards.. 

var game = {
	ship : null,
	shots : [],
	aliens : [],
	aDir : 1,
	state : true
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
		  		var shot = game.shots[i];
		  		shot.show();
		  		if(game.state){
		  			shot.move();
		  		}
		  		var removeShot = false;
		  		if (shot.testLoc() ){
					removeShot = true;
		  		}
		  		// i want to revisit this to try to one line it
		  		if(game.state){
			  		for (var ii = game.aliens.length-1; ii >= 0; ii--){
			  			var dis = dist(shot.x, shot.y, game.aliens[ii].x, game.aliens[ii].y);
			  			if(dis < game.aliens[ii].r/2){
			  				removeShot =  true;
							game.aliens.splice(ii, 1);
			  			}
			  		}
		  		}

		  		if (removeShot) {
		  			game.shots.splice(i, 1);
		  		}
		  		

		  		// test here for hits to aliens?
		  		//nested loop 
		  	}
		  	//
			for (var i = game.aliens.length-1; i >= 0; i--){
		  		if(game.state){
		  			game.aliens[i].move();
		  		}
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

	for (var i = game.aliens.length-1; i >= 0; i--){
  		var check = game.aliens[i].checkExtents();
  		//console.log(check)
  		switch (check){
  			case 'left':
  			case 'right':
	  			change = true;
	  			break;
  			case 'over':
	  			//console.log('gameover')
	  			game.state = false;
	  			break;
  		}
  		/*if (check){
  			change = true;
  		}*/
	}

	if(change){
		if(game.aDir){
			game.aDir = 0;
		}else {
			game.aDir = 1;	
		}
		
		for (var i = game.aliens.length-1; i >= 0; i--){
			game.aliens[i].dir = game.aDir;
			game.aliens[i].y = game.aliens[i].y +game.aliens[i].drop;
			
		}
	}
}

