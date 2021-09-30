
function Particle(x, y, isEdible) {
  this.pos = createVector(x, y);
  this.isEdible = isEdible;
}

Particle.prototype.show = function() {
  if (this.isEdible) {
    fill(0, 255, 0);
  } else {
    fill(255, 0, 0);
  }
  circle(this.pos.x, this.pos.y, 10);
}