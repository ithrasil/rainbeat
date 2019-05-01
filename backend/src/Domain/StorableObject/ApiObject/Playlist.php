<?php

namespace App\Domain\StorableObject\ApiObject;

use App\Domain\StorableObject\Aggregate\TrackAggregate;
use App\Domain\StorableObject\IStorable;
use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\OutputType;

final class Playlist extends ApiObject implements IStorable
{
    protected $type = OutputType::PLAYLIST;

    protected $id;

    private $name;

    protected $source;

    private $tracks = [];

    private $trackFilled = false;

    function fromSoundCloud(Object $playlist): void
    {
        $this->id = (string)$playlist->id;
        $this->name = $playlist->title;
        $this->source = ApiProviders::SOUNDCLOUD;
    }

    function fromJamendo(Object $playlist): void
    {
        $this->id = $playlist->id;
        $this->name = $playlist->name ?? 'noname';
        $this->source = ApiProviders::JAMENDO;
    }

    function toArray(): array
    {
        if (is_null($this->tracks)) {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'source' => $this->source,
            ];
        } else {
            return [
                'id' => $this->id,
                'name' => $this->name,
                'source' => $this->source,
                'tracks' => $this->mapTracksToArray($this->tracks),
            ];
        }
    }

    static function fromArray(array $array): ApiObject
    {
        $object = new self();
        return $object->hashMapToObject($array);
    }

    public function serialize(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'source' => $this->source,
            'tracks' => $this->mapTracksToKeys($this->tracks),
            'trackFilled' => $this->trackFilled,
        ];
    }

    public function mapTracksToArray(array $tracks): array {
        $arr = [];
        /** @var Track $track */
        foreach ($tracks as $track) {
            $arr[] = $track->toArray();
        }
        return $arr;
    }

    public function mapTracksToKeys(array $tracks): array
    {
        $keys = [];
        foreach ($tracks as $track) {
            $keys[] = $track->primaryKey();
        }
        return $keys;
    }

    public function getStorableChildren(): array
    {
        return $this->tracks;
    }

    public function getChildType(): ?string
    {
        return Track::class;
    }

    public function hashMapToObject(array $array): Playlist
    {
        $this->id = $array['id'];
        $this->name = $array['name'];
        $this->source = $array['source'];
        $this->trackFilled = $array['trackFilled'];

        return $this;
    }

    public function isFilled(): bool
    {
        return $this->trackFilled;
    }

    public function setFilled(): void
    {
        $this->trackFilled = true;
    }

    public function setTracks(Track $track): void
    {
        $this->tracks[] = $track;
    }

    public function getTracks(): array
    {
        return $this->tracks;
    }
}

