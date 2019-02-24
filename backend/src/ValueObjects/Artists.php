<?php

namespace App\ValueObjects;

class Artists extends ApiAggregate
{
    protected $vo = Artist::class;
    protected $extended = true;
}

