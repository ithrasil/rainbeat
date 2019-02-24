<?php

namespace App\ValueObjects;

class Playlist extends ApiObject
{
    private $id;

    private $name;

    private $source;

    final function fromSoundCloud(Object $playlist): void
    {
        $this->id = (string) $playlist->id;
        $this->name = $playlist->title;
        $this->source = 'soundcloud';
    }

    final function fromJamendo(Object $playlist): void
    {
        $this->id = $playlist->id;
        $this->name = $playlist->name ?? "noname";
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

