<?php
    // Allow callers to hide the category section when it is rendered elsewhere
    $include_category = $include_category ?? true;
?>

<?php if ($include_category && ! empty($task['category_id'])): ?>
<div class="task-board-category-container task-board-category-container-color">
    <span class="task-board-category category-<?= $this->text->e($task['category_name']) ?> <?= $task['category_color_id'] ? "color-{$task['category_color_id']}" : '' ?>">
        <?php if ($not_editable): ?>
            <?= $this->text->e($task['category_name']) ?>
        <?php else: ?>
            <?= $this->url->link(
                $this->text->e($task['category_name']),
                'TaskModificationController',
                'edit',
                array('task_id' => $task['id']),
                false,
                'js-modal-large' . (! empty($task['category_description']) ? ' tooltip' : ''),
                t('Change category')
            ) ?>
            <?php if (! empty($task['category_description'])): ?>
                <?= $this->app->tooltipMarkdown($task['category_description']) ?>
            <?php endif ?>
        <?php endif ?>
    </span>
</div>
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

<?= $this->hook->render('template:board:task:footer', array('task' => $task)) ?>
