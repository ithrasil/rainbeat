<?php

namespace App\Util\DataLoader;

use App\Util\Unifier\IUnifier;
use App\Util\DataAdapter\IDataAdapter;
use GuzzleHttp\Client;

class ExternalDataLoader
{
    protected $unifier;
    protected $adapter;

    public function __construct(IUnifier $unifier, IDataAdapter $adapter)
    {
        $this->unifier = $unifier;
        $this->adapter = $adapter;
    }

    public function getExternalContent(string $url): array
    {
        $client = new Client([]);
        $response = $client->request('GET', $url, ['verify' => true, 'headers' => ['Accept' => 'application/json',]]);
        $data = json_decode($response->getBody());
        if ($data == null) {
            return [];
        } else {
            return $this->unifier->unify($this->adapter->adapt($data));
        }
    }
}
