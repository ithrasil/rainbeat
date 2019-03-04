<?php

namespace App\ValueObjects;

class Artists extends ApiAggregate
{
    protected $valueObject = Artist::class;
    protected $extended = true;
}

