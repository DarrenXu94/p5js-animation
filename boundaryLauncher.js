function BoundaryLauncher(x, y, w, h, speed, right_to_left) {
  var options = {
    isStatic: true,
    density: 1,

  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.counter = 0;
  this.speed = speed;
  this.w = w;
  this.h = h;
  this.right_to_left = right_to_left;
  World.add(world, this.body);
}

BoundaryLauncher.prototype.show = function() {
  fill(255);
  stroke(255);
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  rectMode(CENTER);
  rect(0, 0, this.w, this.h);
  pop();
}

BoundaryLauncher.prototype.update = function() {
  var pos = this.body.position;
  //console.log(height-this.counter);
  if (this.counter < 10){
    var movement = map(this.counter, 0, 10, 0, 10);
    this.counter += this.speed;

  } else if (this.counter < 20 && this.counter >= 10) {
    var movement = map(this.counter, 0, 10, 10, 0);
    this.counter += this.speed;

  } else {
    //pos.x = width - 50;
    this.counter = 0;
    var movement = 0;
  }
  if (this.right_to_left){
    Body.setPosition(this.body, { x: pos.x - movement, y: pos.y });

  }else {
    Body.setPosition(this.body, { x: pos.x + movement, y: pos.y });

  }

}
