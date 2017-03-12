function BoundaryElevator(x, y, w, h, speed) {
  var options = {
    isStatic: true
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.counter = y;
  this.speed = speed;
  this.w = w;
  this.h = h;
  World.add(world, this.body);
}

BoundaryElevator.prototype.show = function() {
  fill(255);
  stroke(255);
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  rectMode(CENTER);
  rect(0, 0, this.w, this.h);
  pop();
}

BoundaryElevator.prototype.update = function() {
  this.counter += this.speed;
  var pos = this.body.position;
  //console.log(height-this.counter);
  Body.setPosition(this.body, { x: pos.x, y: height-this.counter });
  if (this.counter >= height){
    this.counter = 0;
  }

}
