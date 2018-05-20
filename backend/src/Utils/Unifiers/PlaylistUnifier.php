<?php

namespace App\Utils\Unifiers;

use App\Utils\ApiHandler;

class PlaylistUnifier
{
    private $handler;
    private $unifier;

    public function __construct()
    {
        $this->handler = new ApiHandler();
        $this->unifier = new TrackUnifier();
    }

    public function scUnify(array $playlists): array
    {
        $unified = array();

        foreach ($playlists as $playlist) {

            $tracks = $this->scTracks($playlist->id);

            if(count($tracks) > 0) {
                array_push($unified,
                    array(
                        "name" => $playlist->title,
                        "source" => "soundcloud",
                        "id" => $playlist->id,
                        "tracks" => $tracks
                    )
                );
            }
        }

        return $unified;
    }

    public function jamendoUnify(array $playlists): array
    {
        $unified = array();

        foreach ($playlists as $playlist) {

            $tracks = $this->jamendoTracks($playlist->name);

            if(count($tracks) > 0) {
                array_push($unified,
                    array(
                        "name" => $playlist->name,
                        "source" => "jamendo",
                        "id" => $playlist->id,
                        "tracks" => $tracks
                    )
                );
            }
        }

        return $unified;
    }

    private function jamendoTracks(string $name): array
    {
        $url = "https://api.jamendo.com/v3.0/playlists/tracks?name=$name&client_id=97cc45f7";
        $data = json_decode($this->handler->exec($url));
        if($data == null) return [];
        return  $this->unifier->jamendoUnify($data->results[0]->tracks);
    }

    private function scTracks(string $id): array
    {
        $url = "https://api.soundcloud.com/playlists/${id}/tracks?client_id=stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv";
        $data = json_decode($this->handler->exec($url));
        if($data == null) return [];
        return $this->unifier->scUnify($data);
    }
}