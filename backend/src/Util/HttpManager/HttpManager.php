<?php


namespace App\Util\HttpManager;


use App\Domain\ValueObject\Requirements;
use App\Util\DataAdapter\DataAdapter;

interface HttpManager
{
    public function getExternalContent(Requirements $requirements): array;

    public function setAdapter(DataAdapter $adapter): void;
}
