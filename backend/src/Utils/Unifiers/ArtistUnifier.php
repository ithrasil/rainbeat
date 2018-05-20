<?php

namespace App\Utils\Unifiers;

use App\Utils\ApiHandler;

class ArtistUnifier
{
    private $handler;
    private $unifier;

    public function __construct()
    {
        $this->handler = new ApiHandler();
        $this->unifier = new TrackUnifier();
    }

    public function scUnify(array $artists): array
    {
        $unified = array();
        foreach ($artists as $artist) {

            $tracks = $this->scTracks($artist->id);

            if(count($tracks) > 0) {
                array_push($unified,
                    array(
                        "name" => $artist->username,
                        "source" => "soundcloud",
                        "id" => $artist->id,
                        "tracks" => $tracks
                    )
                );
            }
        }

        return $unified;
    }

    public function jamendoUnify(array $artists): array
    {
        $unified = array();

        foreach ($artists as $artist) {

            $tracks = $this->jamendoTracks($artist->name);

            if(count($tracks) > 0) {
                array_push($unified,
                    array(
                        "name" => $artist->name,
                        "source" => "jamendo",
                        "id" => $artist->id,
                        "tracks" => $tracks
                    )
                );
            }

        }

        return $unified;
    }

    private function jamendoTracks(string $name): array
    {
        $url = "https://api.jamendo.com/v3.0/artists/tracks?name=$name&client_id=97cc45f7";
        $data = json_decode($this->handler->exec($url));
        if($data == null) return [];
        return  $this->unifier->jamendoUnify($data->results[0]->tracks, $name);
    }

    private function scTracks(string $id): array
    {
        $url = "https://api.soundcloud.com/users/${id}/tracks?client_id=stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv";
        $data = json_decode($this->handler->exec($url));
        if($data == null) return [];
        return $this->unifier->scUnify($data);
    }
}