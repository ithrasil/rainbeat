<?php

namespace App\Domain\ValueObject;

final class Requirements
{
    private $source;
    private $type;
    private $query;
    private $id;

    function __construct(string $source, string $type, string $query, string $id='')
    {
        $this->source = $source;
        $this->type = $type;
        $this->query = $query;
        $this->id = $id;
    }

    public function toArray(): array
    {
        return [
            'source' => $this->source,
            'type' => $this->type,
            'query' => $this->query,
            'id' => $this->id,
        ];
    }

    public function toArrayWithNumericalKeys(): array
    {
        return [
            $this->source,
            $this->type,
            $this->query,
            $this->id,
        ];
    }

    public function getSource(): string
    {
        return $this->source;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getQuery(): string
    {
        return $this->query;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function setType(string $type): void {
        $this->type = $type;
    }

}
