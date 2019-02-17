<?php

namespace App\Util\DataLoader;

use App\Util\Unifier\IUnifier;
use App\Util\DataAdapter\IDataAdapter;

class ExternalDataLoader
{
    protected $unifier;
    protected $adapter;

    public function __construct(IUnifier $unifier, IDataAdapter $adapter)
    {
        $this->unifier = $unifier;
        $this->adapter = $adapter;
    }

    public function fetchExternalData(string $url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        curl_setopt($ch, CURLOPT_URL, $url);
        return curl_exec($ch);
    }

    public function getExternalContent(string $url): array
    {
        $data = json_decode($this->fetchExternalData($url));
        if ($data == null) {
            return [];
        } else {
            return $this->unifier->unify($this->adapter->adapt($data));
        }
    }
}
