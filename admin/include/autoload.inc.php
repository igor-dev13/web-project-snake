<?php
    $requireFileDir = scandir($_SERVER["DOCUMENT_ROOT"] . "/admin/include/");

    if($requireFileDir)
    {
        foreach ($requireFileDir as $file)
        {
            if($file != '.' && $file != '..')
            {
                require_once($file);
            }
        }
    }

