<?php

namespace App\ValueObjects;

use App\Util\DataLoader\ApiProviders;

class Artist extends ApiObject
{
    private $id;

    private $name;

    private $source;

    final function fromSoundCloud(Object $artist): void
    {
        $this->id = (string) $artist->id;
        $this->name = $artist->username;
        $this->source = ApiProviders::SOUNDCLOUD;
    }

    final function fromJamendo(Object $artist): void
    {
        $this->id = $artist->id;
        $this->name = $artist->name;
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

