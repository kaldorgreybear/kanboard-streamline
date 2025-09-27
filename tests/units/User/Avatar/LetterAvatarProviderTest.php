<?php

namespace KanboardTests\units\User\Avatar;

use KanboardTests\units\Base;
use Kanboard\User\Avatar\LetterAvatarProvider;

class LetterAvatarProviderTest extends Base
{
    public function testGetBackgroundColor()
    {
        $provider = new LetterAvatarProvider($this->container);
        $rgb = $provider->getBackgroundColor('Test');
        $this->assertEquals(array(107, 83, 172), $rgb);
    }

    public function testIsActive()
    {
        $provider = new LetterAvatarProvider($this->container);
        $this->assertTrue($provider->isActive(array()));
    }

    public function testRenderWithFullName()
    {
        $provider = new LetterAvatarProvider($this->container);
        $user = array('id' => 123, 'name' => 'Kanboard Admin', 'username' => 'bob', 'email' => '');
        $expected = '<div class="avatar-letter" style="background-color: #78533a" title="Kanboard Admin" role="img" aria-label="Kanboard Admin">Kanboard Admin</div>';
        $this->assertEquals($expected, $provider->render($user, 48));
    }

    public function testRenderWithUsername()
    {
        $provider = new LetterAvatarProvider($this->container);
        $user = array('id' => 123, 'name' => '', 'username' => 'admin', 'email' => '');
        $expected = '<div class="avatar-letter" style="background-color: #862d84" title="admin" role="img" aria-label="admin">admin</div>';
        $this->assertEquals($expected, $provider->render($user, 48));
    }

    public function testRenderWithUTF8()
    {
        $provider = new LetterAvatarProvider($this->container);
        $user = array('id' => 123, 'name' => 'ü', 'username' => 'admin', 'email' => '');
        $expected = '<div class="avatar-letter" style="background-color: #3e931f" title="ü" role="img" aria-label="ü">ü</div>';
        $this->assertEquals($expected, $provider->render($user, 48));
    }
}
