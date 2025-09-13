<div class="task-board color-<?= $task['color_id'] ?> <?= $task['date_modification'] > time() - $board_highlight_period ? 'task-board-recent' : '' ?>">
    <div class="task-board-header">
        <strong><?= '#'.$task['id'].' ' ?></strong>

        <?php if (! empty($task['project_name'])): ?>
            <span class="task-board-project"><?= $this->text->e($task['project_name']) ?></span>
        <?php endif ?>

        <?php if (! empty($task['tags'])): ?>
            <div class="task-tags">
                <ul>
                <?php foreach ($task['tags'] as $tag): ?>
                    <li class="task-tag <?= $tag['color_id'] ? "color-{$tag['color_id']}" : '' ?>"><?= $this->text->e($tag['name']) ?></li>
                <?php endforeach ?>
                </ul>
            </div>
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
        'include_tags' => false,
    )) ?>
</div>
