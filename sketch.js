// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Plinko
// Video 1: https://youtu.be/KakpnfDv_f0
// Video 2: https://youtu.be/6s4MJcUyaUE
// Video 3: https://youtu.be/jN-sW-SxNzk
// Video 4: https://youtu.be/CdBXmsrkaPs

// module aliases
var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies,
  Body = Matter.Body;


var engine;
var world;
var particles = [];
var bounds = [];
var boundsR = [];
var boundsM = [];
var boundsE = [];
var boundsL = [];


var cols = 11;
var rows = 10;

function preload() {
  //ding = loadSound('ding.mp3');
}

function setup() {
  createCanvas(600, 700);
  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;
  //world.gravity.y = 2;

  function collision(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
      var labelA = pairs[i].bodyA.label;
      var labelB = pairs[i].bodyB.label;
      if (labelA == 'particle' && labelB == 'plinko') {
        //ding.play();
      }
      if (labelA == 'plinko' && labelB == 'particle') {
        //ding.play();
      }
    }
  }

  Events.on(engine, 'collisionStart', collision);

  //newParticle();
  var spacing = width / cols;

  var b = new Boundary(width / 2, height , width, 100);
  bounds.push(b);
  var leftB = new Boundary(0, height/2 , 2, height);
  bounds.push(leftB);
  var rightB = new Boundary(width, height/2 , 2, height);
  bounds.push(rightB);

  for (var i = 0; i < cols + 2; i++) {
    var x = i * spacing;
    var h = 100;
    var w = 10;
    var y = height - h / 2;
    var b = new Boundary(x, y, w, h);
    bounds.push(b);

  }

	//Darren added
  // First slope
	var slope = new BoundaryRotated(100,100,400,20,0.03);
	boundsR.push(slope);

  var slope2 = new BoundaryRotated(100,300,220,20,0.06);
	boundsR.push(slope2);

  var slope2 = new BoundaryRotated(100,350,220,20,-0.06);
	boundsR.push(slope2);

  // First container
  var cont1 = new Boundary(350,200,70,10);
  bounds.push(cont1);
  var cont2 = new Boundary(320,180,10,30);
  bounds.push(cont2);
  var cont3 = new Boundary(380,180,10,30);
  bounds.push(cont3);

  // Second container
  var cont4 = new Boundary(270,400,90,10);
  bounds.push(cont4);
  var cont5 = new Boundary(230,380,10,30);
  bounds.push(cont5);
  var cont6 = new Boundary(310,380,10,30);
  bounds.push(cont6);

  var move1 = new BoundaryMove(150,300,200,20,0.014);
  boundsM.push(move1);

  var move2 = new BoundaryMove(150,450,200,20,0.03);
  boundsM.push(move2);

  var move3 = new BoundaryMove(10,350,20,170,0.06);
  boundsM.push(move3);

  var move4 = new BoundaryMove(10,200,20,40,0.045);
  boundsM.push(move4);

  // Elevator
  var elevator1 = new BoundaryElevator(width-20,height,60,20,2);
  boundsE.push(elevator1);

  var elevator2 = new BoundaryElevator(width-20,height/2,60,20,2);
  boundsE.push(elevator2);

  // Launcher
  var launch = new BoundaryLauncher(width,50,20,60,0.5, true);
  boundsL.push(launch);

  var launch2 = new BoundaryLauncher(0,height-150,20,100,0.5,false);
  boundsL.push(launch2);

}

function newParticle() {
  var p = new Particle(10, 0, 10);
  particles.push(p);
}

function draw() {
  background(0, 0, 0);
  if (frameCount % 60 == 0) {
    if (particles.length <= 20){
      newParticle();
    }
  }
  if (particles.length >= 20){
    engine.world.gravity.y = -0.5;
    setTimeout(function newFunc(){engine.world.gravity.y = 1;}, 3000)
  }
  Engine.update(engine, 1000 / 30);
  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
    if (particles[i].isOffScreen()) {
      World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    }
  }

  for (var i = 0; i < bounds.length; i++) {
    bounds[i].show();
  }

  for (var i = 0; i < boundsR.length; i++) {
    boundsR[i].show();
    //boundsR[i].testSpin();
  }

  for (var i = 0; i < boundsM.length; i++) {
    boundsM[i].show();
    boundsM[i].update();
  }
  for (var i = 0; i < boundsE.length; i++) {
    boundsE[i].show();
    boundsE[i].update();
  }

  for (var i = 0; i < boundsL.length; i++) {
    boundsL[i].show();
    boundsL[i].update();
  }
}
