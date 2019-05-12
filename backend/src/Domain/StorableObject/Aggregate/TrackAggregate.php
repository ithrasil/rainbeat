<?php

namespace App\Domain\StorableObject\Aggregate;

use App\Domain\StorableObject\ApiObject\Track;
use App\Util\DataLoader\RequestedOutputType;

final class TrackAggregate extends Aggregate
{
    public $requestedOutputType = RequestedOutputType::TRACK;

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

