function bird(x,y) {
    this.pos = {}
    this.pos.x = 50
    this.pos.y = y/2
    this.hw = 15
    this.gravity = 0.3
    this.punchForce = 7
    this.speed = 0

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
        fill(250,0,0)
        noStroke()
        ellipse(this.pos.x, this.pos.y, this.hw)
    }
}