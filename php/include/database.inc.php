<?php
    require_once('autoload.inc.php');

    $g_bdLink = null;

    function dbInitialConnect()
    {
        global $g_bdLink;
        $g_bdLink = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT);
        $error = mysqli_connect_error();
        if ($error)
        {
            die('Unable to connect to database');
        }
    }

    dbInitialConnect();

    function dbQuery($query)
    {
        global $g_bdLink;
        $result = mysqli_query($g_bdLink, $query);
        return ($result);
    }

    function bdQuote($value)
    {
        global $g_bdLink;
        return mysqli_real_escape_string($g_bdLink, $value);
    }

    function bdQueryGetResult($query)
    {
        global $g_bdLink;
        $data = array();
        $result = mysqli_query($g_bdLink, $query);

        if ($result)
        {
            while($row = mysqli_fetch_assoc($result))
            {
                array_push($data, $row);
            }

            mysqli_free_result($result);
        }

        return $data;
    }

