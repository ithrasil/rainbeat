<?php

namespace App\Util\Unifier;

class JamendoTracksUnifier extends AbstractUnifier
{
    public function unify(array $data): array
    {
        return $this->simpleUnify(
            $data,
            function($x1) { return $this->fromJamendoTrack($x1); });
    }
}