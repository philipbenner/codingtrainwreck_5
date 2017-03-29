var shipRow = 6; //
var shipCol = 4; //  zero based  and the names are backwards.. 

var game = {
	ship : null,
	shots : [],
	aliens : [],
	aDir : 1,
	state : true,
	shotInterval : null
};


function setup() {

	createCanvas(600, 400);
	game.ship = new Ship(this);

	for (var c = shipCol-1; c >= 0; c--){
		for (var a = shipRow-1; a >= 0; a--){
			var mod = c % 2;
			var tempA = new Alien(a,c,this,mod);
			game.aliens.push(tempA);
		}
	}

	game.shotInterval = setInterval(alienFireCon, 1000);
}

function draw() {
	//console.log(game.state)
  	background(230, 230, 250);
  	

  	
  	checkKeyDown(); 
  	
  	for(var i = game.shots.length-1; i >= 0; i--){
  		var shot = game.shots[i];
  		shot.show();
  		shot.move();
  		
  		var removeShot = false;
  		if ( shot.testLoc() ){
			removeShot = true;
  		}
  		if(shot.dir == 0){
  		for (var ii = game.aliens.length-1; ii >= 0; ii--){
  			var dis = dist(shot.x, shot.y, game.aliens[ii].x, game.aliens[ii].y);
  			//friendly fire  - alien down

	  			if(dis < game.aliens[ii].r/2){
	  				removeShot =  true;
					game.aliens.splice(ii, 1);
	  			}
  			}
  		} else if (shot.dir == 1){
  			var dis = dist(shot.x, shot.y, game.ship.x, game.ship.y);
  			if(dis < game.ship.dimensions[0]){
	  				removeShot =  true;
					game.state = false;
	  			}
  		}
  		

  		if (removeShot) {
  			game.shots.splice(i, 1);
  		}
  		
  	}

	for (var al = game.aliens.length-1; al >= 0; al--){
		if(game.state){
  			game.aliens[al].move();
  		}
	  	game.aliens[al].draw();
	}
	checkAllExtents();


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

function alienFireCon (){
	
	if(game.aliens.length > 0){
		console.log('fire')
		var who = Math.floor(random(game.aliens.length -1));
		
			game.aliens[who].fire();
		
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

  		switch (check){
  			case 'left':
  			case 'right':
	  			change = true;
	  			break;
  			case 'over':
	  			clearInterval(game.shotInterval);
	  			game.state = false;
	  			break;
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
			game.aliens[i].y = game.aliens[i].y +game.aliens[i].drop;
			
		}
	}
}

