<?php
$_logo = $this->render('header/logo');
$_title = $this->render('header/title', array(
    'project' => isset($project) ? $project : null,
    'task' => isset($task) ? $task : null,
    'description' => isset($description) ? $description : null,
    'title' => $title,
));

$_menu_items = array_filter(array(
    $_title,
    $this->render('header/user_notifications'),
    $this->render('header/creation_dropdown'),
    $this->render('header/user_dropdown'),
));
?>

<header>
    <div class="title-container">
        <?= $_logo ?>
    </div>
    <div class="board-selector-container">
        <?php if (! empty($board_selector)): ?>
            <?= $this->render('header/board_selector', array('board_selector' => $board_selector)) ?>
        <?php endif ?>
    </div>
    <div class="menus-container">
        <?= implode('&nbsp;', $_menu_items) ?>
    </div>
</header>
