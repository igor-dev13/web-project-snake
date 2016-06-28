<?php
    function getRecordsCount()
    {
        $records = dbQuery("SELECT * FROM `records`");
        return mysqli_num_rows($records);
    }

    function compareScoreInRecords($score)
    {
        $query = bdQueryGetResult("SELECT * FROM `records` LIMIT 10");
        foreach ($query as $key)
        {
            if ($score > $key['score'])
            {
                return true;
            }
        }

        return false;
    }

    function getRecordsInTable ()
    {
        $records = bdQueryGetResult("SELECT `nic_name`, `score` FROM `records` ORDER BY `score` DESC LIMIT 10");
        echo json_encode($records, JSON_UNESCAPED_UNICODE);
    }

    function insertInRecordsTable ($nicName, $score)
    {
        $nicName = bdQuote($nicName);
        $score = bdQuote($score);
        $query = "INSERT INTO `records` (`nic_name`, `score`) VALUES ('$nicName', '$score')";
        if (dbQuery($query))
        {
            getRecordsInTable();
        }
    }