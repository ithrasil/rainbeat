<?php

namespace App\Domain\StorableObject\ApiObject;

trait AggregatesTracks
{
    private $tracks = [];

    private $trackFilled = false;

    final public function addTrack(Track $track): void
    {
        $this->tracks[] = $track;
    }

    final public function getTracks(): array
    {
        return $this->tracks;
    }

    final public function mapTracksToArray(array $tracks): array
    {
        $arr = [];
        /** @var Track $track */
        foreach ($tracks as $track) {
            $arr[] = $track->toArray();
        }
        return $arr;
    }

    final public function mapTracksToKeys(array $tracks): array
    {
        $keys = [];
        /** @var Track $track */
        foreach ($tracks as $track) {
            $keys[] = $track->primaryKey();
        }
        return $keys;
    }

    final public function getChildType(): ?string
    {
        return Track::class;
    }

    final public function getStorableChildren(): array
    {
        return $this->tracks;

    }

    final public function isFilled(): bool
    {
        return $this->trackFilled;
    }

    final public function setFilled(): void
    {
        $this->trackFilled = true;
    }
}
