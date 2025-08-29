<div class="task-board color-<?= $task['color_id'] ?> <?= $task['date_modification'] > time() - $board_highlight_period ? 'task-board-recent' : '' ?>">
    <div class="task-board-header">
        <strong><?= '#'.$task['id'].' ' ?></strong>

        <?php if (! empty($task['category_id'])): ?>
            <span class="task-board-category category-<?= $this->text->e($task['category_name']) ?> <?= $task['category_color_id'] ? "color-{$task['category_color_id']}" : '' ?>">
                <?= $this->text->e($task['category_name']) ?>
            </span>
        <?php endif ?>

        <?= $this->render('board/task_avatar', array('task' => $task)) ?>
    </div>

    <?= $this->hook->render('template:board:public:task:before-title', array('task' => $task)) ?>
    <div class="task-board-title">
        <?= $this->url->link($this->text->e($task['title']), 'TaskViewController', 'readonly', array('task_id' => $task['id'], 'token' => $project['token'])) ?>
    </div>
    <?= $this->hook->render('template:board:public:task:after-title', array('task' => $task)) ?>

    <?= $this->render('board/task_footer', array(
        'task' => $task,
        'not_editable' => $not_editable,
        'project' => $project,
        'include_category' => false,
    )) ?>
</div>
