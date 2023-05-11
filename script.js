var player,cpu,ball;     //OBJETOS DE CLASSE
var canvas,ctx,pontuacao //ELEMENTOS HTML
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
var level = 1;

var game;

//AO CARREGAR BODY
function load(){
    canvas = document.querySelector('canvas');
    pontuacao = document.getElementById('pontuacao');
    ctx = canvas.getContext('2d');
    
    resizeCanvas();

    player = new Player(canvas,ctx,15,100,4,'#00a','#00f');
    cpu = new Cpu(canvas,ctx,15,100,4,1,'#a00','#f00');
    ball = new Ball(canvas,ctx,player,cpu,win,16,6,'#770','#dd0');

    player.setKeyEvents(document.addEventListener)

    loop();
}

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    commandPlayer();
    commandBall();
    commandCpu();
    
    game = requestAnimationFrame(loop);
}
function commandPlayer(){
    player.draw();
    player.move();
}
function commandCpu(){
    cpu.draw();
    cpu.detectBall(ball);
    cpu.move();
}
function commandBall(){
    ball.draw();
    ball.move();
}
function win(winner){
    if(winner == 'player'){
        ball.direction.right = true;
        ball.direction.left = false;
    }
    else if(winner == 'cpu'){
        ball.direction.left = true;
        ball.direction.right = false;
    }
    reset(winner)
}  
function reset(winner){
    if(level < 6 && winner == 'player'){
        level++
        cpu.inteligence++;
        ball.initialSpeedX += 1
        pontuacao.innerHTML = 'Nivel: '+level
    }
    ball.reset(winner,2);

}
function resizeCanvas(){
    canvas.width = windowWidth*0.8;
    canvas.height = windowHeight*0.8;
}