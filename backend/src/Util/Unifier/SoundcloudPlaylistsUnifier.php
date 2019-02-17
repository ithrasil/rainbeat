<?php

namespace App\Util\Unifier;

class SoundcloudPlaylistsUnifier extends AbstractUnifier
{
    //"https://api.soundcloud.com/playlists/$playlist->id}/tracks?client_id=stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv"

    public function unify(array $data): array
    {
        return $this->simpleUnify(
            $data,
            function($x1) { return $this->fromSoundcloudPlaylist($x1); });
    }

}
