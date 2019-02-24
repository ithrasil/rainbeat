<?php

namespace App\ValueObjects;

class Track extends ApiObject
{
    private $artistName;
    /**
     * @var Artwork|Null
     */
    private $bigArtwork;

    private $id;

    private $name;

    private $source;

    private $stream;

    final function fromSoundCloud(Object $track): void
    {
        $this->bigArtwork = new Artwork($track, 'soundcloud');
        $this->artistName = $track->user->username;
        $this->source = 'soundcloud';
        $this->stream = $track->uri . '/stream' . '?client_id=' . 'stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv';
        $this->name = $track->title;
        $this->id = (string) $track->id;
    }

    final function fromJamendo(Object $track): void
    {
        $this->bigArtwork = new Artwork($track, 'jamendo');
        $this->artistName = $track->artist_name;
        $this->source = 'jamendo';
        $this->stream = $track->audio . '?client_id=' . '97cc45f7';
        $this->name = $track->name;
        $this->id = $track->id;
    }

    final function serialize(): array
    {
        return array(
            'big_artwork' => $this->bigArtwork->serialize()['source'],
            'artist_name' => $this->artistName,
            'source' => $this->source,
            'stream' => $this->stream,
            'name' => $this->name,
            'id' => $this->id,
        );
    }
}

