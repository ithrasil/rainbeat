<?php

namespace App\ValueObjects;

abstract class ApiAggregate
{
    protected $extended;
    protected $vo;
    protected $items = [];

    public function __construct(array $data, string $source)
    {
        switch($source) {
            case 'soundcloud':
                $this->iterateOver($data, 'soundcloud');
                break;
            case 'jamendo':
                $this->iterateOver($data, 'jamendo');
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
            array_push($this->items, new $this->vo($chunk, $source));
        }
    }

}

