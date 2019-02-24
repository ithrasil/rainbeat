<?php

namespace App\ValueObjects;

class Playlists extends ApiAggregate
{
    protected $vo = Playlist::class;
    protected $extended = true;
}

