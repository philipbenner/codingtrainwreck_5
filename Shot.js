function Shot(_x, _y, _d){
	this.x = _x;
	this.y = _y;
	this.size = 10;
	this.speed = 5;

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
	this.y = this.y - this.speed;
}