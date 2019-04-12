<?php

namespace App\ValueObjects;

use App\Util\DataLoader\ApiProviders;

class Playlist extends ApiObject
{
    private $id;

    private $name;

    private $source;

    final function fromSoundCloud(Object $playlist): void
    {
        $this->id = (string) $playlist->id;
        $this->name = $playlist->title;
        $this->source = ApiProviders::SOUNDCLOUD;
    }

    final function fromJamendo(Object $playlist): void
    {
        $this->id = $playlist->id;
        $this->name = $playlist->name ?? "noname";
        $this->source = ApiProviders::JAMENDO;
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

