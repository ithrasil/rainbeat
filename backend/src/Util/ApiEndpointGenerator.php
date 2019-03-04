<?php

namespace App\Util;

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
        if ($source === 'soundcloud') {
            $url .= $this->soundcloudRoot;
            switch ($type) {
                case 'tracks':
                    $url .= 'tracks?q=' . $query . '&';
                    break;
                case 'playlists':
                    $url .= 'playlists?q=' . $query . '&';
                    break;
                case 'playlist_tracks':
                    $url .= 'playlists/' . $id . '/tracks?';
                    break;
                case 'artists':
                    $url .= 'users?q=' . $query . '&';
                    break;
                case 'artist_tracks':
                    $url .= 'users/' . $id . '/tracks?';
                    break;
            }
            $url .= 'client_id=' . $this->soundcloudId;
        } else if ($source === 'jamendo') {
            $url .= $this->jamendoRoot;
            switch ($type) {
                case 'tracks':
                    $url .= 'tracks?name=' . $query;
                    break;
                case 'playlists':
                    $url .= 'playlists?name=' . $query;
                    break;
                case 'playlist_tracks':
                    $url .= 'playlists/tracks?id=' . $id;
                    break;
                case 'artists':
                    $url .= 'artists?name=' . $query;
                    break;
                case 'artist_tracks':
                    $url .= 'artists/tracks?id=' . $id;
                    break;
            }
            $url .= '&client_id=' . $this->jamendoId;
        }
        return $url;
    }
}

