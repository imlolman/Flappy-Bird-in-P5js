function piller(){
    this.pos = {}
    this.height =  floor(random(100, 250))
    this.width = 60
    this.pos.x = 600
    this.pos.y = 400-this.height
    this.bottom = this.pos.y
    this.space = 150
    this.top = this.pos.y - this.space
    this.speed = 6
    this.pillerbottomImage = pillerbottomImage
    this.pillertopImage = pillertopImage

    this.update = function(){
        this.pos.x -= this.speed
    }

    this.draw = function(){
        for(i = this.pos.y; i < this.pos.y + this.height;i+=3){
            image(pillerbottomImage,this.pos.x, i, this.width);
        }
        image(pillertopImage,this.pos.x, this.pos.y, this.width);
        

        for(i = 0; i+20 < this.top;i+=20){
            image(pillerbottomImage,this.pos.x, i, this.width);
        }
        image(pillertopImage,this.pos.x,this.top - 20, this.width);
    }
}
