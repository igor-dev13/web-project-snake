<?php
require_once 'include/database.inc.php';

$gameOption = $_POST['option'];

if (isset($gameOption))
{
    if ($gameOption == 'check')
    {
        printOptionStatus('level_change');
    }

    if ($gameOption == 'change')
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