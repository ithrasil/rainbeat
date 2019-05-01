<?php

namespace App\Domain\StorableObject\ApiObject;

use App\Domain\StorableObject\IStorable;
use App\Domain\ValueObject\Requirements;
use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\OutputType;
use App\Domain\ValueObject\Artwork;

final class Track extends ApiObject implements IStorable
{
    protected $type = OutputType::TRACK;
    private $artistName;

    private $bigArtwork;

    protected $id;

    private $name;

    protected $source;

    private $stream;

    function fromSoundCloud(Object $track): void
    {
        $this->bigArtwork = (new Artwork($track, ApiProviders::SOUNDCLOUD))->url();
        $this->artistName = $track->user->username;
        $this->source = ApiProviders::SOUNDCLOUD;
        $this->stream = $track->uri . '/stream' . '?client_id=' . 'stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv';
        $this->name = $track->title;
        $this->id = (string) $track->id;
    }

    function fromJamendo(Object $track): void
    {
        $this->bigArtwork = (new Artwork($track, ApiProviders::JAMENDO))->url();
        $this->artistName = $track->artist_name;
        $this->source = ApiProviders::JAMENDO;
        $this->stream = $track->audio . '?client_id=' . '97cc45f7';
        $this->name = $track->name;
        $this->id = $track->id;
    }

    function toArray(): array
    {
        return [
            'big_artwork' => $this->bigArtwork,
            'artist_name' => $this->artistName,
            'source' => $this->source,
            'stream' => $this->stream,
            'name' => $this->name,
            'id' => $this->id,
        ];
    }

    static function fromArray(array $array): ApiObject
    {
        $object = new self();
        return $object->hashMapToObject($array);
    }

    public function serialize(): array
    {
        return $this->toArray();
    }

    public function getStorableChildren(): array
    {
        return [];
    }

    public function getChildType(): ?string
    {
        return null;
    }

    public function hashMapToObject(array $array): Track
    {
        $this->bigArtwork = $array['big_artwork'];
        $this->artistName = $array['artist_name'];
        $this->source = $array['source'];
        $this->stream = $array['stream'];
        $this->name = $array['name'];
        $this->id = $array['id'];

        return $this;
    }

    static function getFileLocation(Requirements $requirements, array $data): string
    {
        return 'track/' . $requirements->getSource() . '/' . $data['id'] . '.';
    }
}
