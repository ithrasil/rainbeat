<?php


namespace App\Repository;


use App\Domain\StorableObject\Storable;
use App\Domain\ValueObject\Requirements;

interface Repository
{
    public function mapStorableToEntity(Storable $object): void;
    public function mapStorableChildrenToEntity(Storable $storable): void;
    public function aggregateExists(Requirements $requirements): bool;
    public function mapEntityToStorable(Requirements $requirements, string $className, array $passed): ?Storable;
}
