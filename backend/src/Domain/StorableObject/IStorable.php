<?php

namespace App\Domain\StorableObject;

use App\Domain\ValueObject\Requirements;

interface IStorable {
    public function createPath(): string;
    public function serialize(): array;
    public function getStorableChildren(): array;
    static function getFileLocation(Requirements $requirements, array $data): ?string;
    public function getChildType(): ?string;
}
