class Ball{
    constructor(canvas,ctx,player,cpu,win,ray,speedX,borderColor,backGroundColor){
        this.canvas = canvas;
        this.ctx = ctx;
        this.player = player;
        this.cpu = cpu;
        this.win = win;
        this.ray = ray;
        this.speedX = speedX;
        this.speedY = 0;
        this.initialSpeedY = 0;
        this.initialSpeedX = speedX;
        this.borderColor = borderColor;
        this.backGroundColor = backGroundColor;
        this.direction = {
            left:true,
            right: false,
            up: false,
            down: false,
        }
        this.x = canvas.width/2,
        this.y = canvas.height/2
    }
    draw(){
        this.wallCollision();
        this.checkNearObjectAproximation(player);
        this.checkNearObjectAproximation(cpu);

        this.ctx.beginPath();
        this.lineWidth = 6;
        this.ctx.strokeStyle = this.borderColor;
        this.ctx.fillStyle = this.backGroundColor;
        this.ctx.arc(this.x,this.y,this.ray,0,Math.PI*2);
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
    move(){
        if(this.direction.up)         this.y -= this.speedY;
        else if(this.direction.down)  this.y += this.speedY;
        if(this.direction.left)       this.x -= this.speedX;
        else if(this.direction.right) this.x += this.speedX;
    }
    wallCollision(){
        if(this.y-this.ray < 0){
            this.y = this.ray;
            this.direction.down = true; 
            this.direction.up = false;
        }
        else if(this.y > this.canvas.height){
            this.y = this.canvas.height - this.ray;
            this.direction.up = true;
            this.direction.down = false;
        }
        if(this.x-this.ray < 0){
            //lado do player
            this.win('cpu')
            this.direction.right = true;
            this.direction.left = false;
        }
        else if(this.x+this.ray > this.canvas.width){
            this.win('player')
            this.win('player')
            this.win('player')
            this.win('player')
            this.direction.left = true;
            this.direction.right = false;
        }
    }
    checkNearObjectAproximation(obj){
        if(this.x-this.ray < obj.x+obj.width && this.x+this.ray > obj.x)
            this.checkObjectCollision(this.direction.left ? true : false, obj);
    }
    checkObjectCollision(isBallMovingToLeft,obj){
        if(
            (this.y+this.ray > obj.y) && 
            (this.y-this.ray < obj.y+obj.height)
        ){
            this.direction.right = isBallMovingToLeft;
            this.direction.left = !isBallMovingToLeft;

            if(this.y < obj.y+obj.height/2){
                this.direction.up = true;
                this.direction.down = false;
                this.defineNewSpeed(-1,true,obj);
            }
            else if(this.y >= obj.y+obj.height/2){
                this.direction.down = true;
                this.direction.up = false;
                this.defineNewSpeed(1,false,obj);
            }
        }
    }
    defineNewSpeed(directionY,moveDirection,obj){
        this.direction.up = moveDirection;
        this.direction.down = !moveDirection;
        let percentExtra = this.initialSpeedY + ((obj.height/2 - this.y + obj.y) * -directionY);
        percentExtra *= 100/(this.ray + obj.height/2);
        this.speedY = percentExtra/10;
    }
    reset(winner,delay){
        this.x = this.canvas.width/2;
        this.y = this.canvas.height/2;
        let randomDirection = [true,false][Math.round(Math.random()*1)];

        this.speedX = 0;
        this.speedY = 0;
        setTimeout(()=>{
            this.speedY = this.initialSpeedX;
            this.speedX = this.initialSpeedX;
        },delay*1000)
        this.direction.up = randomDirection;
        this.direction.down = !randomDirection;
        if(winner = 'player'){
            this.direction.right = true;
            this.direction.left = false;
        }
        else{
            this.direction.left = true;
            this.direction.right = false;
        }
    }
}