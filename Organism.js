
function Organism(x, y) {
	this.pos = createVector(x, y);
	this.vel = createVector(random(-3, 3), random(-3, 3));
	this.acc = createVector(0, 0);
	this.maxVel = 5;
	this.maxAcc = 0.5;
	this.health = 100;
	this.size = 20;
	this.foodAttractDist = floor(random(20));
	this.poisonRepelDist = floor(random(20, 50));
	this.matured = false;
	this.alive = true;
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

Organism.prototype.applyForce = function(force) {
	this.acc.add(force);
}

Organism.prototype.bound = function() {
	var x = this.pos.x;
	var y = this.pos.y;
	if(x <= 30) {
		this.applyForce(createVector(this.maxAcc/2, 0));
	} else if (x >= canvasWidth-30) {
		this.applyForce(createVector(-this.maxAcc/2, 0));
	}
	if(y <= 30) {
		this.applyForce(createVector(0, this.maxAcc/2));
	} else if (y >= canvasHeight-30) {
		this.applyForce(createVector(0, -this.maxAcc/2));
	}
}

Organism.prototype.driveTo = function(target) {
	var reqVel = target.sub(this.pos);
	reqVel.normalize();
	reqVel.mult(this.maxVel);
	var reqAcc = reqVel.sub(this.vel);
	reqAcc.limit(this.maxAcc);
	this.applyForce(reqAcc);
}

Organism.prototype.driveAway = function(target) {
	var reqVel = this.pos.copy().sub(target);
	reqVel.normalize();
	reqVel.mult(this.maxVel);
	var reqAcc = reqVel.sub(this.vel);
	reqAcc.limit(this.maxAcc);
	this.applyForce(reqAcc);
}

Organism.prototype.closestParticle = function(particles) {
	var pos = this.pos.copy();
	var minDist = Infinity;
	var minIndex = -1;
	var dist = 0;
	for (var i = particles.length - 1; i >= 0; i--) {
		dist = pos.dist(particles[i].pos)
		if (dist < minDist) {
			minDist = dist;
			minIndex = i;
		}
	}
	return [minIndex, minDist];
}

Organism.prototype.eat = function(foods) {
	let [closestFood, dist] = this.closestParticle(foods);
	if (closestFood > -1) {
		this.driveTo(foods[closestFood].pos.copy());
	}
	if (dist <= this.size/2) {
		this.health += 10;
		if (this.health >= 100) { 
			this.health = 100;
			this.matured = true;
		 }
		return closestFood;
	} else {
		return -1;
	}
}

Organism.prototype.saveFrom = function(poisons) {
	let [closestPoison, dist] = this.closestParticle(poisons);
	if (closestPoison > -1 && dist<= this.poisonRepelDist) {
		this.driveAway(poisons[closestPoison].pos.copy());
	}
	if (dist <= this.size/2) {
		if (this.health <= 0) { 
			this.alive = false
		 }
		return closestPoison;
	} else {
		return -1;
	}
}

Organism.prototype.simulate = function() {
	this.vel.add(this.acc);
	this.vel.limit(this.maxVel);
	this.pos.add(this.vel);
	this.acc.mult(0);
}

