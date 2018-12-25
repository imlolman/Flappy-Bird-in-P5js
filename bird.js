function bird(x,y) {
    this.pos = {}
    this.pos.x = 50
    this.pos.y = y/2
    this.hw = 30
    this.gravity = 0.3
    this.punchForce = 7
    this.speed = 0
    this.imageflex = 5

    this.addFrame = function(){
        this.speed+=this.gravity
        this.pos.y += this.speed
        if(this.pos.y > 400){
            this.pos.y = 400-this.hw/2
        }
    }

    this.addBounce = function(){
        this.speed = (-1)*this.punchForce
    } 

    this.draw = function(){
        this.addFrame()
        fill("#e4ff00")
        noStroke()
        image(birdImage, this.pos.x - this.hw/2 - this.imageflex, this.pos.y-this.hw/2 - this.imageflex, this.hw+this.imageflex*2, this.hw+this.imageflex*2);
        // ellipse(this.pos.x, this.pos.y, this.hw)
    }

    this.killed = function(){
        this.punchForce = 0
        this.gravity = 1
    }
}