<?php

namespace App\Domain\StorableObject\Aggregate;

use App\Domain\StorableObject\ApiObject\Playlist;
use App\Util\DataLoader\RequestedOutputType;
use App\Domain\StorableObject\ApiObject\Track;
use App\Domain\StorableObject\ApiObject\Artist;

final class PlaylistAggregate extends Aggregate
{
    public $type = RequestedOutputType::PLAYLIST;
    protected $valueObjectClassName = Playlist::class;
    protected $canAggregateOtherAggregates = true;

    public function getChildType(): ?string
    {
        return Playlist::class;
    }

    static function fromArray(array $array): Aggregate
    {
        $object = new self();
        return $object->hashMapToObject($array);
    }

}

