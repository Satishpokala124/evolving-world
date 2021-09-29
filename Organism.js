
function Organism(x, y) {
	this.pos = createVector(x, y);
	this.vel = createVector(2, 2);
	this.acc = createVector(0, 0);
	this.maxVel = 5;
	this.maxAcc = 0.5;
	this.health = 10;
	this.size = 20;
	this.foodAttract = 0;
	this.poisonRepel = 0;
}

Organism.prototype.show = function() {
	var x = this.pos.x;
	var y = this.pos.y;
	var p1 = [0, -2*this.size];
	var p2 = [-this.size/2, this.size/2];
	var p3 = [this.size/2, this.size/2];

	var theta = this.vel.heading()+PI/2;
	push();
	translate(x, y);
	rotate(theta);
	fill(255, 0, 0);
	triangle(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
	pop();
}

Organism.prototype.force = function(force) {
	this.acc = force;
}

Organism.prototype.driveTo = function(target) {
	var reqVel = target.sub(this.pos);
	reqVel.normalize();
	reqVel.mult(this.maxVel);
	var reqAcc = reqVel.sub(this.vel);
	reqAcc.limit(this.maxAcc);
	this.force(reqAcc);
	// reqVel1.html("reqVel : (" +  round(reqVel.x, 3) + ", " + round(reqVel.y, 3) + ")");
	// reqAcc1.html("reqAcc : (" +  round(reqAcc.x, 3) + ", " + round(reqAcc.y, 3) + ")");
}

Organism.prototype.bound = function() {
	
}

Organism.prototype.simulate = function() {
	this.vel.add(this.acc);
	this.vel.limit(this.maxVel);
	this.pos.add(this.vel);
	// this.acc.mult(0);
}

