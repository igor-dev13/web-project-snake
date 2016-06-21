var Snake = Snake || {};

Snake.gridTypes = { GRASS: 0, WALL: 1, SNAKE: 2, FOOD: 3, HEAD: 4 }; // игровые константы
Snake.grid = [];
Snake.imageFiles = [];
Snake.levels = [];
Snake.snake = [];
Snake.moveX = 0;
Snake.moveY = 0;
Snake.grow = 0;
Snake.score = 0;
Snake.speed = 300;
Snake.level = 0;
Snake.gameOver = false;

Snake.init = function (canvas, level, loadingCompleteCallback)
{
    // canvas loading
    Snake.canvasElement = document.getElementById(canvas);
    Snake.context = this.canvasElement.getContext("2d");

    Snake.loadImages();
    Snake.loadGrid(level);
    Snake.createFood();
    Snake.registerEvents();

    Snake.waitForImages(loadingCompleteCallback);
}

Snake.move = function ()
{
    var last = Snake.snake.length - 1;
    var lastPointX = Snake.snake[last].x;
    var lastPointY = Snake.snake[last].y;

    // движение змейки
    for (var i = Snake.snake.length - 1; i > 0; i-- )
    {
        Snake.setPositionRedraw(Snake.snake[i].x, Snake.snake[i].y); // чтобы старая точка змейки затералась
        Snake.snake[i].x = Snake.snake[i - 1].x;
        Snake.snake[i].y = Snake.snake[i - 1].y;

        Snake.snake[i].redraw = true;
    }

    // движение головы
    Snake.setPositionRedraw(Snake.snake[0].x, Snake.snake[0].y);
    Snake.snake[0].x += Snake.moveX;
    Snake.snake[0].y += Snake.moveY;
    Snake.snake[0].redraw = true;

    // если съели, то к концу змейки добавляем элемент
    if (Snake.grow > 0)
    {
        Snake.snake.push(new Snake.gridItem(lastPointX, lastPointY, Snake.gridTypes.SNAKE));
        Snake.grow--;
    }

    Snake.checkCollisions();
}

// проверка на столкновения
Snake.checkCollisions = function()
{
    // проверям на столкновение с едой
    if (Snake.snake[0].x == Snake.food.x && Snake.snake[0].y == Snake.food.y)
    {
        Snake.score++;
        Snake.grow = 1;


        if (Snake.score % 5 == 0)
        {
            Snake.level++;
            Snake.moveX = 0;
            Snake.moveY = 0;
            Snake.grow = 0;
            Snake.snake = [];
            Snake.speed -= 50;

            Snake.grid = [];
            Snake.loadGrid(Snake.level);
        }

        Snake.createFood();
    }

    // проверям на столкновение со стеной
    if (Snake.getTypeFromPosition(Snake.snake[0].x, Snake.snake[0].y) == Snake.gridTypes.WALL)
    {
        Snake.gameOver = true;
    }

    // проверям не врезались ли головой в хвост
    for (var i = 1; i < Snake.snake.length; i++)
    {
        if (Snake.snake[0].x == Snake.snake[i].x && Snake.snake[0].y == Snake.snake[i].y)
        {
            Snake.gameOver = true;
        }
    }
}




