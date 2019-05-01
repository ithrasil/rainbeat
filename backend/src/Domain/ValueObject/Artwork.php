<?php

namespace App\Domain\ValueObject;

use App\Util\DataLoader\ApiProviders;

final class Artwork
{
    private $url;

    public function __construct(Object $data = null, string $source = null)
    {
        switch ($source) {
            case ApiProviders::SOUNDCLOUD:
                $this->fromSoundCloud($data);
                break;
            case ApiProviders::JAMENDO:
                $this->fromJamendo($data);
                break;
        }
    }

    function fromSoundCloud(Object $track): void
    {
        $artwork_url = $track->artwork_url;
        if ($artwork_url == null) {
            $this->url = 'images/500x500.png';
            return;
        }
        $this->url = str_replace('large', 't500x500', $artwork_url);
    }

    function fromJamendo(Object $track): void
    {
        $artwork_url = $track->album_image;
        if ($artwork_url == null) {
            $this->url = 'images/500x500.png';
            return;
        }
        $this->url = str_replace('1.200', '1.500', $artwork_url);
    }

    public function url(): string
    {
        return $this->url;
    }
}

