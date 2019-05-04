<?php


namespace App\Util\HttpManager;


use App\Domain\ValueObject\Requirements;
use App\Util\DataAdapter\IDataAdapter;

interface HttpManager
{
    public function getExternalContent(Requirements $requirements): array;
    public function setAdapter(IDataAdapter $adapter): void;
}
