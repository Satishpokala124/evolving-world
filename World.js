function World() {
	this.color;
	this.organisms = [];
	this.food = [];
	this.poison = [];
}

World.prototype.addOrganism = function(x, y) {
	var newO = new Organism(x, y);
	this.organisms.push(newO);
}

World.prototype.killOrganism = function(index) {
	this.organisms.splice(index, 1);
}

World.prototype.show = function() {
	for (var i = 0; i < this.organisms.length; i++) {
		this.organisms[i].show();
	}
	for (var i = 0; i < this.food.length; i++) {
		this.food[i].show();
	}
	for (var i = 0; i < this.poison.length; i++) {
		this.poison[i].show();
	}
}

World.prototype.driveTo = function(target) {
	for (var i = 0; i < this.organisms.length; i++) {
		this.organisms[i].driveTo(target.copy());
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