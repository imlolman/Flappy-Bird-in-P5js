function piller(x){
    this.pos = {}
    this.height =  floor(random(100, 250))
    this.width = 60
    this.pos.x = 600
    this.pos.y = 400-this.height
    this.speed = 2
    this.space = 100

    this.addFrame = function(){
        this.pos.x -= this.speed
    }

    this.draw = function(){
        this.addFrame()
        fill(60)
        rect(this.pos.x, this.pos.y, this.width, this.height)
        rect(this.pos.x, 0, this.width, this.pos.y - this.space)
    }
}