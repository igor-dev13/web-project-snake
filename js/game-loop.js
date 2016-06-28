var Snake = Snake || {};
window.gameLoop = function()
{
    Snake.move();
    Snake.drawGrid();
    Snake.drawScore();

    if (Snake.gameOver)
    {
        Snake.drawGameOver();
        Snake.scoreCheck();
        document.getElementById('game-restart').style.display = "block";
    }
    else
    {
        setTimeout(window.gameLoop, Snake.speed);
    }
}

