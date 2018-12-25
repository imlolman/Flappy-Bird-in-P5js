function piller(x,pillerbottomImage,pillertopImage){
    this.pos = {}
    this.height =  floor(random(100, 250))
    this.width = 60
    this.pos.x = 600
    this.pos.y = 400-this.height
    this.speed = 2
    this.space = 150
    this.pillerbottomImage = pillerbottomImage
    this.pillertopImage = pillertopImage

    this.addFrame = function(){
        this.pos.x -= this.speed
    }

    this.draw = function(){
        this.addFrame()
        // fill(60)
        // rect(this.pos.x, this.pos.y, this.width, this.height)
        for(i = this.pos.y; i < this.pos.y + this.height;i+=3){
            image(pillerbottomImage,this.pos.x, i, this.width);
        }
        image(pillertopImage,this.pos.x, this.pos.y, this.width);
        

        for(i = 0; i+20 < this.pos.y - this.space;i+=20){
            image(pillerbottomImage,this.pos.x, i, this.width);
        }
        image(pillertopImage,this.pos.x,this.pos.y - this.space - 20, this.width);
        // rect(this.pos.x, 0, this.width, this.pos.y - this.space)
    }
}
