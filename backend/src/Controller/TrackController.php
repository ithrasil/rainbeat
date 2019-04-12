<?php

namespace App\Controller;

use App\Util\DataAdapter\JamendoEntityAdapter;
use App\Util\DataLoader\DataLoader;
use App\Util\DataAdapter\SoundcloudEntityAdapter;
use App\ValueObjects\Requirements;
use App\ValueObjects\Tracks;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\OutputTypes;

class TrackController extends AbstractController
{
    use ControllerTrait;

    public function index(Request $request, DataLoader $dataLoader, string $query): Response
    {
        $dataLoader->setValueObject(Tracks::class);
        $content = json_encode($this->mergeData($request, $dataLoader, $query), JSON_PRETTY_PRINT);
        return new Response($content, 200, array('Content-Type' => 'application/json'));
    }

    private function getSoundcloudContent(string $query, DataLoader $dataLoader): array
    {
        $requirements = new Requirements(ApiProviders::SOUNDCLOUD, OutputTypes::TRACK, $query);
        $dataLoader->setAdapter(new SoundcloudEntityAdapter());
        return $dataLoader->getContent($requirements);
    }

    private function getJamendoContent(string $query, DataLoader $dataLoader): array
    {
        $requirements = new Requirements(ApiProviders::JAMENDO, OutputTypes::TRACK, $query);
        $dataLoader->setAdapter(new JamendoEntityAdapter());
        return $dataLoader->getContent($requirements);
    }
}
