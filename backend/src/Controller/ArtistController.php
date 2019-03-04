<?php

namespace App\Controller;

use App\Util\DataAdapter\JamendoEntityAdapter;
use App\Util\DataAdapter\JamendoEntityTracksAdapter;
use App\Util\DataLoader\DataLoader;
use App\Util\DataAdapter\SoundcloudEntityAdapter;
use App\ValueObjects\Artists;
use App\ValueObjects\Requirements;
use App\ValueObjects\Tracks;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ArtistController extends AbstractController
{

    use ControllerTrait;

    public function index(Request $request, DataLoader $dataLoader, string $query): Response
    {
        $dataLoader->setValueObject(Artists::class);
        $content = json_encode($this->mergeData($request, $dataLoader, $query), JSON_PRETTY_PRINT);
        return new Response($content, 200, array('Content-Type' => 'application/json'));
    }

    private function getSoundcloudContent(string $query, DataLoader $dataLoader): array
    {
        $requirements = new Requirements('soundcloud', 'artists', $query);
        $dataLoader->setAdapter(new SoundcloudEntityAdapter());
        return $dataLoader->getContent($requirements);
    }

    private function getJamendoContent(string $query, DataLoader $dataLoader): array
    {
        $requirements = new Requirements('jamendo', 'artists', $query);
        $dataLoader->setAdapter(new JamendoEntityAdapter());
        return $dataLoader->getContent($requirements);
    }

    public function getSoundcloudChunk(string $id, DataLoader $dataLoader): Response
    {
        $requirements = new Requirements('soundcloud', 'artist_tracks', 'NOT_QUERY', $id);
        $dataLoader->setValueObject(Tracks::class);
        $dataLoader->setAdapter(new SoundcloudEntityAdapter());
        $content = json_encode($dataLoader->getContent($requirements), JSON_PRETTY_PRINT);
        return new Response($content, 200, array('Content-Type' => 'application/json'));
    }

    public function getJamendoChunk(string $id, DataLoader $dataLoader): Response
    {
        $requirements = new Requirements('jamendo', 'artist_tracks', 'NOT_QUERY', $id);
        $dataLoader->setValueObject(Tracks::class);
        $dataLoader->setAdapter(new JamendoEntityTracksAdapter());
        $content = json_encode($dataLoader->getContent($requirements), JSON_PRETTY_PRINT);
        return new Response($content, 200, array('Content-Type' => 'application/json'));
    }
}
