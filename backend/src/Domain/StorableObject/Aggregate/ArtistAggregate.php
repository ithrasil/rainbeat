<?php

namespace App\Domain\StorableObject\Aggregate;

use App\Util\DataLoader\RequestedOutputType;
use App\Domain\StorableObject\ApiObject\Track;
use App\Domain\StorableObject\ApiObject\Artist;
use App\Domain\StorableObject\ApiObject\Playlist;

final class ArtistAggregate extends Aggregate
{
    public $requestedOutputType = RequestedOutputType::ARTIST;

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

