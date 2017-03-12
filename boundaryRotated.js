
function BoundaryRotated(x, y, w, h, angle) {
  var options = {
    isStatic: true,
    angle: Math.PI * angle
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  this.angle = angle;
  World.add(world, this.body);
}

BoundaryRotated.prototype.show = function() {
  fill(255);
  stroke(255);
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  rotate(Math.PI * this.angle);
  rectMode(CENTER);
  rect(0, 0, this.w, this.h);
  pop();
}
