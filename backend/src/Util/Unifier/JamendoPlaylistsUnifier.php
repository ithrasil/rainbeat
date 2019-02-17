<?php

namespace App\Util\Unifier;

class JamendoPlaylistsUnifier extends AbstractUnifier
{

    public function unify(array $data): array
    {
        return $this->simpleUnify(
            $data,
            function($x1) {return $this->fromJamendoPlaylist($x1); });
    }

}