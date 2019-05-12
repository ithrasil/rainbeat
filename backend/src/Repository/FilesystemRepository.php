<?php

namespace App\Repository;

use App\Domain\StorableObject\Aggregate\Aggregate;
use App\Domain\StorableObject\Aggregate\ArtistAggregate;
use App\Domain\StorableObject\Aggregate\PlaylistAggregate;
use App\Domain\StorableObject\Aggregate\TrackAggregate;
use App\Domain\StorableObject\ApiObject\ApiObject;
use App\Domain\StorableObject\ApiObject\Artist;
use App\Domain\StorableObject\ApiObject\Playlist;
use App\Domain\StorableObject\ApiObject\Track;
use App\Domain\StorableObject\Storable;
use App\Domain\ValueObject\Requirements;
use Symfony\Component\HttpKernel\KernelInterface;

final class FilesystemRepository implements Repository
{
    CONST API_PREFIX = 'api/';

    const STORAGE = 'storage/';

    const AGGREGATE = 'aggregate/';

    CONST EXTENSION = 'json';

    private $root;

    public function __construct(KernelInterface $appKernel)
    {
        $this->root = $appKernel->getProjectDir() . '/' . self::STORAGE;
    }

    public function mapStorableToEntity(Storable $storable): void
    {
        $path = $this->root . self::API_PREFIX . $this->createPath($storable) . self::EXTENSION;
        file_put_contents($path, json_encode($storable->serialize()));

        foreach ($storable->getStorableChildren() as $storableChild) {
            if (!$storableChild || !($storableChild instanceof Storable)) {
                continue;
            }
            $this->mapStorableToEntity($storableChild);
        }
    }

    public function aggregateExists(Requirements $requirements): bool
    {
        $pathToFile = $this->createQuery($this->getFileLocation(Aggregate::class, $requirements, []));
        return file_exists($pathToFile);
    }

    public function mapEntityToStorable(Requirements $requirements, string $className, array $passed): ?Storable
    {
        $pathToFile = $this->createQuery($this->getFileLocation($className, $requirements, $passed));

        if (!file_exists($pathToFile)) {
            return null;
        }

        $contents = json_decode(file_get_contents($pathToFile), true);
        /** @var Storable $storable */
        $storable = $className::fromArray($contents);
        if ($storable instanceof Track) {
            return $storable;
        }

        $child = $storable->getChildType();

        if ($storable instanceof Aggregate) {
            foreach ($contents['apiObjects'] as $primaryKey) {
                $apiObject = $this->mapEntityToStorable($requirements, $child, ['id' => $primaryKey]);

                if (!$apiObject) {
                    continue;
                }
                if (($storable instanceof ArtistAggregate || $storable instanceof PlaylistAggregate)) {
                    /**@var Artist|Playlist $apiObject */
                    if ($apiObject->isFilled() && count($apiObject->getTracks()) === 0) {
                        continue;
                    }
                }

                /** @var Aggregate $storable */
                $storable->addToApiObject($apiObject);
            }
        } else if ($storable instanceof ApiObject) {
            foreach ($contents['tracks'] as $id) {
                /** @var Track $el */
                $el = $this->mapEntityToStorable($requirements, $child, ['id' => $id]);
                if ($contents['tracks'] && $el) {
                    /** @var Artist|Playlist $storable */
                    $storable->addTrack($el);
                }
            }
        }
        return $storable;

    }

    private function createQuery(string $path): string
    {
        return $this->root . self::API_PREFIX . $path . self::EXTENSION;
    }

    private function createPath(Storable $storable): string
    {
        switch (get_class($storable)) {
            case Aggregate::class:
            case ArtistAggregate::class:
            case PlaylistAggregate::class:
            case TrackAggregate::class:
                /**@var Aggregate $storable */
                return self::AGGREGATE . $storable->getRequestedOutputType() . '/' . $storable->getSource() . '/' . $storable->getQuery() . '.';
                break;
            case ApiObject::class:
            case Artist::class:
            case Playlist::class:
            case Track::class:
                /**@var ApiObject $storable */
                return $storable->getRequestedOutputType() . '/' . $storable->getSource() . '/' . $storable->primaryKey() . '.';;
                break;
        }
    }

    private function getFileLocation(string $className, Requirements $requirements, array $passed): string
    {
        switch ($className) {
            case Aggregate::class:
            case ArtistAggregate::class:
            case PlaylistAggregate::class:
            case TrackAggregate::class:
                return self::AGGREGATE . $requirements->getType() . '/' . $requirements->getSource() . '/' . $requirements->getQuery() . '.';
                break;
            case ApiObject::class:
            case Artist::class:
            case Playlist::class:
            case Track::class:
                return $requirements->getType() . '/' . $requirements->getSource() . '/' . $passed['id'] . '.';
                break;
        }
    }
}
