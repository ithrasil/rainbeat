<?php

namespace App\Util\HttpManager;

use App\Util\ApiEndpointGenerator;
use App\Util\DataAdapter\DataAdapter;
use App\Domain\ValueObject\Requirements;
use GuzzleHttp\Client;

final class HttpClient implements HttpManager
{
    /**
     * @var DataAdapter $adapter
     */
    protected $adapter;

    /**
     * @var ApiEndpointGenerator
     */
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

        return !$data ? [] : $this->adapter->adapt($data);
    }

    final public function setAdapter(DataAdapter $adapter): void
    {
        $this->adapter = $adapter;
    }
}
