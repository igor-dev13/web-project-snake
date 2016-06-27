<?php
    function getOptionStatus($option)
    {
        $optionStatus = dbQuery("SELECT `status` FROM `options` WHERE `option_name` = '$option'");
        $optionStatus = mysqli_fetch_row($optionStatus);
        return $optionStatus[0];
    }

    function printOptionStatus($option)
    {
        $optionStatus = getOptionStatus($option);

        switch ($optionStatus)
        {
            case 0:
                echo 0;
                break;
            case 1:
                echo 1;
                break;
            case 2:
                echo 2;
                break;
            case 3:
                echo 3;
                break;
            default:
                echo 0;
        }
    }

    function setOptionLevelStatus ($option)
    {
        if (getOptionStatus($option) > 0)
        {
            dbQuery("UPDATE `options` SET `status` = 0 WHERE `option_name` = '$option'");
        }
        else
        {
            dbQuery("UPDATE `options` SET `status` = 1 WHERE `option_name` = '$option'");
        }

        printOptionStatus($option);
    }

    function setOptionBonusStatus ($option)
    {
        if (getOptionStatus($option) == 0)
        {
            dbQuery("UPDATE `options` SET `status` = 1 WHERE `option_name` = '$option'");
        }
        else if (getOptionStatus($option) == 1)
        {
            dbQuery("UPDATE `options` SET `status` = 2 WHERE `option_name` = '$option'");
        }
        else if (getOptionStatus($option) == 2)
        {
            dbQuery("UPDATE `options` SET `status` = 3 WHERE `option_name` = '$option'");
        }
        else if (getOptionStatus($option) == 3)
        {
            dbQuery("UPDATE `options` SET `status` = 0 WHERE `option_name` = '$option'");
        }

        printOptionStatus($option);
    }