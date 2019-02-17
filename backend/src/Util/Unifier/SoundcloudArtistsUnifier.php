<?php

namespace App\Util\Unifier;

class SoundcloudArtistsUnifier extends AbstractUnifier
{
    public function unify(array $data): array
    {
        return $this->simpleUnify(
            $data,
            function($x1) { return $this->fromSoundcloudArtist($x1); });
    }

}