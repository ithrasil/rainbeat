<?php

namespace App\Repository;

use App\Domain\StorableObject\Aggregate\Aggregate;
use App\Domain\StorableObject\Aggregate\ArtistAggregate;
use App\Domain\StorableObject\Aggregate\PlaylistAggregate;
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
    CONST EXTENSION = 'json';

    private $root;

    public function __construct(KernelInterface $appKernel)
    {
        $this->root = $appKernel->getProjectDir() . '/storage/';
    }

    public function mapStorableToEntity(Storable $object): void
    {
        $path = $this->root . self::API_PREFIX . $object->createPath() . self::EXTENSION;
        file_put_contents($path, json_encode($object->serialize()));
        $this->mapStorableChildrenToEntity($object);
    }

    public function mapStorableChildrenToEntity(Storable $storable): void
    {
        foreach ($storable->getStorableChildren() as $storableChild) {
            if (is_null($storableChild) || !($storableChild instanceof Storable)) {
                continue;
            }
            $this->mapStorableToEntity($storableChild);
        }
    }

    public function aggregateExists(Requirements $requirements): bool
    {
        $pathToFile = $this->createQuery(Aggregate::getFileLocation($requirements, []));
        return file_exists($pathToFile);
    }

    public function mapEntityToStorable(Requirements $requirements, string $className, array $passed): ?Storable
    {
        $pathToFile = $this->createQuery($className::getFileLocation($requirements, $passed));

        if (file_exists($pathToFile)) {
            $contents = json_decode(file_get_contents($pathToFile), true);
            /**
             * @var Storable $storable
             */
            $storable = $className::fromArray($contents);
            if ($storable instanceof Track) {
                return $storable;
            }

            $child = $storable->getChildType();
            if (is_null($child)) {
                return null;
            }

            if ($storable instanceof Aggregate) {
                foreach ($contents['apiObjects'] as $primaryKey) {
                    $el = $this->mapEntityToStorable($requirements, $child, ['id' => $primaryKey]);
                    if (is_null($el) || (($storable instanceof ArtistAggregate || $storable instanceof PlaylistAggregate) && $el->isFilled() && count($el->getTracks()) === 0)) {
                        continue;
                    }
                    /** @var Aggregate $storable */
                    $storable->addToApiObject($el);
                }
            } else if ($storable instanceof ApiObject) {
                foreach ($contents['tracks'] as $id) {
                    $el = $this->mapEntityToStorable($requirements, $child, ['id' => $id]);
                    if (!is_null($contents['tracks']) && !is_null($el)) {
                        /** @var Artist|Playlist $storable */
                        $storable->setTracks($el);
                    }
                }
            } else {
                $storable->$child = $this->mapEntityToStorable($requirements, $child, $contents);
            }
            return $storable;
        } else {
            return null;
        }
    }

    private function createQuery(string $path): string
    {
        return $this->root . self::API_PREFIX . $path . self::EXTENSION;
    }
}
