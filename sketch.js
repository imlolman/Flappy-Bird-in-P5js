dim = {
    x: 600,
    y: 400
}
var bird1;
var pillers = [];
var isPillerRecentlyMadeTime = 0
var birdImage
var pillertopImage
var pillerbottomImage
var gameover = false
var Stopcounter = -100
var bg
var score = 0

function setup() {
    createCanvas(dim.x, dim.y)
    bg = loadImage("image/background.jpg"); 
    birdImage = loadImage("image/bird.png"); 
    pillertopImage = loadImage("image/pillertop.png")
    pillerbottomImage = loadImage("image/pillerbottom.png")
    bird1 = new bird(dim.x,dim.y,birdImage)
}

function draw() {
  image(bg,0,0,dim.x,dim.y)
  // background("#76a0ff")
  if(pillers.length < 4 && isPillerRecentlyMadeTime < 0){
    p = new piller(1,pillerbottomImage,pillertopImage)
    pillers.push(p)
    isPillerRecentlyMadeTime = 100
  }
  isPillerRecentlyMadeTime--
  pillers.forEach(p => {
      p.draw()
  });

  pillers.forEach(function(p, index, object){
    if(p.pos.x == -10){
      score++
    }
    if(p.pos.x < -80){
      object.splice(index,1)
    }
  });


  setscore()
  bird1.draw()
  if(gameover){
    gameOver()
  }else{
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
  }
}

function gameOver(){
  if(!gameover){
    gameover = true;
  }
  fill(0,150)
  rect(0,0,dim.x,dim.y)
  fill(255)
  textAlign(CENTER)
  textSize(45)
  textStyle(BOLD);
  bird1.killed()
  text("Game Over :(",dim.x/2,dim.y/2);
  Stopcounter++
  if(Stopcounter > 0){
    noLoop()
  }
}

function keyPressed() {
  if(keyCode === 32){
    bird1.addBounce()
  }
}

function setscore(){
  textAlign(LEFT)
  textSize(20)
  textStyle(BOLD);
  fill(255,0,0)
  text("Score: "+score,10,30)
}