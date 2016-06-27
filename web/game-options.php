<?php
require_once '../include/database.inc.php';

if (isset($_POST['option']))
{
    if ($_POST['option'] == 'check')
    {
        printOptionStatus('level_change');
    }

    if ($_POST['option'] == 'change')
    {
        setOptionLevelStatus('level_change');
    }

    if ($_POST['option'] == 'checkBonus')
    {
        printOptionStatus('speed_bonus');
    }

    if ($_POST['option'] == 'changeBonus')
    {
        setOptionBonusStatus('speed_bonus');
    }

    if ($_POST['option'] == 'checkOptionHide')
    {
        printOptionStatus('hide_bonus');
    }

    if ($_POST['option'] == 'changeOptionHide')
    {
        setOptionBonusStatus('hide_bonus');
    }
}