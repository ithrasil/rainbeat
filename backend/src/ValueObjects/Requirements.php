<?php

namespace App\ValueObjects;

class Requirements
{
    private $source;
    private $type;
    private $query;
    private $id;

    public function __construct(string $source, string $type, string $query, string $id='')
    {
        $this->source = $source;
        $this->type = $type;
        $this->query = $query;
        $this->id = $id;
    }

    final public function serialize(): array
    {
        return [
            'source' => $this->source,
            'type' => $this->type,
            'query' => $this->query,
            'id' => $this->id,
        ];
    }

    final public function serializeWithNumericalKeys(): array
    {
        return [
            $this->source,
            $this->type,
            $this->query,
            $this->id,
        ];
    }

    final public function getSource(): string
    {
        return $this->source;
    }

    final public function getType(): string
    {
        return $this->type;
    }

    final public function getQuery(): string
    {
        return $this->query;
    }

    final public function getId(): string
    {
        return $this->id;
    }
}
