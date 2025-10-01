<?php
$logoImage = sprintf(
    '<img src="%sassets/img/logo.svg" class="logo-image" alt="%s">',
    $this->url->dir(),
    $this->text->e(t('Kanboard'))
);
?>
<h1>
    <span class="logo">
        <?= $this->url->link($logoImage, 'DashboardController', 'show', array(), false, '', t('Dashboard')) ?>
    </span>
</h1>
