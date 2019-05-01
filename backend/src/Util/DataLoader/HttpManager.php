<?php

namespace App\Util\DataLoader;

use App\Util\ApiEndpointGenerator;
use App\Util\DataAdapter\IDataAdapter;
use App\Domain\ValueObject\Requirements;
use GuzzleHttp\Client;

final class HttpManager
{
    protected $adapter;
    protected $apiEndpointGenerator;

    public function __construct(ApiEndpointGenerator $apiEndpointGenerator)
    {
        $this->apiEndpointGenerator = $apiEndpointGenerator;
    }

    final public function getExternalContent(Requirements $requirements): array
    {
        $url = $this->apiEndpointGenerator->generate(...$requirements->toArrayWithNumericalKeys());
        $client = new Client();
        $response = $client->request('GET', $url, ['verify' => true, 'headers' => ['Accept' => 'application/json',]]);
        $data = json_decode($response->getBody());
        if ($data == null) {
            return [];
        } else {
            return $this->adapter->adapt($data);
        }
    }

    final public function setAdapter(IDataAdapter $adapter): void
    {
        $this->adapter = $adapter;
    }
}
