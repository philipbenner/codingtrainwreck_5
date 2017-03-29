function Shot(_x, _y, _d){
	this.x = _x;
	this.y = _y;
	this.size = 10;
	this.speed = 5;
	this.dir = _d;

}

Shot.prototype.init = function (){

}

Shot.prototype.show = function (){
	//console.log('show')
	push();
	
	stroke(255);
	strokeWeight(2);
	translate(this.x,this.y);
	line(0,this.size,0,0);
	
	pop();

}
Shot.prototype.move = function (){
	if(this.dir == 0){
		// ship shooting up
		this.y = this.y - this.speed;
	} else if(this.dir == 1){
		// ship shooting up
		this.y = this.y + this.speed;
	}
	
}