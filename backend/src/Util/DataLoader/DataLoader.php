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
use App\Repository\FilesystemRepository;

final class DataLoader
{
    /**
     * @var FilesystemRepository $filesystemRepository
     */
    private $filesystemRepository;

    /**
     * @var HttpManager $httpManager
     */
    private $httpManager;

    public function __construct(FilesystemRepository $filesystemRepository, HttpManager $httpManager)
    {
        $this->filesystemRepository = $filesystemRepository;
        $this->httpManager = $httpManager;
    }

    public function getGenericContent(Requirements $requirements): array
    {
        $mapping = [
            OutputType::TRACK => TrackAggregate::class,
            OutputType::ARTIST => ArtistAggregate::class,
            OutputType::PLAYLIST => PlaylistAggregate::class,
        ];

        $AggregateClass = $mapping[$requirements->getType()];

        $aggregateExists = $this->filesystemRepository->aggregateExists($requirements);

        if (!$aggregateExists) {
            $blob = $this->httpManager->getExternalContent($requirements);
            /** @var Aggregate $aggregate */
            $aggregate = new $AggregateClass($blob, $requirements);
            $this->filesystemRepository->mapStorableToFile($aggregate);
            $content = $aggregate->toArray();
        } else {
            /** @var Aggregate $aggregate */
            $aggregate = $this->filesystemRepository->mapFileToStorable($requirements, $AggregateClass, []);
            $content = $aggregate->toArray();
        }

        return $content;
    }

    public function getTracks(Requirements $requirements): array
    {
        $classMapping = [
            OutputType::ARTIST_TRACK => Artist::class,
            OutputType::PLAYLIST_TRACK => Playlist::class,
        ];

        $typeMapping = [
            OutputType::ARTIST_TRACK => OutputType::ARTIST,
            OutputType::PLAYLIST_TRACK => OutputType::PLAYLIST,
        ];

        $mappedRequirements = clone $requirements;
        $mappedRequirements->setType($typeMapping[$requirements->getType()]);

        $class = $classMapping[$requirements->getType()];

        /** @var Artist|Playlist $classObject */
        $classObject = $this->filesystemRepository->mapFileToStorable($mappedRequirements, $class, [
            'id' => $requirements->getId()
        ]);

        if (!$classObject->isFilled()) {
            $blob = $this->httpManager->getExternalContent($requirements);
            foreach ($blob as $item) {
                $newObject = new Track($item, $requirements->getSource());
                $classObject->setTracks($newObject);
            }
            $classObject->setFilled();
            $this->filesystemRepository->mapStorableToFile($classObject);
        }

        return $classObject->toArray()['tracks'];
    }

    public function getHttpManager(): HttpManager
    {
        return $this->httpManager;
    }
}
