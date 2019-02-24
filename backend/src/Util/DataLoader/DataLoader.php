<?php

namespace App\Util\DataLoader;

use App\Util\Unifier\IUnifier;
use App\Util\DataAdapter\IDataAdapter;

final class DataLoader extends ExternalDataLoader
{
    public function __construct(IDataAdapter $adapter, string $vo)
    {
        parent::__construct($adapter, $vo);
    }

    public function getLocalContent(string $path): array
    {
        return json_decode(file_get_contents($path));
    }

    public function getContent(bool $file_exists, string $path, string $url, string $source): array
    {
        if ($file_exists) {
            return $this->getLocalContent($path);
        } else {
            return $this->getExternalContent($url, $source);
        }
    }
}
