dim = {
    x: 600,
    y: 400
}
var bird1;
var pillers = [];
var isPillerRecentlyMadeTime = 0


function setup() {
    createCanvas(dim.x, dim.y)
    bird1 = new bird(dim.x,dim.y)
}

function draw() {
  background(255)
  bird1.draw()
  if(pillers.length < 4 && isPillerRecentlyMadeTime < 0){
    p = new piller(1)
    pillers.push(p)
    isPillerRecentlyMadeTime = 100
  }
  isPillerRecentlyMadeTime--
  pillers.forEach(p => {
      p.draw()
  });

  pillers.forEach(function(p, index, object){
    if(p.pos.x < -80){
      object.splice(index,1)
    }
  });

  pillers.forEach(piller => {
    var hit1 = false;
    var hit2 = false;
    hit1 = collideRectCircle(piller.pos.x,piller.pos.y,piller.width,piller.height,bird1.pos.x,bird1.pos.y,bird1.hw);
    hit2 = collideRectCircle(piller.pos.x,0,piller.width,piller.pos.y - piller.space,bird1.pos.x,bird1.pos.y,bird1.hw);
    if(bird1.pos.y < 0){
      gameOver();
      return ""  
    }
    if(hit1 || hit2){
      gameOver();
      return ""  
    }
  });
  
  // gameOver();
}

function gameOver(){
  noLoop()
  fill(0,150)
  rect(0,0,dim.x,dim.y)
  fill(255)
  textAlign(CENTER)
  textSize(45)
  textFont('Georgia');
  textStyle(BOLD);
  text("Game Over :(",dim.x/2,dim.y/2);
}

function keyPressed() {
  if(keyCode === 32){
    bird1.addBounce()
  }
}