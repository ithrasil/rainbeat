<?php

namespace App\Util;

use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\OutputType;

final class ApiEndpointGenerator
{
    private $soundcloudPrefixURL;
    private $jamendoPrefixURL;
    private $soundcloudId;
    private $jamendoId;

    public function __construct(string $soundcloudPrefixURL, string $jamendoPrefixURL, string $soundcloudId, string $jamendoId)
    {
        $this->soundcloudPrefixURL = $soundcloudPrefixURL;
        $this->jamendoPrefixURL = $jamendoPrefixURL;
        $this->soundcloudId = $soundcloudId;
        $this->jamendoId = $jamendoId;
    }

    final public function generate(string $source, string $type, string $query, string $id=''): string
    {
        $url = '';
        if ($source === ApiProviders::SOUNDCLOUD) {
            $url .= $this->soundcloudPrefixURL;
            switch ($type) {
                case OutputType::TRACK:
                    $url .= 'tracks?q=' . $query . '&';
                    break;
                case OutputType::PLAYLIST:
                    $url .= 'playlists?q=' . $query . '&';
                    break;
                case OutputType::PLAYLIST_TRACK:
                    $url .= 'playlists/' . $id . '/tracks?';
                    break;
                case OutputType::ARTIST:
                    $url .= 'users?q=' . $query . '&';
                    break;
                case OutputType::ARTIST_TRACK:
                    $url .= 'users/' . $id . '/tracks?';
                    break;
            }
            $url .= 'client_id=' . $this->soundcloudId;
        } else if ($source === ApiProviders::JAMENDO) {
            $url .= $this->jamendoPrefixURL;
            switch ($type) {
                case OutputType::TRACK:
                    $url .= 'tracks?name=' . $query;
                    break;
                case OutputType::PLAYLIST:
                    $url .= 'playlists?name=' . $query;
                    break;
                case OutputType::PLAYLIST_TRACK:
                    $url .= 'playlists/tracks?id=' . $id;
                    break;
                case OutputType::ARTIST:
                    $url .= 'artists?name=' . $query;
                    break;
                case OutputType::ARTIST_TRACK:
                    $url .= 'artists/tracks?id=' . $id;
                    break;
            }
            $url .= '&client_id=' . $this->jamendoId;
        }
        return $url;
    }
}

