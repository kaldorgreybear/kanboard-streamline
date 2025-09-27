<?php

namespace KanboardTests\units\Model;

use KanboardTests\units\Base;
use Kanboard\Model\ColorModel;
use Kanboard\Model\ConfigModel;

class ColorModelTest extends Base
{
    public function testFind()
    {
        $colorModel = new ColorModel($this->container);
        $this->assertEquals('yellow', $colorModel->find('yellow'));
        $this->assertEquals('yellow', $colorModel->find('Yellow'));
        $this->assertEquals('dark_grey', $colorModel->find('Dark Grey'));
        $this->assertEquals('dark_grey', $colorModel->find('dark_grey'));
    }

    public function testGetColorProperties()
    {
        $colorModel = new ColorModel($this->container);
        $expected = array(
            'name' => 'Light Green',
            'background' => '#dcedc8',
            'border' => '#689f38',
        );

        $this->assertEquals($expected, $colorModel->getColorProperties('light_green'));

        $expected = array(
            'name' => 'Dirty Green',
            'background' => '#d4e7d0',
            'border' => '#6b8f71',
        );

        $this->assertEquals($expected, $colorModel->getColorProperties('dirty_green'));

        $expected = array(
            'name' => 'Yellow',
            'background' => '#f5f7c4',
            'border' => '#dfe32d',
        );

        $this->assertEquals($expected, $colorModel->getColorProperties('foobar'));
    }

    public function testGetList()
    {
        $colorModel = new ColorModel($this->container);

        $colors = $colorModel->getList();
        $this->assertCount(18, $colors);
        $this->assertEquals('Yellow', $colors['yellow']);

        $colors = $colorModel->getList(true);
        $this->assertCount(18, $colors);
        $this->assertEquals('All colors', $colors['']);
        $this->assertEquals('Yellow', $colors['yellow']);
    }

    public function testGetDefaultColor()
    {
        $colorModel = new ColorModel($this->container);
        $configModel = new ConfigModel($this->container);

        $this->assertEquals('yellow', $colorModel->getDefaultColor());

        $this->container['memoryCache']->flush();
        $this->assertTrue($configModel->save(array('default_color' => 'red')));
        $this->assertEquals('red', $colorModel->getDefaultColor());
    }

    public function testGetDefaultColors()
    {
        $colorModel = new ColorModel($this->container);

        $colors = $colorModel->getDefaultColors();
        $this->assertCount(18, $colors);
    }

    public function testGetBorderColor()
    {
        $colorModel = new ColorModel($this->container);
        $this->assertEquals('#4ae371', $colorModel->getBorderColor('green'));
    }

    public function testGetBackgroundColor()
    {
        $colorModel = new ColorModel($this->container);
        $this->assertEquals('#bdf4cb', $colorModel->getBackgroundColor('green'));
    }

    public function testGetCss()
    {
        $colorModel = new ColorModel($this->container);
        $css = $colorModel->getCss();

        $this->assertStringStartsWith('.task-board.color-yellow', $css);
        $this->assertStringContainsString('.task-board.color-yellow .task-board-project, .task-board.color-yellow .task-tags .task-tag, .task-summary-container.color-yellow .task-tags .task-tag {background-color: #fbfce4;border-color: #dfe32d;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-tag.color-yellow {background-color: #fbfce4;border-color: #dfe32d;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-board-assignee-tag.color-yellow {background-color: #f5f7c4;border-color: #dfe32d;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-board.color-purple .task-board-project, .task-board.color-purple .task-tags .task-tag, .task-summary-container.color-purple .task-tags .task-tag {background-color: #f2c8ff;border-color: #cd85fe;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-tag.color-purple, .task-board-assignee-tag.color-purple {background-color: #f2c8ff;border-color: #cd85fe;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-board-assignee-tag.color-purple {background-color: #dfb0ff;border-color: #cd85fe;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-tag.color-green, .task-board-assignee-tag.color-green {background-color: #ddfbeb;border-color: #4ae371;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-board-assignee-tag.color-green {background-color: #bdf4cb;border-color: #4ae371;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-board.color-deep_purple, .task-summary-container.color-deep_purple, .color-picker-square.color-deep_purple, .task-board-category.color-deep_purple, .table-list-category.color-deep_purple {background-color: transparent;border-color: #610288;}', $css);
        $this->assertStringContainsString('.task-board.color-deep_purple .task-board-project, .task-board.color-deep_purple .task-tags .task-tag, .task-summary-container.color-deep_purple .task-tags .task-tag {background-color: #dfc5fe;border-color: #610288;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-tag.color-deep_purple {background-color: #dfc5fe;border-color: #610288;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-board-assignee-tag.color-deep_purple {background-color: #dfc5fe;border-color: #610288;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-board.color-dirty_green .task-board-project, .task-board.color-dirty_green .task-tags .task-tag, .task-summary-container.color-dirty_green .task-tags .task-tag {background-color: #ecf5e8;border-color: #6b8f71;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-tag.color-dirty_green {background-color: #ecf5e8;border-color: #6b8f71;font-weight: bold;}', $css);
        $this->assertStringContainsString('.task-board-assignee-tag.color-dirty_green {background-color: #ecf5e8;border-color: #6b8f71;font-weight: bold;}', $css);
    }
}
