<?php

namespace App\Util;

use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\OutputTypes;

class ApiEndpointGenerator
{
    private $soundcloudRoot;
    private $jamendoRoot;
    private $soundcloudId;
    private $jamendoId;

    public function __construct(string $soundcloudRoot, string $jamendoRoot, string $soundcloudId, string $jamendoId)
    {
        $this->soundcloudRoot = $soundcloudRoot;
        $this->jamendoRoot = $jamendoRoot;
        $this->soundcloudId = $soundcloudId;
        $this->jamendoId = $jamendoId;
    }

    final public function generate(string $source, string $type, string $query, string $id=''): string
    {
        $url = '';
        if ($source === ApiProviders::SOUNDCLOUD) {
            $url .= $this->soundcloudRoot;
            switch ($type) {
                case OutputTypes::TRACK:
                    $url .= 'tracks?q=' . $query . '&';
                    break;
                case OutputTypes::PLAYLIST:
                    $url .= 'playlists?q=' . $query . '&';
                    break;
                case OutputTypes::PLAYLIST_TRACKS:
                    $url .= 'playlists/' . $id . '/tracks?';
                    break;
                case OutputTypes::ARTIST:
                    $url .= 'users?q=' . $query . '&';
                    break;
                case OutputTypes::ARTIST_TRACKS:
                    $url .= 'users/' . $id . '/tracks?';
                    break;
            }
            $url .= 'client_id=' . $this->soundcloudId;
        } else if ($source === ApiProviders::JAMENDO) {
            $url .= $this->jamendoRoot;
            switch ($type) {
                case OutputTypes::TRACK:
                    $url .= 'tracks?name=' . $query;
                    break;
                case OutputTypes::PLAYLIST:
                    $url .= 'playlists?name=' . $query;
                    break;
                case OutputTypes::PLAYLIST_TRACKS:
                    $url .= 'playlists/tracks?id=' . $id;
                    break;
                case OutputTypes::ARTIST:
                    $url .= 'artists?name=' . $query;
                    break;
                case OutputTypes::ARTIST_TRACKS:
                    $url .= 'artists/tracks?id=' . $id;
                    break;
            }
            $url .= '&client_id=' . $this->jamendoId;
        }
        return $url;
    }
}

