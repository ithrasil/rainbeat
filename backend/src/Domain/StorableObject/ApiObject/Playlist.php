<?php

namespace App\Domain\StorableObject\ApiObject;

use App\Domain\StorableObject\Storable;
use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\RequestedOutputType;

final class Playlist extends ApiObject implements Storable
{
    use AggregatesTracks;

    protected $requestedOutputType = RequestedOutputType::PLAYLIST;

    protected $id;

    private $name;

    protected $source;

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
        return [
            'id' => $this->id,
            'name' => $this->name,
            'source' => $this->source,
            'tracks' => $this->mapTracksToArray($this->tracks),
        ];
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

    public function hashMapToObject(array $array): Playlist
    {
        $this->id = $array['id'];
        $this->name = $array['name'];
        $this->source = $array['source'];
        $this->trackFilled = $array['trackFilled'];

        return $this;
    }
}

