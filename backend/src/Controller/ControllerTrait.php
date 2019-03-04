<?php

namespace App\Controller;

use App\Util\DataLoader\DataLoader;
use Symfony\Component\HttpFoundation\Request;

Trait ControllerTrait
{
    final protected function mergeData(Request $request, DataLoader $dataLoader, string $query): array
    {
        $result = [];
        if ($request->get('soundcloud') == "true") {
            $result = array_merge($this->getSoundcloudContent($query, $dataLoader), $result);
        }
        if ($request->get('jamendo') == "true") {
            $result = array_merge($this->getJamendoContent($query, $dataLoader), $result);
        }
        return $result;
    }
}
