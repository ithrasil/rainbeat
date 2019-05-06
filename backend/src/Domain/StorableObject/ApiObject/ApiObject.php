<?php

namespace App\Domain\StorableObject\ApiObject;

use App\Domain\StorableObject\Storable;
use App\Domain\ValueObject\Requirements;
use App\Util\DataLoader\ApiProviders;

abstract class ApiObject implements Storable
{
    protected $id;

    protected $requestedOutputType;
    
    protected $source;

    public function __construct(Object $data = null, string $source = null)
    {
        switch ($source) {
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

    final public function primaryKey(): string
    {
        return $this->id;
    }

    final public function createPath(): string
    {
        return $this->requestedOutputType . '/' . $this->source . '/' . $this->primaryKey() . '.';
    }

    static function getFileLocation(Requirements $requirements, array $data): string
    {
        return $requirements->getType() . '/' . $requirements->getSource() . '/' . $data['id'] . '.';
    }
}

