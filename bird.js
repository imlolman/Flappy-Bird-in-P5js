function mutate(x) {
    if (random(1) < 0.1) {
        let offset = randomGaussian() * 0.5;
        let newx = x + offset;
        return newx;
    } else {
        return x;
    }
}
  
  
function Bird(brain) {
    this.pos = {}
    this.pos.x = 50
    this.pos.y = height/2
    this.hw = 30
    this.gravity = 0.3
    this.punchForce = 7
    this.speed = 0
    this.imageflex = 5
    this.score = 0
    this.fitness = 0
    if (brain instanceof NeuralNetwork) {
        this.brain = brain.copy();
        this.brain.mutate(mutate);
    } else {
        this.brain = new NeuralNetwork(5, 8, 2);
    }

    this.update = function(){
        this.speed+=this.gravity
        this.addUpDownLimit()
    }

    this.up = function(){
        this.speed = (-1)*this.punchForce
    } 

    this.draw = function(){
        this.score++
        fill(0, 50)
        noStroke()
        image(birdImage, this.pos.x - this.hw/2 - this.imageflex, this.pos.y-this.hw/2 - this.imageflex, this.hw+this.imageflex*2, this.hw+this.imageflex*2);
        // ellipse( this.pos.x, this.pos.y, this.hw, this.hw)
    }

    this.killed = function(){
        this.punchForce = 0
        this.gravity = 1
    }

    this.addUpDownLimit = function(){
        if(this.pos.y + this.speed > 400-this.hw/2){
            this.pos.y = 400-this.hw/2
        }else if(this.pos.y + this.speed < 0+this.hw/2){
            this.pos.y = 0+this.hw/2
        }else{
            this.pos.y += this.speed
        }
    }

    this.copy = function(){
        return new Bird(this.brain);
    }

    this.think = function(pipes) {
        // First find the closest pipe
        let closest = null;
        let record = Infinity;
        for (let i = 0; i < pipes.length; i++) {
          let diff = pipes[i].pos.x - this.pos.x;
          if (diff > 0 && diff < record) {
            record = diff;
            closest = pipes[i];
          }
        }
    
        if (closest != null) {
          // Now create the inputs to the neural network
          let inputs = [];
          // x position of closest pipe
          inputs[0] = map(closest.pos.x, this.pos.x, width, 0, 1);
          // top of closest pipe opening
          inputs[1] = map(closest.top, 0, height, 0, 1);
          // bottom of closest pipe opening
          inputs[2] = map(closest.bottom, 0, height, 0, 1);
          // bird's y position
          inputs[3] = map(this.pos.y, 0, height, 0, 1);
          // bird's y velocity
          inputs[4] = map(this.speed, -10, 10, 0, 1);
    
        //   // Get the outputs from the network
        //   console.log(inputs)
          let action = this.brain.predict(inputs);
          // Decide to jump or not!
          if (action[1] > action[0]) {
            this.up();
          }
        }
      }
    
}