<?php

namespace App\ValueObjects;

class Artist extends ApiObject
{
    private $id;

    private $name;

    private $source;

    final function fromSoundCloud(Object $artist): void
    {
        $this->id = (string) $artist->id;
        $this->name = $artist->username;
        $this->source = 'soundcloud';
    }

    final function fromJamendo(Object $artist): void
    {
        $this->id = $artist->id;
        $this->name = $artist->name;
        $this->source = 'jamendo';
    }

    final function serialize(): array
    {
        return array(
            'id' => $this->id,
            'name' => $this->name,
            'source' => $this->source,
        );
    }
}

