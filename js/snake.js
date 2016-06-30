var Snake = Snake || {};

Snake.delay = function ()
{
    window.setTimeout(function ()
    {
        if (Snake.speedBonus === undefined || Snake.antiBonusHide === undefined || Snake.levelOption === undefined)
        {
            window.setTimeout(Snake.delay(), 10);
        }
        else
        {
            Snake.menuInit();
            Snake.init('game-screen', 0, window.gameLoop);
            Snake.nickSubmit();
            document.getElementById('game-options').style.opacity = '1';
            document.getElementsByTagName('h1')[0].style.opacity = '1';
        }
    }, 0);
}

Snake.delay(); // Точка входа

Snake.init = function (canvas, level, loadingCompleteCallback)
{
    // canvas loading
    Snake.canvasElement = document.getElementById(canvas);
    Snake.context = this.canvasElement.getContext("2d");

    Snake.loadImages();
    Snake.loadGrid(level);
    Snake.createFood();

    if (Snake.speedBonus)
    {
        Snake.createBonus(Snake.speedBonus);
    }

    if (Snake.antiBonusHide)
    {
        Snake.createAntiBonus(Snake.antiBonusHide);
    }

    Snake.registerEvents();
    Snake.waitForImages(loadingCompleteCallback);
}

Snake.move = function ()
{
    var last = Snake.snake.length - 1;
    var lastPointX = Snake.snake[last].x;
    var lastPointY = Snake.snake[last].y;

    // движение тела змейки
    for (var i = Snake.snake.length - 1; i > 0; i-- )
    {
        Snake.setPositionRedraw(Snake.snake[i].x, Snake.snake[i].y);
        Snake.snake[i].x = Snake.snake[i - 1].x;
        Snake.snake[i].y = Snake.snake[i - 1].y;

        Snake.snake[i].redraw = true;
    }

    // движение головы
    Snake.setPositionRedraw(Snake.snake[0].x, Snake.snake[0].y);
    Snake.snake[0].x += Snake.moveX;
    Snake.snake[0].y += Snake.moveY;
    Snake.snake[0].redraw = true;
    Snake.food.redraw = true;

    if (Snake.bonus)
    {
        Snake.bonus.redraw = true;
    }

    if (Snake.antiBonus)
    {
        Snake.antiBonus.redraw = true;

        if (Snake.snake[0].type == Snake.gridTypes.GRASS)
        {
            window.setTimeout(Snake.discovery, Snake.antiBonusTime);
        }
    }

    // если съели, то к концу змейки добавляем элемент
    if (Snake.grow > 0)
    {
        Snake.snake.push(new Snake.gridItem(lastPointX, lastPointY, Snake.gridTypes.SNAKE));
        Snake.grow--;
    }

    if (document.getElementsByTagName('h1')[0].innerHTML == "LEVEL UP!")
    {
        Snake.newLvlAlert("Snake game");
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
        Snake.grow = Snake.growOncollisionWithFood;

        if (Snake.score % Snake.levelUpCount == 0)
        {
            if (Snake.levelOption)
            {
                if (Snake.bonus)
                {
                    Snake.bonus.x = '-1';
                    Snake.bonus.y = '-1';
                }

                if (Snake.antiBonus)
                {
                    Snake.antiBonus.x = '-1';
                    Snake.antiBonus.y = '-1';
                }

                Snake.snake = [];
                Snake.speed -= Snake.newLevelUpSpeed;
                Snake.grid = [];
                Snake.moveX = 0;
                Snake.moveY = 0;
                Snake.grow = 0;
                document.getElementsByTagName('h1')[0].style.opacity = '0';
                Snake.newLvlAlert("LEVEL UP!");
                Snake.level++;
                Snake.loadGrid(Snake.level);
            }
        }

        Snake.createFood();
    }

    if (Snake.bonus)
    {
        if (Snake.snake[0].x == Snake.bonus.x && Snake.snake[0].y == Snake.bonus.y)
        {
            Snake.speed -= Snake.speedBonusValue;

            Snake.returnSpeed = function()
            {
                Snake.speed += Snake.speedBonusValue;
            }

            setTimeout(Snake.returnSpeed, Snake.speedBonusTime);
            Snake.bonus.x = -1;
            Snake.bonus.y = -1;
        }
    }

    if (Snake.antiBonus)
    {
        if (Snake.snake[0].x == Snake.antiBonus.x && Snake.snake[0].y == Snake.antiBonus.y)
        {
            var frequencyTime = (Snake.dividendBonusTime / Snake.antiBonus);
            window.setTimeout(Snake.hiding, frequencyTime);
            Snake.antiBonus.x = '-1';
            Snake.antiBonus.y = '-1';
        }
    }

    if (Snake.getTypeFromPosition(Snake.snake[0].x, Snake.snake[0].y) == Snake.gridTypes.WALL)
    {
        Snake.gameOver = true;
    }

    for (var i = 1; i < Snake.snake.length; i++)
    {
        // проверяем на появилась ли еда в самой змейке
        if (Snake.snake[i].x == Snake.food.x && Snake.snake[i].y == Snake.food.y)
        {
            Snake.createFood();
        }

        // проверка не попали ли координаты еды и бонуса в одну точку
        if (Snake.bonus)
        {
            if (Snake.food.x == Snake.bonus.x && Snake.food.y == Snake.bonus.y)
            {
                Snake.createBonus();
            }
        }

        // проверяем на появился ли бонус в змейке
        if (Snake.bonus)
        {
            if (Snake.snake[i].x == Snake.bonus.x && Snake.snake[i].y == Snake.bonus.y)
            {
                Snake.createBonus();
            }
        }

        // проверям не врезались ли головой в хвост
        if (Snake.snake[0].x == Snake.snake[i].x && Snake.snake[0].y == Snake.snake[i].y)
        {
            Snake.gameOver = true;
        }
    }
}

Snake.newLvlAlert = function (text)
{
    setTimeout(function ()
    {
        document.getElementsByTagName('h1')[0].innerHTML = text;
        document.getElementsByTagName('h1')[0].style.opacity = '1';
    }, 500);
}

Snake.hiding = function()
{
    for (var i = 0; i < Snake.grid.length; i++)
    {
        if (Snake.snake[i] !== undefined)
        {
            Snake.snake[i].type = Snake.gridTypes.GRASS;
        }
    }
}

Snake.discovery = function()
{
    Snake.snake[0].type = Snake.gridTypes.HEAD;

    for (var i = 1; i < Snake.grid.length; i++)
    {
        if (Snake.snake[i] !== undefined)
        {
            Snake.snake[i].type = Snake.gridTypes.SNAKE;
        }
    }
}



