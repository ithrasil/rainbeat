<?php

namespace App\Controller;
use App\Util\DataAdapter\JamendoEntityAdapter;
use App\Util\DataAdapter\JamendoEntityTracksAdapter;
use App\Util\DataLoader\DataLoader;
use App\Util\Unifier\JamendoArtistsUnifier;
use App\Util\Unifier\JamendoTracksUnifier;
use App\Util\Unifier\SoundcloudArtistsUnifier;
use App\Util\Unifier\SoundcloudTracksUnifier;
use App\Util\DataAdapter\SoundcloudEntityAdapter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class ArtistController extends AbstractController
{

    use ControllerTrait;

    public function index(string $query, Request $request): Response
    {
        return new Response(json_encode($this->mergeData($query, $request), JSON_PRETTY_PRINT), 200, array('Content-Type' => 'application/json'));
    }

    private function getSoundcloudContent(string $query): array
    {
        $url = "https://api.soundcloud.com/users?q=$query&client_id=stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv";
        $loader = new DataLoader(new SoundcloudArtistsUnifier(), new SoundcloudEntityAdapter());
        return $this->getApiContent($loader, $query, "SoundcloudArtist", $url);
    }

    private function getJamendoContent(string $query): array
    {
        $url = "https://api.jamendo.com/v3.0/tracks/?name=$query&client_id=97cc45f7";
        $loader = new DataLoader(new JamendoArtistsUnifier(), new JamendoEntityAdapter());
        return $this->getApiContent($loader, $query, "JamendoArtist", $url);
    }

    public function getSoundcloudChunk(string $id): Response
    {
        $url = "https://api.soundcloud.com/users/$id/tracks?client_id=stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv";
        $chunk_loader = new DataLoader(new SoundcloudTracksUnifier(), new SoundcloudEntityAdapter());
        $data = $chunk_loader->getExternalContent($url);
        return new Response(json_encode($data, JSON_PRETTY_PRINT), 200, array('Content-Type' => 'application/json'));
    }

    public function getJamendoChunk(string $id): Response
    {
        $url = "https://api.jamendo.com/v3.0/artists/tracks?id=$id&client_id=97cc45f7";
        $chunk_loader = new DataLoader(new JamendoTracksUnifier(), new JamendoEntityTracksAdapter());
        $data = $chunk_loader->getExternalContent($url);
        return new Response(json_encode($data, JSON_PRETTY_PRINT), 200, array('Content-Type' => 'application/json'));
    }
}
