<?php

namespace App\Util\Unifier;

interface IUnifier {
    public function unify(array $data) : array;
}