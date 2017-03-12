
function BoundaryMove(x, y, w, h, speed) {
  var options = {
    isStatic: true,
    //force: {x:1,y:0}
    restitution: 0.5,
    friction: 0.2,
    density: 0.7,

  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.counter = -1;
  this.speed = speed;
  this.w = w;
  this.h = h;
  World.add(world, this.body);
}

BoundaryMove.prototype.show = function() {
  fill(255);
  stroke(255);
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  rectMode(CENTER);
  rect(0, 0, this.w, this.h);
  pop();
}

BoundaryMove.prototype.update = function() {

  this.counter += this.speed;

//  Body.applyForce(this.body,{x:0,y:-2},{x:0,y:-2});
  var pos = this.body.position;
  var px = 350 + 100 * Math.sin(this.counter);
  //console.log(px - pos.x);

  Body.setVelocity(this.body, { x: px - pos.x , y: 0 });
  Body.setPosition(this.body, { x: px, y: pos.y });

//  Body.setPosition(this.body, { x: 1 , y: 0 });

}
