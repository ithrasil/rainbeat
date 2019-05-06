<?php

namespace App\Controller;

use App\Util\DataAdapter\JamendoEntityAdapter;
use App\Util\DataLoader\DataLoader;
use App\Util\DataAdapter\SoundcloudEntityAdapter;
use App\Domain\ValueObject\Requirements;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Util\DataLoader\ApiProviders;
use App\Util\DataLoader\RequestedOutputType;
use Symfony\Component\Routing\Annotation\Route;

final class TrackController extends AbstractController
{
    /**
     * @Route("/tracks/{query}", name="tracks")
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
                $requirements = new Requirements($param, RequestedOutputType::TRACK, $query);

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
}
