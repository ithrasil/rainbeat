<?php

namespace App\ValueObjects;

abstract class ApiObject
{
    public function __construct(Object $data, string $source)
    {
        switch($source) {
            case 'soundcloud':
                $this->fromSoundCloud($data);
                break;
            case 'jamendo':
                $this->fromJamendo($data);
                break;
        }
    }

    abstract public function fromSoundCloud(Object $data): void;
    abstract public function fromJamendo(Object $data): void;
    abstract public function serialize(): array;
}

