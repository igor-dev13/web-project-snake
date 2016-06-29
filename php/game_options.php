<?php
require_once 'include/database.inc.php';

if (isset($_POST['option']))
{
    $gameOption = $_POST['option'];

    if ($gameOption == 'checkLevel')
    {
        printOptionStatus('level_change');
    }

    if ($gameOption == 'changeLevel')
    {
        setOptionLevelStatus('level_change');
    }

    if ($gameOption == 'checkBonus')
    {
        printOptionStatus('speed_bonus');
    }

    if ($gameOption == 'changeBonus')
    {
        setOptionBonusStatus('speed_bonus');
    }

    if ($gameOption == 'checkOptionHide')
    {
        printOptionStatus('hide_bonus');
    }

    if ($gameOption == 'changeOptionHide')
    {
        setOptionBonusStatus('hide_bonus');
    }
}