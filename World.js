function World() {
	this.organisms = [];
	this.foods = [];
	this.poisons = [];
	this.maxOrganisms = 50;
	this.minHealth = 0;
}

World.prototype.addOrganism = function(position, velocity, foodAttractDistance, poisonRepelDistance) {
	var newO = new Organism(position, velocity, foodAttractDistance, poisonRepelDistance);
	this.organisms.push(newO);
}

World.prototype.killOrganism = function(index) {
	this.organisms.splice(index, 1);
}

World.prototype.addFood = function(x, y) {
	var newF = new Particle(x, y, true);
	this.foods.push(newF);
}

World.prototype.addPoison = function(x, y) {
	var newP = new Particle(x, y, false);
	this.poisons.push(newP);
}


World.prototype.show = function() {
	for (var i = this.foods.length - 1; i >= 0; i--) {
		this.foods[i].show();
	}
	for (var i = this.poisons.length - 1; i >= 0; i--) {
		this.poisons[i].show();
	}
	for (var i = this.organisms.length - 1; i >= 0; i--) {
		this.organisms[i].show();
	}
}

World.prototype.driveTo = function(target) {
	for (var i = this.organisms.length - 1; i >= 0; i--) {
		this.organisms[i].driveTo(target.copy());
	}
}

World.prototype.driveAway = function(target) {
	for (var i = this.organisms.length - 1; i >= 0; i--) {
		this.organisms[i].driveAway(target.copy());
	}
}

World.prototype.bound = function() {
	for (var i = this.organisms.length - 1; i >= 0; i--) {
		this.organisms[i].bound();
	}
}

World.prototype.hunt = function() {
	foods = this.foods;
	organisms  = this.organisms;
	for (var i = organisms.length - 1; i >= 0; i--) {
		eaten = this.organisms[i].eat(foods);
		if (eaten > -1) {
			this.foods.splice(eaten, 1);
			var newF = new Particle(
				round(random(30, canvasWidth-30)),
				round(random(30, canvasHeight-30)), 
				true
			);
			this.foods.push(newF);
		}
	}
}

World.prototype.survive = function() {
	poisons = this.poisons;
	organisms = this.organisms;
	for (var i = organisms.length - 1; i >= 0; i--) {
		eatenPoison = organisms[i].saveFrom(poisons);
		if (eatenPoison > -1) {
			this.poisons.splice(eatenPoison, 1);
			var newP = new Particle(
				round(random(30, canvasWidth-30)),
				round(random(30, canvasHeight-30)), 
				false
			);
			this.poisons.push(newP);
		}
	}
}

World.prototype.simulate = function() {
	var newMinhealth = 100;
	for (var i = this.organisms.length - 1; i >= 0; i--) {
		if (this.organisms[i].alive) {
			if (this.organisms[i].matured) {
				this.organisms[i].health = 50;
				this.organisms[i].matured = false;
				this.addOrganism(
					this.organisms[i].pos, this.organisms[i].vel, 
					this.organisms[i].foodAttractDist, 
					this.organisms[i].poisonRepelDist
				);
				console.log("Birth");
			}
			this.organisms[i].simulate();
		} else {
			this.killOrganism(i);
		}
		if (this.maxOrganisms < this.organisms.length && this.minHealth == this.organisms[i].health) {
			 this.killOrganism(i); 
		}
		if (this.health <= newMinhealth) { newMinhealth = this.health; }
	}
	this.minHealth = newMinhealth;
	// for (var i = 0; i < this.food.length; i++) {
	// 	this.food[i].simulate();
	// }
	// for (var i = 0; i < this.poison.length; i++) {
	// 	this.poison[i].simulate();
	// }
}