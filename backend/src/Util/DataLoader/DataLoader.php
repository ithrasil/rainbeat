<?php

namespace App\Util\DataLoader;

use App\Util\ApiEndpointGenerator;
use App\ValueObjects\Requirements;

final class DataLoader extends ExternalDataLoader
{
    public function __construct(ApiEndpointGenerator $apiEndpointGenerator)
    {
        parent::__construct($apiEndpointGenerator);
    }

    public function getLocalContent(string $path): array
    {
        return json_decode(file_get_contents($path));
    }

    public function getContent(Requirements $requirements): array
    {
        $path = $this->createPathToLocalContent(...$requirements->serializeWithNumericalKeys());
        $file_exists = file_exists($path);

        if ($file_exists) {
            return $this->getLocalContent($path);
        }

        $url = $this->apiEndpointGenerator->generate(...$requirements->serializeWithNumericalKeys());
        $content = $this->getExternalContent($url, $requirements->getSource(),
            $requirements->getQuery(), $requirements->getId());
        file_put_contents($path, json_encode($content));
        return $content;
    }

    public function createPathToLocalContent(string $source, string $type, string $query, string $id=''): string
    {
        if ($id != '') {
            $id = '__' . $id . '.';
        }
        return '../storage/api/' . $source . '__' . $type . '__' . $query . $id . '.json';
    }
}
