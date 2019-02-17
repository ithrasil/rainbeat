<?php

namespace App\Util\Unifier;

use App\Util\DataAdapter\JamendoEntityTracksAdapter;
use App\Util\DataLoader\ExternalDataLoader;

class JamendoArtistsUnifier extends AbstractUnifier
{
    public function __construct()
    {
        $this->loader = new ExternalDataLoader(new JamendoTracksUnifier(), new JamendoEntityTracksAdapter());
    }

    public function unify(array $data): array
    {
        return $this->simpleUnify(
            $data,
            function($x1) {return $this->fromJamendoArtist($x1);});
    }


}