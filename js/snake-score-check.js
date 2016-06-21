var Snake = Snake || {};

Snake.scoreCheck = function()
{
    $.ajax(
    {
        type: 'POST',
        url: '/admin/player-score.php',
        data: 'score=' + Snake.score,
        success: function(data)
        {
            if (data == 'new-score')
            {
                $('.score-block').show();
            }
            else
            {
                $('.results').html(data);
                // вывод таблицы результатов
            }            
        }
    });
}

Snake.scoreInsert = function(nicName)
{
    var resultsTable = 'Таблица рекордов:<br>';

    $.ajax(
    {
        type: 'POST',
        url: '/admin/player-score.php',
        dataType: "json",
        data: 'insert=' + nicName + '&result=' + Snake.score,
        success: function(data)
        {
            for (index = 0, len = data.length; index < len; ++index)
            {
                console.log(data[index].score);
                console.log(data[index].nic_name);

                resultsTable = resultsTable + '<span class="odd">' + data[index].nic_name + '</span>';
                resultsTable = resultsTable + '<span class="even">' + data[index].score + '</span>';
            }

            $('.results').html(resultsTable);
        }
    });
}

// без document.ready не полуилось, windows.onload не помог
$(document).ready(function()
{
    document.getElementById("game-submit").addEventListener("click", function()
    {
        var nicName = '';

        nicName = document.getElementById("nic_name").value;
        if (nicName != '')
        {
            Snake.scoreInsert(nicName);
        }
    });
});



