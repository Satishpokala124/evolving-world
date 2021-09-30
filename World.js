function World() {
	this.color;
	this.organisms = [];
	this.foods = [];
	this.poisons = [];
}

World.prototype.addOrganism = function(x, y) {
	var newO = new Organism(x, y);
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
	for (var i = 0; i < this.foods.length; i++) {
		this.foods[i].show();
	}
	for (var i = 0; i < this.poisons.length; i++) {
		this.poisons[i].show();
	}
	for (var i = 0; i < this.organisms.length; i++) {
		this.organisms[i].show();
	}
}

World.prototype.driveTo = function(target) {
	for (var i = 0; i < this.organisms.length; i++) {
		this.organisms[i].driveTo(target.copy());
	}
}

World.prototype.bound = function() {
	for (var i = 0; i < this.organisms.length; i++) {
		this.organisms[i].bound();
	}
}

World.prototype.hunt = function() {
	foods = this.foods;
	for (var i = 0; i < this.organisms.length; i++) {
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

World.prototype.simulate = function() {
	for (var i = 0; i < this.organisms.length; i++) {
		this.organisms[i].simulate();
	}
	// for (var i = 0; i < this.food.length; i++) {
	// 	this.food[i].simulate();
	// }
	// for (var i = 0; i < this.poison.length; i++) {
	// 	this.poison[i].simulate();
	// }
}