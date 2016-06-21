var Snake = Snake || {};

Snake.KEY_LEFT_ARROWS = 37;
Snake.KEY_UP_ARROWS = 38;
Snake.KEY_RIGHT_ARROWS = 39;
Snake.KEY_DOWN_ARROWS = 40;

Snake.KEY_W = 87;
Snake.KEY_A = 65;
Snake.KEY_S = 83;
Snake.KEY_D = 68;

Snake.registerEvents = function ()
{
    window.addEventListener("keydown", Snake.keydown, false);
}

Snake.keydown = function(evt)
{
    if (evt.keyCode == Snake.KEY_LEFT_ARROWS || evt.keyCode == Snake.KEY_A)
    {
        Snake.moveX = -1;
        Snake.moveY = 0;
    }

    if (evt.keyCode == Snake.KEY_UP_ARROWS || evt.keyCode == Snake.KEY_W)
    {
        Snake.moveX = 0;
        Snake.moveY = -1;
    }

    if (evt.keyCode == Snake.KEY_RIGHT_ARROWS || evt.keyCode == Snake.KEY_D)
    {
        Snake.moveX = 1;
        Snake.moveY = 0;
    }

    if (evt.keyCode == Snake.KEY_DOWN_ARROWS || evt.keyCode == Snake.KEY_S)
    {
        Snake.moveX = 0;
        Snake.moveY = 1;
    }
}

