<?php if (! empty($task['owner_id'])): ?>
<div class="task-board-avatars">
    <?php if ($this->user->hasProjectAccess('TaskModificationController', 'edit', $task['project_id'])): ?>
    <span class="task-board-change-assignee" data-url="<?= $this->url->href('TaskModificationController', 'edit', array('task_id' => $task['id'])) ?>">
    <?php else: ?>
    <span>
    <?php endif ?>
        <span class="task-tag task-board-assignee-tag <?= ! empty($task['color_id']) ? 'color-'.$task['color_id'] : '' ?>">
            <?= $this->text->e($task['assignee_name'] ?: $task['assignee_username']) ?>
        </span>
    </span>
</div>
<?php endif ?>
