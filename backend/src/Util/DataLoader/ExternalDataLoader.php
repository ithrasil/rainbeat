<?php

namespace App\Util\DataLoader;

use App\Util\ApiEndpointGenerator;
use App\Util\DataAdapter\IDataAdapter;
use GuzzleHttp\Client;

class ExternalDataLoader
{
    protected $adapter;
    protected $valueObject;
    protected $apiEndpointGenerator;

    public function __construct(ApiEndpointGenerator $apiEndpointGenerator)
    {
        $this->apiEndpointGenerator = $apiEndpointGenerator;
    }

    public final function getExternalContent(string $url, string $source): array
    {
        $client = new Client();
        $response = $client->request('GET', $url, ['verify' => true, 'headers' => ['Accept' => 'application/json',]]);
        $data = json_decode($response->getBody());
        if ($data == null) {
            return [];
        } else {
            return (new $this->valueObject($this->adapter->adapt($data), $source))->serialize()['items'];
        }
    }

    final public function setAdapter(IDataAdapter $adapter): void
    {
        $this->adapter = $adapter;
    }

    final public function setValueObject(string $valueObject): void
    {
        $this->valueObject = $valueObject;
    }
}
