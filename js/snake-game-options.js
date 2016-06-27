var Snake = Snake || {};

Snake.menuInit = function ()
{
    var gameOptions = document.getElementById('game-options');

    var startBtn = document.createElement('div');
    startBtn.setAttribute("id", "start-btn");
    startBtn.innerHTML = "Играть";

    var optionsBtn = document.createElement('div');
    optionsBtn.setAttribute("id", "options-btn");
    optionsBtn.innerHTML = "Опции";

    gameOptions.appendChild(startBtn);
    gameOptions.appendChild(optionsBtn);

    startBtn.addEventListener("click", function()
    {
        Snake.mapAnimate();
    });

    optionsBtn.addEventListener("click", function()
    {
        Snake.gameOptions();
    });
}

Snake.nickSubmit = function()
{
    document.getElementById("game-submit").addEventListener("click", function()
    {
        var nicName = document.getElementById("nic_name").value;

        if (nicName.trim().length != 0)
        {
            Snake.scoreInsert(nicName);
        }
    });
}

Snake.mapAnimate = function ()
{
    document.getElementById('game-screen').style.height = "600";
    document.getElementById('game-screen').style.display = "block";
    document.getElementById('game-options').style.display = "none";
}

Snake.gameOptions = function ()
{
    document.getElementById('options-btn').style.display = "none";
    document.getElementById('start-btn').style.display = "none";
    var gameOptions = document.getElementById('game-options');

    var optionLevel = document.createElement('div');
    optionLevel.setAttribute("id", "option-level");

    var optionHide = document.createElement('div');
    optionHide.setAttribute("id", "option-snake-hide");

    var optionBonus = document.createElement('div');
    optionBonus.setAttribute("id", "option-bonus-speed");

    var optionBack = document.createElement('div');
    optionBack.setAttribute("id", "option-back");
    optionBack.innerHTML = "Назад";

    gameOptions.appendChild(optionBonus);
    gameOptions.appendChild(optionHide);
    gameOptions.appendChild(optionLevel);
    gameOptions.appendChild(optionBack);
    Snake.optionLevel('check');
    Snake.optionBonus('checkBonus');
    Snake.optionHide('checkOptionHide');

    optionBack.addEventListener("click", function()
    {
        window.location = '/';
    });

    optionLevel.addEventListener("click", function()
    {
        Snake.optionLevel('change');
    });

    optionBonus.addEventListener("click", function()
    {
        Snake.optionBonus('changeBonus');
    });

    optionHide.addEventListener("click", function()
    {
        Snake.optionHide('changeOptionHide');
    });
}

Snake.optionLevel = function (action)
{
    $.ajax(
    {
        type: 'POST',
        url: '/web/game-options.php',
        dataType: "html",
        data: 'option=' + action,
        success: function (data)
        {
            if (data == '1')
            {
                $('#option-level').html("Переключение уровней <span class='color-green'>включено</span>");
                Snake.levelsAreActive = true;
            }
            else
            {
                $('#option-level').html("Переключение уровней <span class='color-red'>выключено</span>");
                Snake.levelsAreActive = false;
            }
        },
        error: function() {
            alert('Error !');
        }
    });
}

Snake.optionBonus = function (action)
{
    $.ajax(
    {
        type: 'POST',
        url: '/web/game-options.php',
        data: 'option=' + action,
        success: function (data)
        {
            if (data == '3')
            {
                $('#option-bonus-speed').html("Бонус скорости <span class='color-green'>три раза в минуту</span>");
                Snake.speedBonus = 3;
            }
            else if (data == '2')
            {
                $('#option-bonus-speed').html("Бонус скорости <span class='color-green'>два раза в минуту</span>");
                Snake.speedBonus = 2;
            }
            else if (data == '1')
            {
                $('#option-bonus-speed').html("Бонус скорости <span class='color-green'>раз в минуту</span>");
                Snake.speedBonus = 1;
            }
            else if (data == '0')
            {
                $('#option-bonus-speed').html("Бонус скорости <span class='color-red'>выключен</span>");
                Snake.speedBonus = 0;
            }
        },
        error: function() {
            alert('Error !');
        }
    });
}

Snake.optionHide = function (action)
{
    $.ajax(
        {
            type: 'POST',
            url: '/web/game-options.php',
            data: 'option=' + action,
            success: function (data)
            {
                if (data == '3')
                {
                    $('#option-snake-hide').html("Антибонус сокрытие змейки <span class='color-green'>три раза в минуту</span>");
                    Snake.antiBonusHide = 3;
                }
                else if (data == '2')
                {
                    $('#option-snake-hide').html("Антибонус сокрытие змейки <span class='color-green'>два раза в минуту</span>");
                    Snake.antiBonusHide = 2;
                }
                else if (data == '1')
                {
                    $('#option-snake-hide').html("Антибонус сокрытие змейки <span class='color-green'>раз в минуту</span>");
                    Snake.antiBonusHide = 1;
                }
                else if (data == '0')
                {
                    $('#option-snake-hide').html("Антибонус сокрытие змейки <span class='color-red'>выключен</span>");
                    Snake.antiBonusHide = 0;
                }
            },
            error: function() {
                alert('Error !');
            }
        });
}