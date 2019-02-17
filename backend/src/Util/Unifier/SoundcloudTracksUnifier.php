<?php

namespace App\Util\Unifier;

class SoundcloudTracksUnifier extends AbstractUnifier
{

    public function unify(array $data): array
    {
        return $this->simpleUnify(
            $data,
            function($x1) { return $this->fromSoundcloudTrack($x1); });
    }
}