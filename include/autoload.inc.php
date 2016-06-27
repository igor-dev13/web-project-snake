<?php
    $requireFileDir = scandir($_SERVER["DOCUMENT_ROOT"] . "/include/");

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

