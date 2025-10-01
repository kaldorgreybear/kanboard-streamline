<?php
global $themeOxygenConfig;

$logoPath = $this->url->dir() . 'assets/img/logo.svg';
if (isset($themeOxygenConfig['logo'])) {
    $logoPath = $this->url->dir() . 'plugins/Oxygen/Assets/images/' . $themeOxygenConfig['logo'];
}

$logoImage = sprintf(
    '<img src="%s" class="logo-image" alt="%s">',
    $logoPath,
    $this->text->e(t('Kanboard'))
);
?>
<h1>
    <span class="logo">
        <?= $this->url->link($logoImage, 'DashboardController', 'show', array(), false, '', t('Dashboard')) ?>
    </span>
</h1>
