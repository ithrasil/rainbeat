<?php

namespace App\Utils\Unifiers;

class TrackUnifier
{
    public function scUnify(array $tracks): array
    {

        $unified = array();

        foreach ($tracks as $track) {

            array_push($unified,
                array(
                    "big_artwork" => $this->scGetArtwork($track),
                    "artist_name" => $track->user->username,
                    "source" => "soundcloud",
                    "stream" => $track->uri . "/stream" . '?client_id=' . "stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv",
                    "name" => $track->title
                )
            );
        }

        return $unified;
    }

    private function scGetArtwork($track): string
    {
        $artwork_url = $track->artwork_url;
        if ($artwork_url == null) {
            return "images/500x500.png";
        }
        return str_replace("large", "t500x500", $artwork_url);
    }

    public function jamendoUnify($tracks, $name=null): array
    {

        $unified = array();

        foreach ($tracks as $track) {

            array_push($unified,
                array(
                    "big_artwork" => $this->jamendoGetArtwork($track),
                    "artist_name" => $track->artist_name ?? $name,
                    "source" => "jamendo",
                    "stream" => $track->audio . '?client_id=' . "97cc45f7",
                    "name" => $track->name
                )
            );
        }

        return $unified;
    }

    private function jamendoGetArtwork($track): string
    {
        $artwork_url = $track->album_image;
        if ($artwork_url == null) {
            return "images/500x500.png";
        }
        return str_replace("1.200", "1.500", $artwork_url);
    }
}