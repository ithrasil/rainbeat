<?php

namespace App\ValueObjects;

use App\Util\DataLoader\ApiProviders;

abstract class ApiAggregate
{
    protected $extended;
    protected $valueObject;
    protected $items = [];

    public function __construct(array $data, string $source)
    {
        switch($source) {
            case ApiProviders::SOUNDCLOUD:
                $this->iterateOver($data, ApiProviders::SOUNDCLOUD);
                break;
            case ApiProviders::JAMENDO:
                $this->iterateOver($data, ApiProviders::JAMENDO);
                break;
        }
    }

    final public function serialize(): array
    {
        $items = [];
        foreach($this->items as $item) {
            array_push($items, $item->serialize());
        }
        return ['items' => $items];
    }

    final public function iterateOver(array $data, string $source): void {
        foreach ($data as $chunk) {
            array_push($this->items, new $this->valueObject($chunk, $source));
        }
    }

}

