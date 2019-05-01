<?php

namespace App\Controller;

use App\Util\DataLoader\DataLoader;
use App\Util\DataLoader\ApiProviders;
use Symfony\Component\HttpFoundation\Request;

Trait ControllerTrait
{
    final public function mergeData(Request $request, DataLoader $dataLoader, string $query): array
    {
        $result = [];
        if ($request->get(ApiProviders::SOUNDCLOUD) == 'true') {
            $result = array_merge($this->getSoundcloudContent($query, $dataLoader), $result);
        }
        if ($request->get(ApiProviders::JAMENDO) == 'true') {
            $result = array_merge($this->getJamendoContent($query, $dataLoader), $result);
        }
        return $result;
    }
}
