<?php
    require_once 'include/database.inc.php';

    if (isset($_POST['score']))
    {
        $playerScore = $_POST['score'];

        if ((getRecordsCount() > 10) || ($playerScore == 0))
        {
            if (compareScoreInRecords($playerScore))
            {
                echo 'new-score';
            }
            else
            {
                echo 'Вы не попали в таблицу рекордов.';
            }
        }
        else
        {
            echo 'new-score';
        }
    }

    if (isset($_POST['insert']) && isset($_POST['result']))
    {
        insertInRecordsTable($_POST['insert'], $_POST['result']);
    }