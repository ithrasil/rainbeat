<?php

namespace App\Util\Unifier;

trait CommonUnifierMethods
{
    protected function fromSoundcloudTrack($track, string $name=null): array
    {
        return array(
            "big_artwork" => $this->scGetArtwork($track),
            "artist_name" => $track->user->username ?? $name,
            "source" => "soundcloud",
            "stream" => $track->uri . "/stream" . '?client_id=' . "stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv",
            "name" => $track->title,
            "id" => $track->id
        );
    }

    protected function fromJamendoTrack($track): array
    {
        return array(
            "big_artwork" => $this->jamendoGetArtwork($track),
            "artist_name" => $track->artist_name,
            "source" => "jamendo",
            "stream" => $track->audio . '?client_id=' . "97cc45f7",
            "name" => $track->name,
            "id" => $track->id
        );
    }

    protected function fromSoundcloudArtist($artist): array
    {
        return array(
            "name" => $artist->username,
            "source" => "soundcloud",
            "id" => $artist->id
        );
    }

    protected function fromJamendoArtist($artist): array
    {
        return array(
            "name" => $artist->name,
            "source" => "jamendo",
            "id" => $artist->id
        );
    }

    protected function fromSoundcloudPlaylist($playlist): array
    {
        return array(
            "name" => $playlist->title,
            "source" => "soundcloud",
            "id" => $playlist->id
        );
    }
    protected function fromJamendoPlaylist($playlist): array
    {
        return array(
            "name" => $playlist->name ?? "noname",
            "source" => "jamendo",
            "id" => $playlist->id
        );
    }

    protected function jamendoGetArtwork($track): string
    {
        $artwork_url = $track->album_image;
        if ($artwork_url == null) {
            return "images/500x500.png";
        }
        return str_replace("1.200", "1.500", $artwork_url);
    }

    protected function scGetArtwork($track): string
    {
        $artwork_url = $track->artwork_url;
        if ($artwork_url == null) {
            return "images/500x500.png";
        }
        return str_replace("large", "t500x500", $artwork_url);
    }

}