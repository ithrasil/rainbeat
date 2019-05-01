<?php

namespace App\Domain\StorableObject\Aggregate;

use App\Util\DataLoader\OutputType;
use App\Domain\StorableObject\ApiObject\Track;
use App\Domain\StorableObject\ApiObject\Artist;
use App\Domain\StorableObject\ApiObject\Playlist;

final class ArtistAggregate extends Aggregate
{
    public $type = OutputType::ARTIST;
    protected $valueObjectClassName = Artist::class;
    protected $canAggregateOtherAggregates = true;

    public function getChildType(): ?string
    {
        return Artist::class;
    }

    static function fromArray(array $array): Aggregate
    {
        $object = new self();
        return $object->hashMapToObject($array);
    }
}

