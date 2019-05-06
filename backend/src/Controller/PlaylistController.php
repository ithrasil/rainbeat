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
use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\RequestedOutputType;
use Symfony\Component\Routing\Annotation\Route;

final class PlaylistController extends AbstractController
{
    /**
     * @Route("/playlists/{query}", name="playlists")
     *
     * @param Request $request
     * @param DataLoader $dataLoader
     * @param string $query
     * @return Response
     */
    public function index(Request $request, DataLoader $dataLoader, string $query): Response
    {
        $apiAdapters = [
            ApiProviders::SOUNDCLOUD => SoundcloudEntityAdapter::class,
            ApiProviders::JAMENDO => JamendoEntityAdapter::class,
        ];

        $result = [];
        $params = $request->query->all();

        foreach ($params as $param => $value) {
            if (key_exists($param, $apiAdapters) && $value === 'true') {
                $requirements = new Requirements($param, RequestedOutputType::PLAYLIST, $query);

                $adapterClass = $apiAdapters[$param];
                $dataLoader->getHttpManager()->setAdapter(new $adapterClass());
                $content = $dataLoader->getGenericContent($requirements);
                $result = array_merge($content, $result);
            }
        }

        return new Response(json_encode($result, JSON_PRETTY_PRINT), 200, [
            'Content-Type' => 'application/json'
        ]);
    }

    /**
     * @Route("/playlist/{id}/{source}", name="playlist_tracks")
     *
     * @param string $id
     * @param string $source
     * @param DataLoader $dataLoader
     * @return Response
     */
    public function getTracks(string $id, string $source, DataLoader $dataLoader): Response
    {
        $mapping = [
            ApiProviders::SOUNDCLOUD => SoundcloudEntityAdapter::class,
            ApiProviders::JAMENDO => JamendoEntityTracksAdapter::class,
        ];

        if (!key_exists($source, $mapping)) {
            return new Response('', 404);
        }

        $adapter = $mapping[$source];
        $requirements = new Requirements($source, RequestedOutputType::PLAYLIST_TRACK,
            RequestedOutputType::TRACK, $id);
        $dataLoader->getHttpManager()->setAdapter(new $adapter());
        $content = json_encode($dataLoader->getTracks($requirements), JSON_PRETTY_PRINT);

        return new Response($content, 200, [
            'Content-Type' => 'application/json'
        ]);
    }
}
