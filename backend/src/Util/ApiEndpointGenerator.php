<?php

namespace App\Util;

use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\RequestedOutputType;

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
                case RequestedOutputType::TRACK:
                    $url .= 'tracks?q=' . $query . '&';
                    break;
                case RequestedOutputType::PLAYLIST:
                    $url .= 'playlists?q=' . $query . '&';
                    break;
                case RequestedOutputType::PLAYLIST_TRACK:
                    $url .= 'playlists/' . $id . '/tracks?';
                    break;
                case RequestedOutputType::ARTIST:
                    $url .= 'users?q=' . $query . '&';
                    break;
                case RequestedOutputType::ARTIST_TRACK:
                    $url .= 'users/' . $id . '/tracks?';
                    break;
            }
            $url .= 'client_id=' . $this->soundcloudId;
        } else if ($source === ApiProviders::JAMENDO) {
            $url .= $this->jamendoPrefixURL;
            switch ($type) {
                case RequestedOutputType::TRACK:
                    $url .= 'tracks?name=' . $query;
                    break;
                case RequestedOutputType::PLAYLIST:
                    $url .= 'playlists?name=' . $query;
                    break;
                case RequestedOutputType::PLAYLIST_TRACK:
                    $url .= 'playlists/tracks?id=' . $id;
                    break;
                case RequestedOutputType::ARTIST:
                    $url .= 'artists?name=' . $query;
                    break;
                case RequestedOutputType::ARTIST_TRACK:
                    $url .= 'artists/tracks?id=' . $id;
                    break;
            }
            $url .= '&client_id=' . $this->jamendoId;
        }
        return $url;
    }
}

