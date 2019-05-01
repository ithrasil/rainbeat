<?php

namespace App\Repository;

use App\Domain\StorableObject\Aggregate\Aggregate;
use App\Domain\StorableObject\Aggregate\ArtistAggregate;
use App\Domain\StorableObject\Aggregate\PlaylistAggregate;
use App\Domain\StorableObject\ApiObject\ApiObject;
use App\Domain\StorableObject\ApiObject\Artist;
use App\Domain\StorableObject\ApiObject\Playlist;
use App\Domain\StorableObject\ApiObject\Track;
use App\Domain\StorableObject\IStorable;
use App\Domain\ValueObject\Requirements;

final class FilesystemRepository
{
    CONST ROOT = '../storage/';
    CONST API_PREFIX = 'api/';
    CONST EXTENSION = 'json';

    public function mapStorableToFile(IStorable $object): void
    {
        $path = self::ROOT . self::API_PREFIX . $object->createPath() . self::EXTENSION;
        file_put_contents($path, json_encode($object->serialize()));
        $this->mapStorableChildrenToFile($object);
    }

    public function mapStorableChildrenToFile(IStorable $storable): void
    {
        foreach ($storable->getStorableChildren() as $storableChild) {
            if (is_null($storableChild) || !($storableChild instanceof IStorable)) {
                continue;
            }
            $this->mapStorableToFile($storableChild);
        }
    }

    public function aggregateExists(Requirements $requirements): bool
    {
        $pathToFile = $this->createPath(Aggregate::getFileLocation($requirements, []));
        return file_exists($pathToFile);
    }

    public function mapFileToStorable(Requirements $requirements, string $className, array $passed): ?IStorable
    {
        $pathToFile = $this->createPath($className::getFileLocation($requirements, $passed));

        if (file_exists($pathToFile)) {
            $contents = json_decode(file_get_contents($pathToFile), true);
            /**
             * @var IStorable $storable
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
                    $el = $this->mapFileToStorable($requirements, $child, ['id' => $primaryKey]);
                    if (is_null($el) || (($storable instanceof ArtistAggregate || $storable instanceof PlaylistAggregate) && $el->isFilled() && count($el->getTracks()) === 0)) {
                        continue;
                    }
                    /** @var Aggregate $storable */
                    $storable->addToApiObject($el);
                }
            } else if ($storable instanceof ApiObject) {
                foreach ($contents['tracks'] as $id) {
                    $el = $this->mapFileToStorable($requirements, $child, ['id' => $id]);
                    if (!is_null($contents['tracks']) && !is_null($el)) {
                        /** @var Artist|Playlist $storable */
                        $storable->setTracks($el);
                    }
                }
            } else {
                $storable->$child = $this->mapFileToStorable($requirements, $child, $contents);
            }
            return $storable;
        } else {
            return null;
        }
    }

    private function createPath(string $path): string
    {
        return self::ROOT . self::API_PREFIX . $path . self::EXTENSION;
    }
}
