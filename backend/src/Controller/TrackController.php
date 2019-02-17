<?php

namespace App\Controller;

use App\Util\DataAdapter\JamendoEntityAdapter;
use App\Util\DataLoader\DataLoader;
use App\Util\Unifier\JamendoTracksUnifier;
use App\Util\Unifier\SoundcloudTracksUnifier;
use App\Util\DataAdapter\SoundcloudEntityAdapter;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TrackController extends AbstractController
{
    use ControllerTrait;

    public function index(string $query, Request $request): Response
    {
        return new Response(json_encode($this->mergeData($query, $request), JSON_PRETTY_PRINT), 200, array('Content-Type' => 'application/json'));
    }

    private function getSoundcloudContent(string $query): array
    {
        $url = "https://api.soundcloud.com/tracks?q=$query&client_id=stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv";
        $loader = new DataLoader(new SoundcloudTracksUnifier(), new SoundcloudEntityAdapter());
        return $this->getApiContent($loader, $query, "SoundcloudTrack", $url);
    }

    private function getJamendoContent(string $query): array
    {
        $url = "https://api.jamendo.com/v3.0/tracks?name=$query&client_id=97cc45f7";
        $loader = new DataLoader(new JamendoTracksUnifier(), new JamendoEntityAdapter());
        return $this->getApiContent($loader, $query, "JamendoTrack", $url);
    }
}