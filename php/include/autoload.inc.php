<?php
    $requireFileDir = scandir($_SERVER["DOCUMENT_ROOT"] . "/php/include/");

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

