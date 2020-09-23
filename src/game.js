import Snake from "./snake.js";
import Apple from "./apple.js";
import Drawing from "./drawing.js";


export default class Game {
    constructor(canvasWidth = 900,canvasHeight = 590)
    {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.blockSize = 30;
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext('2d');
        this.widthInBlock = this.canvasWidth/this.blockSize;
        this.heightInBlock = this.canvasHeight/this.blockSize;
        this.centreX = this.canvasWidth/2;
        this.centreY = this.canvasHeight/2;
        this.delay;
        this.snakee;
        this.applee;
        this.score;
        this.timeout;
    }
    
    
     //---------------------------------------------------------------------------------

    init()
    {
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.canvas.style.border = "30px solid grey";
        this.canvas.style.margin = "50px auto";
        this.canvas.style.display = "block";
        this.canvas.style.backgroundColor = "#ddd";
        document.body.appendChild(this.canvas);
        this.launch();
    }

     //---------------------------------------------------------------------------------

    launch()
    {
        this.snakee = new Snake([[6,4],[5,4],[4,4]],"right");
        this.applee = new Apple([10,10])
        this.score = 0;
        this.delay = 100;
        clearTimeout(this.timeout);
        this.refreshCanvas();
    }

     //---------------------------------------------------------------------------------
             
    refreshCanvas()
    {
        this.snakee.advance();
        if(this.snakee.checkCollision(this.widthInBlock,this.heightInBlock))
        {
            Drawing.gameOver(this.ctx,this.centreX,this.centreY);
        }
        else
        {
        if(this.snakee.isEatingApple(this.applee))
        {
            this.score++;
            this.speedUp();
            this.snakee.eatApple = true;
            do
            {
                this.applee.setNewPosition(this.widthInBlock, this.heightInBlock);

            }while(this.applee.isOnSnake(this.snakee))
        }
            this.ctx.clearRect(0,0, this.canvasWidth, this.canvasHeight);
            Drawing.drawScore(this.ctx,this.centreX,this.centreY,this.score);
            Drawing.drawSnake(this.ctx,this.blockSize,this.snakee);
            Drawing.drawApple(this.ctx, this.blockSize, this.applee);
            this.timeout = setTimeout(this.refreshCanvas.bind(this),this.delay);  
        }
        
    }

    speedUp()
    {
        if(this.score%5 === 0)
        {
            this.delay /= 1.5;
        }
    }


}