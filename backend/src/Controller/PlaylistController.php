<?php

namespace App\Controller;

use App\Util\DataAdapter\JamendoEntityAdapter;
use App\Util\DataAdapter\JamendoEntityTracksAdapter;
use App\Util\DataLoader\DataLoader;
use App\Util\DataAdapter\SoundcloudEntityAdapter;
use App\Domain\ValueObject\Requirements;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Util\DataLoader\RequestType;
use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\OutputType;

final class PlaylistController extends AbstractController
{
    use ControllerTrait;

    public function index(Request $request, DataLoader $dataLoader, string $query): Response
    {
        $content = json_encode($this->mergeData($request, $dataLoader, $query), JSON_PRETTY_PRINT);
        return new Response($content, 200, ['Content-Type' => 'application/json']);
    }

    private function getSoundcloudContent(string $query, DataLoader $dataLoader): array
    {
        $requirements = new Requirements(ApiProviders::SOUNDCLOUD, OutputType::PLAYLIST, $query);
        $dataLoader->getHttpManager()->setAdapter(new SoundcloudEntityAdapter());
        return $dataLoader->getGenericContent($requirements);
    }

    private function getJamendoContent(string $query, DataLoader $dataLoader): array
    {
        $requirements = new Requirements(ApiProviders::JAMENDO, OutputType::PLAYLIST, $query);
        $dataLoader->getHttpManager()->setAdapter(new JamendoEntityAdapter());
        return $dataLoader->getGenericContent($requirements);
    }

    public function getSoundcloudChunk(string $id, DataLoader $dataLoader): Response
    {
        $requirements = new Requirements(ApiProviders::SOUNDCLOUD, OutputType::PLAYLIST_TRACK,
            RequestType::TRACK, $id);
        $dataLoader->getHttpManager()->setAdapter(new SoundcloudEntityAdapter());
        $content = json_encode($dataLoader->getTracks($requirements), JSON_PRETTY_PRINT);
        return new Response($content, 200, ['Content-Type' => 'application/json']);
    }

    public function getJamendoChunk(string $id, DataLoader $dataLoader): Response
    {
        $requirements = new Requirements(ApiProviders::JAMENDO, OutputType::PLAYLIST_TRACK,
            RequestType::TRACK, $id);
        $dataLoader->getHttpManager()->setAdapter(new JamendoEntityTracksAdapter());
        $content = json_encode($dataLoader->getTracks($requirements), JSON_PRETTY_PRINT);
        return new Response($content, 200, ['Content-Type' => 'application/json']);
    }
}
