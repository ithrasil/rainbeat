<?php

namespace App\ValueObjects;

class Tracks extends ApiAggregate
{
    protected $valueObject = Track::class;
    protected $extended = false;
}

