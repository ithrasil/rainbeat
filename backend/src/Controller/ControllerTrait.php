<?php

namespace App\Controller;

use App\Util\DataLoader\DataLoader;
use Symfony\Component\HttpFoundation\Request;

Trait ControllerTrait
{

    protected function mergeData(string $query, Request $request): array
    {
        $result = [];
        if ($request->get('soundcloud') == "true") {
            $result = array_merge($this->getSoundcloudContent($query), $result);
        }
        if ($request->get('jamendo') == "true") {
            $result = array_merge($this->getJamendoContent($query), $result);
        }
        return $result;
    }

    protected function getApiContent(DataLoader $dataLoader, string $query, string $function, string $url): array
    {
        $path = "../storage/api/$function/$query.json";
        $file_exists = file_exists($path);

        $content = $dataLoader->getContent($file_exists, $path, $url);

        if (!$file_exists) {
            file_put_contents($path, json_encode($content));
        }

        return $content;
    }
}