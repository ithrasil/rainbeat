<?php

namespace App\ValueObjects;

use App\Util\DataLoader\ApiProviders;

abstract class ApiObject
{
    public function __construct(Object $data, string $source)
    {
        switch($source) {
            case ApiProviders::SOUNDCLOUD:
                $this->fromSoundCloud($data);
                break;
            case ApiProviders::JAMENDO:
                $this->fromJamendo($data);
                break;
        }
    }

    abstract public function fromSoundCloud(Object $data): void;
    abstract public function fromJamendo(Object $data): void;
    abstract public function serialize(): array;
}

