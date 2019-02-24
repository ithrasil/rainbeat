<?php

namespace App\Util\DataLoader;

use App\Util\Unifier\IUnifier;
use App\Util\DataAdapter\IDataAdapter;
use GuzzleHttp\Client;

class ExternalDataLoader
{
    protected $adapter;
    protected $vo;

    public function __construct(IDataAdapter $adapter, string $vo)
    {
        $this->adapter = $adapter;
        $this->vo = $vo;
    }

    public final function getExternalContent(string $url, string $source): array
    {
        $client = new Client();
        $response = $client->request('GET', $url, ['verify' => true, 'headers' => ['Accept' => 'application/json',]]);
        $data = json_decode($response->getBody());
        if ($data == null) {
            return [];
        } else {
            return (new $this->vo($this->adapter->adapt($data), $source))->serialize()['items'];
        }
    }
}
