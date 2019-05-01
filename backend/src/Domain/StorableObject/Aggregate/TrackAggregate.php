<?php

namespace App\Domain\StorableObject\Aggregate;

use App\Domain\StorableObject\ApiObject\Track;
use App\Util\DataLoader\OutputType;
use App\Domain\StorableObject\ApiObject\Artist;
use App\Domain\StorableObject\ApiObject\Playlist;

final class TrackAggregate extends Aggregate
{
    public $type = OutputType::TRACK;
    protected $valueObjectClassName = Track::class;
    protected $canAggregateOtherAggregates = false;

    public function getChildType(): ?string
    {
        return Track::class;
    }

    static function fromArray(array $array): Aggregate
    {
        $object = new self();
        return $object->hashMapToObject($array);
    }
}

