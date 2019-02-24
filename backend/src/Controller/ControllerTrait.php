<?php

namespace App\Controller;

use App\Util\DataLoader\DataLoader;
use Symfony\Component\HttpFoundation\Request;

Trait ControllerTrait
{
    final protected function mergeData(string $query, Request $request): array
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

    final protected function getApiContent(DataLoader $dataLoader, string $query,
                                           string $url, string $source, string $type): array
    {
        $path = "../storage/api/$source.$type." . "_" . "$query.json";
        $file_exists = file_exists($path);
        $content = $dataLoader->getContent($file_exists, $path, $url, $source);

        if (!$file_exists) {
            file_put_contents($path, json_encode($content));
        }
        return $content;
    }
}
