<?php

namespace App\Domain\StorableObject;

interface Storable
{
    public function serialize(): array;

    public function getStorableChildren(): array;

    public function getChildType(): ?string;
}
