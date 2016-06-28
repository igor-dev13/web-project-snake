var Snake = Snake || {};

Snake.scoreCheck = function()
{
    $.ajax(
    {
        type: 'POST',
        url: '/php/player_score.php',
        data: 'score=' + Snake.score,
        success: function(data)
        {
            if (data == 'new-score')
            {
                $('.score-block').fadeIn('slow');
            }
            else
            {
                $('.results').append('<p>' + data + '</p>').hide().fadeIn('slow');
            }            
        }
    });
}

Snake.scoreInsert = function(nicName)
{
    var tableResults = '<p>Таблица рекордов:</p>';

    $.ajax(
    {
        type: 'POST',
        url: '/php/player_score.php',
        dataType: "json",
        data: 'insert=' + nicName + '&result=' + Snake.score,
        success: function(data)
        {
            for (var i = 0; i < data.length; i++)
            {
                console.log(data[i].score);
                console.log(data[i].nic_name);

                tableResults = tableResults + '<span class="odd">' + data[i].nic_name + '</span>';
                tableResults = tableResults + '<span class="even">' + data[i].score + '</span>';
            }

            $('.results').append(tableResults).hide().fadeIn('slow');
            $('.score-block').hide('slow');
        }
    });
}