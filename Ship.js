function Ship (_g){
	this.dimensions = [20,40];
	this.speed = 5;
	this.x = width/2;
	this.y = height - this.dimensions[1];
	this.limits = 50;
	this.game = _g;

}
Ship.prototype.init = function (){
	// unused so far... 
}
Ship.prototype.show = function () {

	
	push();
	noStroke();
	///rectMode(CENTER); 
	fill(0,0,255);
	translate(this.x, this.y) ;
	ellipse(0, 0, this.dimensions[0], this.dimensions[1]);
	
	//rect(0,0,this.dimensions[0],this.dimensions[1]);
	
	pop();
}
Ship.prototype.shipEvent = function (evt){
	switch(evt){
		case "left":
			this.x = this.x - this.speed;
			break;
		case "right":
			this.x = this.x + this.speed;
			break;
		case "shot":
			this.game.bullet(this, 0);
			break;
	}

	if(this.x >= width-this.limits){
		this.x = width-this.limits;
	}
	if (this.x <= this.limits){
		this.x = this.limits;
	}
}