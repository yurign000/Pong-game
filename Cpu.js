class Cpu{
    constructor(canvas,ctx,width,height,speed,inteligence,borderColor,backgroundColor){
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.inteligence = inteligence;
        this.initialSpeed = speed;
        this.borderColor = borderColor;
        this.backgroundColor = backgroundColor;
        this.x = canvas.width - width;
        this.y = (canvas.height/2) - (height/2);
        this.points = 0;
        this.direction = {
            up: false,
            down: false,
        };
        this.startPoint = this.y;

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
    pursuitBall(ball){
        console.log(((this.height/2)*(this.inteligence/10)))
        if(ball.x > this.canvas.width/2 && ball.direction.right){
            if((this.y + this.height/2) + ((this.height/2)*(this.inteligence/10)) < ball.y){
                this.direction.down = true;
                this.direction.up = false;
            }
            else if((this.y + this.height/2) - ((this.height/2)*(this.inteligence/10)) > ball.y){
                this.direction.up = true;
                this.direction.down = false;
            }
            
            let turboArea = (this.canvas.width/2) + (this.canvas.width/2)/(this.inteligence*1.1);
            if(ball.x > turboArea && ball.direction.right){
                this.speed = this.initialSpeed*2;
            }

            else this.speed = this.initialSpeed;
        }
        else this.returnToStartPoint();
    }
    returnToStartPoint(){
        if(this.y > this.startPoint+this.speed){
            this.direction.up = true;
            this.direction.down = false;
        }
        else if(this.y < this.startPoint-this.speed){
            this.direction.down = true;
            this.direction.up = false;
        }
        else{
            this.direction.up = false;
            this.direction.down = false
        }
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