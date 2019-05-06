<?php

namespace App\Util\DataLoader;

use App\Domain\StorableObject\Aggregate\Aggregate;
use App\Domain\StorableObject\Aggregate\ArtistAggregate;
use App\Domain\StorableObject\Aggregate\PlaylistAggregate;
use App\Domain\StorableObject\Aggregate\TrackAggregate;
use App\Domain\StorableObject\ApiObject\Artist;
use App\Domain\StorableObject\ApiObject\Playlist;
use App\Domain\StorableObject\ApiObject\Track;
use App\Domain\ValueObject\Requirements;
use App\Repository\Repository;
use App\Util\HttpManager\HttpManager;

final class DataLoader
{
    /**
     * @var Repository $repository
     */
    private $repository;

    /**
     * @var HttpManager $httpManager
     */
    private $httpManager;

    public function __construct(Repository $repository, HttpManager $httpManager)
    {
        $this->repository = $repository;
        $this->httpManager = $httpManager;
    }

    public function getGenericContent(Requirements $requirements): array
    {
        $mapping = [
            RequestedOutputType::TRACK => TrackAggregate::class,
            RequestedOutputType::ARTIST => ArtistAggregate::class,
            RequestedOutputType::PLAYLIST => PlaylistAggregate::class,
        ];

        $aggregateClass = $mapping[$requirements->getType()];

        $aggregateExists = $this->repository->aggregateExists($requirements);

        if (!$aggregateExists) {
            $blob = $this->httpManager->getExternalContent($requirements);
            /** @var Aggregate $aggregate */
            $aggregate = new $aggregateClass($blob, $requirements);
            $this->repository->mapStorableToEntity($aggregate);
            $content = $aggregate->toArray();
        } else {
            /** @var Aggregate $aggregate */
            $aggregate = $this->repository->mapEntityToStorable($requirements, $aggregateClass, []);
            $content = $aggregate->toArray();
        }

        return $content;
    }

    public function getTracks(Requirements $requirements): array
    {
        $classMapping = [
            RequestedOutputType::ARTIST_TRACK => Artist::class,
            RequestedOutputType::PLAYLIST_TRACK => Playlist::class,
        ];

        $typeMapping = [
            RequestedOutputType::ARTIST_TRACK => RequestedOutputType::ARTIST,
            RequestedOutputType::PLAYLIST_TRACK => RequestedOutputType::PLAYLIST,
        ];

        $mappedRequirements = clone $requirements;
        $mappedRequirements->setType($typeMapping[$requirements->getType()]);

        $class = $classMapping[$requirements->getType()];

        /** @var Artist|Playlist $classObject */
        $classObject = $this->repository->mapEntityToStorable($mappedRequirements, $class, [
            'id' => $requirements->getId()
        ]);

        if (!$classObject->isFilled()) {
            $blob = $this->httpManager->getExternalContent($requirements);
            foreach ($blob as $item) {
                $newObject = new Track($item, $requirements->getSource());
                $classObject->addTrack($newObject);
            }
            $classObject->setFilled();
            $this->repository->mapStorableToEntity($classObject);
        }

        return $classObject->toArray()['tracks'];
    }

    public function getHttpManager(): HttpManager
    {
        return $this->httpManager;
    }
}
