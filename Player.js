class Player{
    constructor(canvas,ctx,width,height,speed,borderColor,backgroundColor){
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.initialSpeed = speed;
        this.borderColor = borderColor;
        this.backgroundColor = backgroundColor;
        this.x = 0;
        this.y = (canvas.height/2) - (height/2);
        this.points = 0;
        this.direction = {
            up: false,
            down: false,
        };
        this.turbo = 3;
    }
    setKeyEvents(keyEvent){
        keyEvent('keydown',(e)=>{
            let key = e.key.toLowerCase();
            if(key == 'w')        return this.direction.up = true;
            if(key == 's')        return this.direction.down = true;
            if(e.code == 'Space') return this.speed = this.initialSpeed * this.turbo;
        })
        keyEvent('keyup',(e)=>{
            let key = e.key.toLowerCase();
            if(key == 'w')        return this.direction.up = false;
            if(key == 's')        return this.direction.down = false;
            if(e.code == 'Space') return this.speed = this.initialSpeed;
        })
    }
    draw(){
        this.collision();
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.lineWidth = 5;
        this.ctx.fillRect(this.x,this.y,this.width,this.height);
        this.ctx.strokeRect(this.x,this.y,this.width,this.height);
        this.ctx.closePath();
    }
    move(){
        if(this.direction.up)   return this.y -= this.speed;
        if(this.direction.down) return this.y += this.speed;
    }
    collision(){
        if(this.y < 0)
            this.y = 0;
        else if(this.y+this.height > this.canvas.height)
            this.y = this.canvas.height - this.height;
    }
}