<?php

namespace App\Domain\StorableObject\Aggregate;

use App\Domain\StorableObject\IStorable;
use App\Domain\StorableObject\ApiObject\Track;
use App\Domain\StorableObject\ApiObject\Artist;
use App\Domain\StorableObject\ApiObject\Playlist;
use App\Domain\ValueObject\Requirements;

abstract class Aggregate implements IStorable
{
    public $type;
    protected $canAggregateOtherAggregates;
    protected $valueObjectClassName;
    protected $query;
    protected $source;
    /**
     * @var Track[]|Artist[]|Playlist[]
     */
    protected $apiObjects = [];

    final public function __construct(array $blob = null, Requirements $requirements = null)
    {
        if (isset($blob) && isset($requirements)) {
            $this->query = $requirements->getQuery();
            $this->source = $requirements->getSource();
            $this->aggregate($blob, $requirements->getSource());
        }
    }

    final public function toArray(): array
    {
        $StorableObjectAsArrays = [];
        /**
         * @var $apiObject Track|Artist|Playlist
         */
        foreach ($this->apiObjects as $apiObject) {
            array_push($StorableObjectAsArrays, $apiObject->toArray());
        }
        return $StorableObjectAsArrays;
    }

    final public function aggregate(array $blob, string $source): void
    {
        foreach ($blob as $item) {
            $className = $this->valueObjectClassName;
            /** @var Track|Artist|Playlist $newObject */
            $newObject = new $className($item, $source);
            array_push($this->apiObjects, $newObject);
        }
    }

    final public function primaryKeys(): array
    {
        $keys = [];

        foreach ($this->apiObjects as $storableObject) {
            array_push($keys, $storableObject->primaryKey());
        }
        return $keys;
    }

    final public function createPath(): string
    {
        return 'aggregate/' . $this->type . '/' . $this->source . '/' . $this->query . '.';
    }

    final public function addToApiObject(IStorable $storable): void {
        $this->apiObjects[] = $storable;
    }

    final public function serialize(): array
    {
        return [
            'type' => $this->type,
            'canAggregateOtherAggregates' => $this->canAggregateOtherAggregates,
            'valueObjectClassName' => $this->valueObjectClassName,
            'query' => $this->query,
            'source' => $this->source,
            'apiObjects' => $this->primaryKeys(),
        ];
    }

    final public function hashMapToObject(array $array): Aggregate
    {
        $this->type = $array['type'];
        $this->canAggregateOtherAggregates = $array['canAggregateOtherAggregates'];
        $this->valueObjectClassName = $array['valueObjectClassName'];
        $this->query = $array['query'];
        $this->source = $array['source'];

        return $this;
    }

    static function getFileLocation(Requirements $requirements, array $data): string
    {
        return 'aggregate/' . $requirements->getType() . '/' .
            $requirements->getSource() . '/' . $requirements->getQuery() . '.';
    }

    final public function getStorableChildren(): array
    {
        return $this->apiObjects;
    }
}
