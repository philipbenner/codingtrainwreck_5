function Alien(_xi, _yi, _g, _o){
	this.r = 30;
	this.speed = 1;
	this.spacing  = [80,40];
	this.drop = 10;
	this.game = _g;
	this.xindex = _xi*this.spacing[0];
	this.yindex = _yi*this.spacing[1];
	//console.log(this.xindex)
	this.x = this.xindex;
	this.y = this.yindex + this.spacing[1]

	this.dir = 1; 
	//this.y = _y;
	this.offset = _o;
	if(this.offset ){
		this.x = this.x + (this.spacing[0]/2)
	}

}

Alien.prototype.init = function (){

}

Alien.prototype.move = function (){
	if(this.dir == 1){
		this.x = this.x + this.speed;
	} else if (this.dir == 0) {
		this.x = this.x - this.speed;
	}
	
}

Alien.prototype.draw = function (){
	push();
		noStroke();
		fill (255);
		translate (this.x, this.y);
		ellipse(0, 0, this.r, this.r);
	pop();
}

Alien.prototype.checkExtents = function (){
	//console.log(this.y)
	if(this.y > 320){
		//console.log(this.y)
		return 'over';
	}
	if(this.dir == 1 && this.x > width){
		return 'left';
	}
	if(this.dir == 0 && this.x < 0){
		return 'right';
	}
	
}

Alien.prototype.dropRow = function (d){
	this.d = d;
	//this.y += this.spacing;
}

Alien.prototype.fire = function () {
	this.game.bullet(this,1);
}