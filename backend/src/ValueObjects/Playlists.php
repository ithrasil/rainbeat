<?php

namespace App\ValueObjects;

class Playlists extends ApiAggregate
{
    protected $valueObject = Playlist::class;
    protected $extended = true;
}

