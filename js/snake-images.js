var Snake = Snake || {};

Snake.loadImages = function ()
{
    // массив в нем - первый элемент картинка, второй объект картинки
    Snake.imageFiles[Snake.gridTypes.GRASS] = ["img/floor.png", null];
    Snake.imageFiles[Snake.gridTypes.WALL] = ["img/wall.png", null];
    Snake.imageFiles[Snake.gridTypes.SNAKE] = ["img/snake.png", null];
    Snake.imageFiles[Snake.gridTypes.FOOD] = ["img/food.png", null];
    Snake.imageFiles[Snake.gridTypes.HEAD] = ["img/head.png", null];
    Snake.imageFiles[Snake.gridTypes.SPEEDBONUS] = ["img/speed.png", null];
    Snake.imageFiles[Snake.gridTypes.HIDEANTIBONUS] = ["img/antibonus.png", null];

    Snake.imagesLoaded = 0;

    for (var i = 0;  i < Snake.imageFiles.length; i++)
    {
        var item = Snake.imageFiles[i];
        item[1] = new Image();
        item[1].src = item[0];
        item[1].onload = Snake.onImageLoaded;
    }
}

Snake.onImageLoaded = function ()
{
    Snake.imagesLoaded++;
}

Snake.waitForImages = function (callback)
{
    window.setTimeout(function ()
    {
        if (Snake.imagesLoaded != Snake.imageFiles.length)
        {
            window.setTimeout(Snake.waitForImages(callback), 10);
        }
        else
        {
            callback();
        }
    }, 0);
}

