<?php

namespace test\Util\Fake;

use App\Util\DataAdapter\IDataAdapter;
use App\Domain\ValueObject\Requirements;
use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\OutputType;
use App\Util\HttpManager\HttpManager;

final class HttpClientFake implements HttpManager
{
    private $path;

    final public function getExternalContent(Requirements $requirements): array
    {
        $type = $requirements->getType();
        $source = $requirements->getSource();
        $query = $requirements->getQuery();
        $id = $requirements->getId();

        $filename = $type . '__' . $source . '__' . $query . '__' . $id . '.json';

        return json_decode(file_get_contents($this->path . '/tests/Util/Fake/Blob/' . $filename));
    }

    final public function setAdapter(IDataAdapter $adapter): void {}

    final public function setPath(string $path): void {
        $this->path = $path;
    }
}
