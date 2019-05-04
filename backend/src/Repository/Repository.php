<?php


namespace App\Repository;


use App\Domain\StorableObject\IStorable;
use App\Domain\ValueObject\Requirements;

interface Repository
{
    public function mapStorableToEntity(IStorable $object): void;
    public function mapStorableChildrenToEntity(IStorable $storable): void;
    public function aggregateExists(Requirements $requirements): bool;
    public function mapEntityToStorable(Requirements $requirements, string $className, array $passed): ?IStorable;
}
