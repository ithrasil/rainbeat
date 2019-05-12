<?php

namespace App\Util\DataAdapter;

interface DataAdapter
{
    public function adapt($data): array;
}
