<?php

namespace App\ValueObjects;

class Artwork extends ApiObject
{
    private $source;

    final function fromSoundCloud(Object $track): void
    {
        $artwork_url = $track->artwork_url;
        if ($artwork_url == null) {
            $this->source = "images/500x500.png";
            return;
        }
        $this->source = str_replace("large", "t500x500", $artwork_url);
    }

    final function fromJamendo(Object $track): void
    {
        $artwork_url = $track->album_image;
        if ($artwork_url == null) {
            $this->source = "images/500x500.png";
            return;
        }
        $this->source = str_replace("1.200", "1.500", $artwork_url);
    }

    final function serialize(): array
    {
        return array(
            "source" => $this->source,
        );
    }
}

