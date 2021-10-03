var world;
var canvasHeight;
var canvasWidth;
var p;
var O1;
var O2;
// var a = 0;
// var Mouse, Pos, Vel, reqVel1, Acc, reqAcc1;

function setup() {
	canvasHeight = min(windowHeight-30, 1000);
	canvasWidth = min(windowWidth-30, 1500);
	createCanvas(canvasWidth, canvasHeight);
	background(10, 10, 10);
	world = new World();
	for (var i = 0; i < 5; i++) {
		world.addOrganism();
	}

	for (var i = 0; i < 50; i++) {
		world.addFood(
			round(random(30, canvasWidth-30)),
			round(random(30, canvasHeight-30))
		);
	}

	for (var i = 0; i < 40; i++) {
		world.addPoison(
			round(random(30, canvasWidth-30)),
			round(random(30, canvasHeight-30))
		);
	}
	// Mouse = createElement('h2', 'Mouse');
	// Pos = createElement('h2', 'Pos');
	// Vel = createElement('h2', 'Vel');
	// reqVel1 = createElement('h2', 'reqVel');
	// Acc = createElement('h2', 'Acc');
	// reqAcc1 = createElement('h2', 'reqAcc');
	// Mouse.style('color', 'black');
	// Pos.style('color', 'black');
	// Vel.style('color', 'black');
	// Acc.style('color', 'black');
	// Mouse.position(canvasWidth + 50, windowHeight/2-100);
	// Pos.position(canvasWidth + 50, windowHeight/2-50);
	// Vel.position(canvasWidth + 50, windowHeight/2);
	// reqVel1.position(canvasWidth + 50, windowHeight/2+50);
	// Acc.position(canvasWidth + 50, windowHeight/2+100);
	// reqAcc1.position(canvasWidth + 50, windowHeight/2+150);
}

function draw() {
	background(30);
	// fill(0, 0, 255);
	// circle(10, 10, 20);
	// circle(10, canvasHeight-10, 20);
	// circle(canvasWidth-10, 10, 20);
	// circle(canvasWidth-10, canvasHeight-10, 20);
	// circle(mouseX, mouseY, 20);
	// p.set(mouseX, mouseY);
  // world.driveTo(p);
	// if (O1.pos.dist(p.pos) <= 100) {
	// 	O1.driveAway(p.pos.copy());
	// 	console.log("pos -> ", O1.pos);
	// 	console.log("vel -> ", O1.vel);
	// 	console.log("acc -> ", O1.acc);
	// 	a = 1;
	// }
	// if(a == 1) {
	// 	console.log("pos -> ", O1.pos);
	// 	console.log("vel -> ", O1.vel);
	// 	console.log("acc -> ", O1.acc);
	// 	a = 0;
	// }
	world.hunt();
	world.survive();
	world.bound();
	world.simulate();
	world.show();
	// p.show();
	// world.show();
	// Mouse.html("Mouse : (" +  round(mouseX, 3) + ", " + round(mouseY, 3) + ")");
	// Pos.html("Pos : (" +  round(O.pos.x, 3) + ", " + round(O.pos.y, 3) + ")");
	// Vel.html("Vel : (" +  round(O.vel.x, 3) + ", " + round(O.vel.y, 3) + ")");
	// Acc.html("Acc : (" +  round(O.acc.x, 3) + ", " + round(O.acc.y, 3) + ")");
}