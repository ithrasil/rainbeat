<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Persistence\ManagerRegistry;

use App\Utils\ApiHandler;
use App\Utils\Unifiers\TrackUnifier;
use App\Entity\Queries;

class TrackController extends Controller
{
    private $apiHandler;
    private $unifier;
    private $managerRegistry;

    public function __construct(ManagerRegistry $managerRegistry)
    {
        $this->apiHandler = new ApiHandler();
        $this->unifier = new TrackUnifier();
        $this->managerRegistry = $managerRegistry;
    }

    /**
     * @Route("/soundcloud/tracks/{query}", name="scTracks")
     */
    public function scTracks(string $query): Response
    {
        $url = "https://api.soundcloud.com/tracks?q=$query&client_id=stJqxq59eT4rgFHFLYiyAL2BDbuL3BAv";
        $data = $this->getApiContent($query, __FUNCTION__, $url, function($data) { return $this->unifier->scUnify($data); });
        return new Response($data, 200, array('Content-Type' => 'application/json'));
    }

    /**
     * @Route("/jamendo/tracks/{query}", name="jamendoTracks")
     */
    public function jamendoTracks(string $query): Response
    {
        $url = "https://api.jamendo.com/v3.0/tracks?name=$query&client_id=97cc45f7";
        $data = $this->getApiContent($query, __FUNCTION__, $url, function($data) { return $this->unifier->jamendoUnify($data->results); });
        return new Response($data, 200, array('Content-Type' => 'application/json'));
    }

    private function getApiContent(string $query, string $function, string $url,  $unifier) {
        $query_in_db = $this->managerRegistry
            ->getRepository(Queries::class)
            ->findOneBy([
                'name' => $query,
                'function' => $function
            ]);

        $data_prepared = null;

        if (!$query_in_db) {
            $data = json_decode($this->apiHandler->exec($url));
            if($data == null) {
                $data_prepared = [];
            } else {
                $data_prepared = $unifier($data);
            }

            $query_in_db = new Queries();
            $query_in_db->setName($query);
            $query_in_db->setFunction($function);
            $query_in_db->setContent($data_prepared);
            $entityManager = $this->managerRegistry->getManagerForClass(Queries::class);
            $entityManager->persist($query_in_db);
            $entityManager->flush();
        } else {
            $data_prepared = $query_in_db->getContent();
        }

        return json_encode($data_prepared, JSON_PRETTY_PRINT);
    }
}