var Snake = Snake || {};

Snake.loadGrid = function (level)
{
    // устанавливаем матрицу 800 на 600 - отрезок 20px на 15px соответствует картинке 40px на 40px
    Snake.gridWidth = 20;
    Snake.gridHeight = 15;
    Snake.gridElementWidth = Snake.canvasElement.width / Snake.gridWidth ; // 800 : 20 = 40
    Snake.gridElementHeight = Snake.canvasElement.height / Snake.gridHeight; // 600 : 15 = 40

    for (var y = 0; y < Snake.gridHeight; y++)
    {
        for (var x = 0; x < Snake.gridWidth; x++)
        {
            var gridItem = parseInt(Snake.levels[level][y * Snake.gridWidth + x], 10);
            Snake.grid.push(new Snake.gridItem(x, y, gridItem));
        }
    }

    Snake.snake.push(new Snake.gridItem(Math.floor(Snake.gridWidth / 2), // x coords
                                       (Math.floor(Snake.gridHeight / 2)), // y coords
                                       Snake.gridTypes.HEAD));
}

Snake.drawGrid = function ()
{
    for (var i = 0; i < Snake.grid.length; i++)
    {
        Snake.grid[i].draw(Snake.context);
    }

    for (var s = 0; s < Snake.snake.length; s++)
    {
        Snake.snake[s].draw(Snake.context);
    }

    Snake.food.draw(Snake.context);
}

Snake.drawScore = function ()
{
    Snake.context.fillStyle = 'rgb(255, 255, 255)';
    Snake.context.font = "30px Verdana";
    Snake.context.fillText(Snake.score.toString(), 50, 70);
    Snake.setPositionRedraw(1, 1);
    Snake.setPositionRedraw(2, 1);
}

Snake.drawGameOver = function()
{
    Snake.context.font = "30px Verdana";
    Snake.context.fillStyle = 'rgb(255, 0, 0)';
    Snake.context.globalAlpha = 0.75;              // opacity
    Snake.context.fillRect(0, 0, 800, 600);
    Snake.context.fillStyle = 'rgb(255, 255, 255)';
    Snake.context.fillText('Game Over!', 300, 280);
}

Snake.setTypeFromPosition = function (x, y, type)
{
    var index = y * Snake.gridWidth + x;
    Snake.grid[index].type = type;
    Snake.grid[index].redraw = true;
}

Snake.getTypeFromPosition = function (x, y)
{
    var index = y * Snake.gridWidth + x;
    return Snake.grid[index].type;
}

Snake.setPositionRedraw = function (x, y)
{
    var index = y * Snake.gridWidth + x;
    Snake.grid[index].redraw = true;
}

Snake.createFood = function ()
{
    var curentType = Snake.gridTypes.WALL;
    var x = 0;
    var y = 0;

    while ((curentType == Snake.gridTypes.WALL) || (curentType == Snake.gridTypes.SNAKE) || (curentType == Snake.gridTypes.HEAD))
    {
        x = Math.floor(Math.random() * Snake.gridWidth);
        y = Math.floor(Math.random() * Snake.gridHeight); 
        curentType = Snake.getTypeFromPosition(x, y);
    }
    console.log(Snake.getTypeFromPosition(x, y));
    Snake.food = new Snake.gridItem(x, y, Snake.gridTypes.FOOD);
}

Snake.gridItem = function (x, y, type)
{
    var self = this;

    this.redraw = true;
    this.x = x;
    this.y = y;
    this.type = type;

    // рисуем кусочек картинки
    this.draw = function (context)
    {
        if (self.redraw)
        {
            var img = Snake.imageFiles[self.type][1];
            // передаем саму картинку, координаты картинки (полную картинку), self.x * Snake.gridElementWidth, self.y * Snake.gridElementHeight - положение изображения на холсте и масштаб изображения.
            context.drawImage(img, 0, 0, img.width, img.height, self.x * Snake.gridElementWidth, self.y * Snake.gridElementHeight, Snake.gridElementWidth, Snake.gridElementHeight);
            self.redraw = false;
        }
    }
}