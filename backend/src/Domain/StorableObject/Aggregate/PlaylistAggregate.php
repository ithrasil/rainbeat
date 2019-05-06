<?php

namespace App\Domain\StorableObject\Aggregate;

use App\Domain\StorableObject\ApiObject\Playlist;
use App\Util\DataLoader\RequestedOutputType;

final class PlaylistAggregate extends Aggregate
{
    public $requestedOutputType = RequestedOutputType::PLAYLIST;

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

