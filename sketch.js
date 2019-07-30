dim = {
    x: 600,
    y: 400
}
var activeBirds = [];
var birdsPopulation = 200;
var pillers = [];
var allBirds = []
var isPillerRecentlyMadeTime = 0
var birdImage
var pillertopImage
var pillerbottomImage
var gameover = false
var Stopcounter = -100
var bg
var speedBox

function setup() {
    var canvas = createCanvas(dim.x, dim.y)
    canvas.parent("#canvascontainer")
    
    bg = loadImage("image/background.jpg"); 
    birdImage = loadImage("image/bird.png"); 
    pillertopImage = loadImage("image/pillertop.png")
    pillerbottomImage = loadImage("image/pillerbottom.png")
    for(i=0;i<birdsPopulation;i++){
      activeBirds[i] = new Bird(dim.x,dim.y,birdImage)
      allBirds[i] = activeBirds[i]
    }
    speedBox = select('#speed')
}

function draw() {
  image(bg,0,0,dim.x,dim.y)
  timesFaster = select("#speed").value()
  speedBox.html(timesFaster)
  for(zzzz=0;zzzz<timesFaster;zzzz++){
    if(pillers.length < 4 && isPillerRecentlyMadeTime < 0){
      p = new piller()
      pillers.push(p)
      isPillerRecentlyMadeTime = 100
    }
    isPillerRecentlyMadeTime--
    pillers.forEach(function(p, index, object){
      if(p.pos.x == -10){
      }
      if(p.pos.x < -80){
        object.splice(index,1)
      }
    });
    pillers.forEach(piller => {
      piller.update()
    });
    activeBirds.forEach(bird => {
      bird.update()
      bird.think(pillers)
    });
    checkCollision() 
    if (activeBirds.length == 0) {
      nextGeneration();
    }
  }
  
  pillers.forEach(piller => {
    piller.draw()
  });
  activeBirds.forEach(bird => {
    bird.draw()
  });


}


// function keyPressed(){
//   if(keyCode == 32){
//     activeBirds.forEach(bird => {
//       bird.up()
//     });
//   }
// }


function checkCollision(){
  pillers.forEach(piller => {
    for(i=0;i<activeBirds.length;i++){
      b = activeBirds[i]
      var hit1 = false;
      var hit2 = false;
      hit1 = collideRectCircle(piller.pos.x,piller.pos.y,piller.width,piller.height,b.pos.x,b.pos.y,b.hw);
      hit2 = collideRectCircle(piller.pos.x,0,piller.width,piller.pos.y - piller.space,b.pos.x,b.pos.y,b.hw);
      // if(b.pos.y < 0){
      //   // gameOver();
      //   // return ""  
      // }
      if(b.pos.y + b.speed > 400-b.hw/2){
        activeBirds.splice(i,1)
      }else if(b.pos.y + b.speed < 0+b.hw/2){
        activeBirds.splice(i,1)
      }else if(hit1 || hit2){
        activeBirds.splice(i,1)
      }
    };
  });
}